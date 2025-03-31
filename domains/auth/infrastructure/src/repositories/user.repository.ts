import { Inject, Injectable } from '@nestjs/common';
import {
  SQL,
  and,
  desc,
  eq,
  getTableColumns,
  gt,
  ilike,
  inArray,
  isNotNull,
  isNull,
  ne,
  or,
  sql,
} from 'drizzle-orm';

import {
  Email,
  IUserRepository,
  IdentityId,
  IdentityProvider,
  SessionId,
  User,
  UserId,
} from '@finda-co/domain-auth-core';
import { UserRole } from '@finda-co/domain-auth-core';

import { type NodePgDrizzle } from '../db';
import * as schema from '../db/schema';
import { IdentityMapper } from '../mappers/identity.mapper';
import { SessionMapper } from '../mappers/session.mapper';
import { UserMapper } from '../mappers/user.mapper';
import { RedisService } from '../services/redis.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject('App') private readonly drizzle: NodePgDrizzle,
    private readonly redisService: RedisService,
  ) {}

  async save(user: User): Promise<void> {
    if (user.isNew) {
      await this._create(user);
    } else if (user.isChanged) {
      await this._update(user);
    }
  }

  private async _create(user: User): Promise<void> {
    await this.drizzle.transaction(async (trx) => {
      // 将领域用户转换为数据库记录
      const userData = UserMapper.toPersistence(user);
      // 插入用户记录
      await trx.insert(schema.user).values(userData);

      // 处理用户的身份信息
      if (user.identities.length > 0) {
        const identityRecords = user.identities.map((identity) =>
          IdentityMapper.toPersistence(identity),
        );
        await trx.insert(schema.identity).values(identityRecords);
      }

      // 处理用户的会话信息
      if (user.sessions.length > 0) {
        const sessionRecords = user.sessions.map((session) => SessionMapper.toPersistence(session));

        await trx.insert(schema.session).values(sessionRecords);

        // 将活跃会话同步到Redis
        for (const session of user.sessions) {
          if (!session.isExpired()) {
            await this.redisService.setSession(session);
          }
        }
      }
    });

    user.setSaved();
    user.identities.forEach((identity) => identity.setSaved());
    user.sessions.forEach((session) => session.setSaved());
  }

  private async _update(user: User): Promise<void> {
    await this.drizzle.transaction(async (trx) => {
      // 处理用户的更新
      if (user.isChanged) {
        const userData = UserMapper.toPartialPersistence(user);
        await trx.update(schema.user).set(userData).where(eq(schema.user.id, user.id.value));
      }

      // 处理新增的身份信息
      const newIdentities = user.identities.filter((identity) => identity.isNew);
      if (newIdentities.length > 0) {
        const identityRecords = newIdentities.map((identity) =>
          IdentityMapper.toPersistence(identity),
        );
        await trx.insert(schema.identity).values(identityRecords);
        newIdentities.forEach((identity) => identity.setSaved());
      }

      // 处理更新的身份信息
      const changedIdentities = user.identities.filter(
        (identity) => !identity.isNew && identity.isChanged,
      );
      for (const identity of changedIdentities) {
        const identityData = IdentityMapper.toPartialPersistence(identity);
        await trx
          .update(schema.identity)
          .set(identityData)
          .where(eq(schema.identity.id, identity.id.value));
        identity.clearChanges();
      }

      // 处理新增的会话信息
      const newSessions = user.sessions.filter((session) => session.isNew);
      if (newSessions.length > 0) {
        const sessionRecords = newSessions.map((session) => SessionMapper.toPersistence(session));
        await trx.insert(schema.session).values(sessionRecords);

        // 将新的活跃会话同步到Redis
        for (const session of newSessions) {
          if (!session.isExpired()) {
            await this.redisService.setSession(session);
          }
        }

        newSessions.forEach((session) => session.setSaved());
      }

      // 处理更新的会话信息
      const changedSessions = user.sessions.filter(
        (session) => !session.isNew && session.isChanged,
      );
      for (const session of changedSessions) {
        const sessionData = SessionMapper.toPartialPersistence(session);
        await trx
          .update(schema.session)
          .set(sessionData)
          .where(eq(schema.session.id, session.id.value));

        // 同步会话状态到Redis
        if (session.isExpired()) {
          // 如果会话已过期，从Redis中删除
          await this.redisService.deleteSession(session.id);
        } else {
          // 否则更新Redis中的会话
          await this.redisService.setSession(session);
        }

        session.clearChanges();
      }
    });

    user.clearChanges();
  }

  async findById(id: UserId): Promise<User | null> {
    const [userData] = await this.drizzle
      .select()
      .from(schema.user)
      .where(eq(schema.user.id, id.value));

    if (!userData) {
      return null;
    }

    const user = UserMapper.toDomain(userData);
    return user;
  }

  async findByEmail(email: string | Email): Promise<User | null> {
    const emailValue = email instanceof Email ? email.value.toLowerCase() : email.toLowerCase();

    const userData = await this.drizzle.query.user.findFirst({
      where: eq(schema.user.email, emailValue),
    });

    if (!userData) {
      return null;
    }

    const user = UserMapper.toDomain(userData);
    return user;
  }

  async findBySessionId(sessionId: SessionId): Promise<User | null> {
    // 首先尝试从Redis中获取会话关联的用户ID
    const cachedUserId = await this.redisService.getUserIdBySessionId(sessionId);

    if (cachedUserId) {
      // 如果找到缓存的用户ID，直接获取用户
      return this.findById(UserId.from(cachedUserId));
    }

    // 如果Redis中没有，从数据库查询
    const result = await this.drizzle
      .select({
        user: getTableColumns(schema.user),
      })
      .from(schema.session)
      .innerJoin(schema.user, eq(schema.session.userId, schema.user.id))
      .where(eq(schema.session.id, sessionId.value))
      .limit(1);

    if (!result || result.length === 0) {
      return null;
    }

    const user = UserMapper.toDomain(result[0].user);
    return user;
  }

  async findByIdentityId(identityId: IdentityId): Promise<User | null> {
    const result = await this.drizzle
      .select({
        user: getTableColumns(schema.user),
      })
      .from(schema.identity)
      .innerJoin(schema.user, eq(schema.identity.userId, schema.user.id))
      .where(eq(schema.identity.id, identityId.value))
      .limit(1);

    if (!result || result.length === 0) {
      return null;
    }

    const user = UserMapper.toDomain(result[0].user);
    return user;
  }

  async findByProviderIdentity(
    provider: IdentityProvider,
    providerUserId: string,
  ): Promise<User | null> {
    const result = await this.drizzle
      .select({
        user: getTableColumns(schema.user),
      })
      .from(schema.identity)
      .innerJoin(schema.user, eq(schema.identity.userId, schema.user.id))
      .where(
        and(eq(schema.identity.provider, provider), eq(schema.identity.identityId, providerUserId)),
      )
      .limit(1);

    if (!result || result.length === 0) {
      return null;
    }

    const user = UserMapper.toDomain(result[0].user);
    return user;
  }

  async loadIdentities(user: User): Promise<User> {
    const identities = await this.drizzle.query.identity.findMany({
      where: eq(schema.identity.userId, user.id.value),
    });

    const domainIdentities = identities.map((identity) => IdentityMapper.toDomain(identity));

    // 使用User实体的方法添加子实体
    for (const identity of domainIdentities) {
      user.addIdentity(identity);
    }

    return user;
  }

  async loadSessions(user: User): Promise<User> {
    const sessions = await this.drizzle.query.session.findMany({
      where: eq(schema.session.userId, user.id.value),
    });

    const domainSessions = sessions.map((session) => SessionMapper.toDomain(session));

    // 使用User实体的方法添加子实体
    for (const session of domainSessions) {
      user.addSession(session);
    }

    return user;
  }

  async emailExists(email: string | Email, excludeUserId?: UserId): Promise<boolean> {
    const emailValue = email instanceof Email ? email.value.toLowerCase() : email.toLowerCase();

    let whereCondition: SQL | undefined = eq(schema.user.email, emailValue);

    if (excludeUserId) {
      whereCondition = and(whereCondition, ne(schema.user.id, excludeUserId.value));
    }

    const [count] = await this.drizzle
      .select({ count: sql`count(*)::int` })
      .from(schema.user)
      .where(whereCondition);

    return Number(count.count) > 0;
  }

  async findAll(
    filter?: {
      isActive?: boolean;
      isEmailVerified?: boolean;
      role?: UserRole;
      search?: string;
    },
    page: number = 1,
    pageSize: number = 20,
  ): Promise<{
    users: User[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    const offset = (page - 1) * pageSize;
    const conditions: (SQL | undefined)[] = [];

    // 构建查询条件
    if (filter?.isActive !== undefined) {
      if (filter.isActive) {
        conditions.push(isNull(schema.user.deletedAt));
      } else {
        conditions.push(isNotNull(schema.user.deletedAt));
      }
    }

    if (filter?.isEmailVerified !== undefined) {
      conditions.push(eq(schema.user.emailVerified, filter.isEmailVerified));
    }

    if (filter?.role) {
      // 使用SQL.raw创建一个安全的SQL片段
      conditions.push(sql`${schema.user.role} = ${filter.role}`);
    }

    if (filter?.search) {
      conditions.push(
        or(
          ilike(schema.user.email, `%${filter.search}%`),
          ilike(schema.user.name || '', `%${filter.search}%`),
        ),
      );
    }

    // 构建WHERE子句
    const whereClause = conditions.length > 0 ? and(...conditions) : sql`1=1`;

    // 查询总数
    const [countResult] = await this.drizzle
      .select({ count: sql`count(*)::int` })
      .from(schema.user)
      .where(whereClause);

    // 查询用户数据
    const userData = await this.drizzle.query.user.findMany({
      where: whereClause,
      limit: pageSize,
      offset,
      orderBy: [desc(schema.user.createdAt)],
    });

    const users = userData.map((user) => UserMapper.toDomain(user));

    return {
      users,
      total: Number(countResult.count),
      page,
      pageSize,
    };
  }

  async count(filter?: {
    isActive?: boolean;
    isEmailVerified?: boolean;
    role?: UserRole;
  }): Promise<number> {
    const conditions: SQL<unknown>[] = [];

    // 构建查询条件
    if (filter?.isActive !== undefined) {
      if (filter.isActive) {
        conditions.push(isNull(schema.user.deletedAt));
      } else {
        conditions.push(isNotNull(schema.user.deletedAt));
      }
    }

    if (filter?.isEmailVerified !== undefined) {
      conditions.push(eq(schema.user.emailVerified, filter.isEmailVerified));
    }

    if (filter?.role) {
      // 使用SQL.raw创建一个安全的SQL片段
      conditions.push(sql`${schema.user.role} = ${filter.role}`);
    }

    // 构建WHERE子句
    const whereClause = conditions.length > 0 ? and(...conditions) : sql`1=1`;

    // 查询总数
    const [countResult] = await this.drizzle
      .select({ count: sql`count(*)::int` })
      .from(schema.user)
      .where(whereClause);

    return Number(countResult.count);
  }
}
