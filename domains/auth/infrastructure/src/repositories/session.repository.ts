import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq, gt, isNull, lt, lte, ne, sql } from 'drizzle-orm';

import { ISessionRepository, Session, SessionId, UserId } from '@finda-co/domain-auth-core';

import { type NodePgDrizzle } from '../db';
import * as schema from '../db/schema';
import { SessionMapper } from '../mappers/session.mapper';
import { RedisService } from '../services/redis.service';

@Injectable()
export class SessionRepository implements ISessionRepository {
  constructor(
    @Inject('App') private readonly drizzle: NodePgDrizzle,
    private readonly redisService: RedisService,
    private readonly sessionMapper: SessionMapper,
  ) {}

  async save(session: Session): Promise<void> {
    if (session.isNew) {
      await this._create(session);
    } else if (session.isChanged) {
      await this._update(session);
    }
  }

  private async _create(session: Session): Promise<void> {
    // 将领域会话转换为数据库记录
    const sessionData = this.sessionMapper.toPersistence(session);

    // 插入会话记录到数据库
    await this.drizzle.insert(schema.session).values(sessionData);

    // 如果会话未过期，同步到Redis
    if (!session.isExpired()) {
      await this.redisService.setSession(session);
    }

    session.setSaved();
  }

  private async _update(session: Session): Promise<void> {
    // 将领域会话变更转换为数据库更新
    const sessionData = this.sessionMapper.toPartialPersistence(session);

    // 更新数据库记录
    await this.drizzle
      .update(schema.session)
      .set(sessionData)
      .where(eq(schema.session.id, session.id.toString()));

    // 同步到Redis
    if (session.isExpired()) {
      // 如果会话已过期，从Redis中删除
      await this.redisService.deleteSession(session.id);
    } else {
      // 否则更新Redis中的会话
      await this.redisService.setSession(session);
    }

    session.clearChanges();
  }

  async findById(id: SessionId): Promise<Session | null> {
    // 首先尝试从Redis获取
    const cachedSession = await this.redisService.getSession(id);
    if (cachedSession) {
      return this.sessionMapper.toDomain(cachedSession);
    }

    // 从数据库查询
    const sessionData = await this.drizzle.query.session.findFirst({
      where: eq(schema.session.id, id.toString()),
    });

    if (!sessionData) {
      return null;
    }

    const session = this.sessionMapper.toDomain(sessionData);

    // 如果会话未过期，缓存到Redis
    if (!session.isExpired()) {
      await this.redisService.setSession(session);
    }

    return session;
  }

  async findByToken(token: string): Promise<Session | null> {
    // 首先尝试从Redis获取
    const cachedSession = await this.redisService.getSessionByToken(token);
    if (cachedSession) {
      return this.sessionMapper.toDomain(cachedSession);
    }

    // 从数据库查询
    const sessionData = await this.drizzle.query.session.findFirst({
      where: eq(schema.session.token, token),
    });

    if (!sessionData) {
      return null;
    }

    const session = this.sessionMapper.toDomain(sessionData);

    // 如果会话未过期，缓存到Redis
    if (!session.isExpired()) {
      await this.redisService.setSession(session);
    }

    return session;
  }

  async findByUserId(userId: UserId, includeExpired: boolean = false): Promise<Session[]> {
    // 从数据库查询
    const sessionsData = await this.drizzle.query.session.findMany({
      where: includeExpired
        ? eq(schema.session.userId, userId.toString())
        : and(
            eq(schema.session.userId, userId.toString()),
            gt(schema.session.expiresAt, new Date()),
          ),
      orderBy: [desc(schema.session.createdAt)],
    });

    // 转换为领域对象
    const sessions = sessionsData.map((session: any) => this.sessionMapper.toDomain(session));

    return sessions;
  }

  async findByFingerprint(
    fingerprint: string,
    includeExpired: boolean = false,
  ): Promise<Session | null> {
    // 首先尝试从Redis获取
    if (!includeExpired) {
      const cachedSession = await this.redisService.getSessionByFingerprint(fingerprint);
      if (cachedSession) {
        return this.sessionMapper.toDomain(cachedSession);
      }
    }

    // 从数据库查询
    const sessionData = await this.drizzle.query.session.findFirst({
      where: includeExpired
        ? eq(schema.session.fingerprint, fingerprint)
        : and(
            eq(schema.session.fingerprint, fingerprint),
            gt(schema.session.expiresAt, new Date()),
          ),
      orderBy: [desc(schema.session.createdAt)],
    });

    if (!sessionData) {
      return null;
    }

    const session = this.sessionMapper.toDomain(sessionData);

    // 如果会话未过期，缓存到Redis
    if (!includeExpired && !session.isExpired()) {
      await this.redisService.setSession(session);
    }

    return session;
  }

  async delete(session: Session): Promise<void> {
    // 从Redis删除
    await this.redisService.deleteSession(session.id);

    // 删除数据库记录
    await this.drizzle
      .update(schema.session)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(schema.session.id, session.id.toString()));
  }

  async deleteById(id: SessionId): Promise<void> {
    // 从Redis删除
    await this.redisService.deleteSession(id);

    // 删除数据库记录
    await this.drizzle
      .update(schema.session)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(schema.session.id, id.toString()));
  }

  async deleteAllByUserId(userId: UserId, exceptSessionId?: SessionId): Promise<number> {
    // 构建查询条件
    const whereCondition = exceptSessionId
      ? and(
          eq(schema.session.userId, userId.toString()),
          ne(schema.session.id, exceptSessionId.toString()),
        )
      : eq(schema.session.userId, userId.toString());

    // 查询需要删除的会话
    const sessionsToDelete = await this.drizzle.query.session.findMany({
      where: whereCondition,
      columns: { id: true },
    });

    // 从Redis删除这些会话
    for (const session of sessionsToDelete) {
      await this.redisService.deleteSession(SessionId.from(session.id));
    }

    // 标记数据库中的会话为已删除
    await this.drizzle
      .update(schema.session)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(whereCondition);

    return sessionsToDelete.length;
  }

  async deleteExpired(olderThan?: Date): Promise<number> {
    const now = new Date();
    const whereCondition = olderThan
      ? and(lt(schema.session.expiresAt, now), lt(schema.session.expiresAt, olderThan))
      : lt(schema.session.expiresAt, now);

    // 查询需要删除的过期会话
    const expiredSessions = await this.drizzle.query.session.findMany({
      where: whereCondition,
      columns: { id: true },
    });

    // 从Redis删除这些会话
    for (const session of expiredSessions) {
      await this.redisService.deleteSession(SessionId.from(session.id));
    }

    // 标记数据库中的会话为已删除
    await this.drizzle
      .update(schema.session)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(whereCondition);

    return expiredSessions.length;
  }

  async cleanupIdleSessions(idleTimeMinutes: number): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setMinutes(cutoffDate.getMinutes() - idleTimeMinutes);

    const whereCondition = and(
      lt(schema.session.updatedAt, cutoffDate),
      gt(schema.session.expiresAt, new Date()),
    );

    // 查询需要清理的闲置会话
    const idleSessions = await this.drizzle.query.session.findMany({
      where: whereCondition,
      columns: { id: true },
    });

    // 从Redis删除这些会话
    for (const session of idleSessions) {
      await this.redisService.deleteSession(SessionId.from(session.id));
    }

    // 更新这些会话的过期时间为当前时间
    await this.drizzle
      .update(schema.session)
      .set({
        expiresAt: new Date(),
        updatedAt: new Date(),
      })
      .where(whereCondition);

    return idleSessions.length;
  }

  async getSessionStats(): Promise<{
    totalActive: number;
    totalExpired: number;
    averageSessionDurationMinutes: number;
  }> {
    const now = new Date();

    // 查询活跃会话总数
    const [activeCountResult] = await this.drizzle
      .select({ activeCount: sql`count(*)::int` })
      .from(schema.session)
      .where(and(gt(schema.session.expiresAt, now), isNull(schema.session.deletedAt)));

    // 查询过期会话总数
    const [expiredCountResult] = await this.drizzle
      .select({ expiredCount: sql`count(*)::int` })
      .from(schema.session)
      .where(lte(schema.session.expiresAt, now));

    // 计算平均会话时长（分钟）
    const [durationResult] = await this.drizzle
      .select({
        avgDuration: sql`avg(extract(epoch from (expires_at - created_at)) / 60)::float`,
      })
      .from(schema.session)
      .where(isNull(schema.session.deletedAt));

    return {
      totalActive: Number(activeCountResult.activeCount),
      totalExpired: Number(expiredCountResult.expiredCount),
      averageSessionDurationMinutes: Number(durationResult.avgDuration) || 0,
    };
  }
}
