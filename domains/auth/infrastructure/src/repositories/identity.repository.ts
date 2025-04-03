import { Inject, Injectable } from '@nestjs/common';
import { and, eq, ne, sql } from 'drizzle-orm';

import {
  IIdentityRepository,
  Identity,
  IdentityId,
  IdentityProvider,
  UserId,
} from '@finda-co/domain-auth-core';

import { type NodePgDrizzle } from '../db';
import * as schema from '../db/schema';
import { IdentityMapper } from '../mappers/identity.mapper';

@Injectable()
export class IdentityRepository implements IIdentityRepository {
  constructor(@Inject('App') private readonly drizzle: NodePgDrizzle) {}

  async save(identity: Identity): Promise<void> {
    if (identity.isNew) {
      await this._create(identity);
    } else if (identity.isChanged) {
      await this._update(identity);
    }
  }

  private async _create(identity: Identity): Promise<void> {
    // 将领域身份转换为数据库记录
    const identityData = IdentityMapper.toPersistence(identity);

    // 插入身份记录
    await this.drizzle.insert(schema.identity).values(identityData);

    identity.setSaved();
  }

  private async _update(identity: Identity): Promise<void> {
    // 将领域身份变更转换为数据库更新
    const identityData = IdentityMapper.toPartialPersistence(identity);

    // 更新数据库记录
    await this.drizzle
      .update(schema.identity)
      .set(identityData)
      .where(eq(schema.identity.id, identity.id.value));

    identity.clearChanges();
  }

  async findById(id: IdentityId): Promise<Identity | null> {
    const identityData = await this.drizzle.query.identity.findFirst({
      where: eq(schema.identity.id, id.value),
    });

    if (!identityData) {
      return null;
    }

    return IdentityMapper.toDomain(identityData);
  }

  async findByUserId(userId: UserId): Promise<Identity[]> {
    const identitiesData = await this.drizzle.query.identity.findMany({
      where: eq(schema.identity.userId, userId.value),
    });

    return identitiesData.map((identity) => IdentityMapper.toDomain(identity));
  }

  async findByProvider(
    provider: IdentityProvider,
    providerUserId: string,
  ): Promise<Identity | null> {
    const identityData = await this.drizzle.query.identity.findFirst({
      where: and(
        eq(schema.identity.provider, provider),
        eq(schema.identity.identityId, providerUserId),
      ),
    });

    if (!identityData) {
      return null;
    }

    return IdentityMapper.toDomain(identityData);
  }

  async findByUserIdAndProvider(
    userId: UserId,
    provider: IdentityProvider,
  ): Promise<Identity | null> {
    const identityData = await this.drizzle.query.identity.findFirst({
      where: and(eq(schema.identity.userId, userId.value), eq(schema.identity.provider, provider)),
    });

    if (!identityData) {
      return null;
    }

    return IdentityMapper.toDomain(identityData);
  }

  async delete(identity: Identity): Promise<void> {
    await this.drizzle
      .update(schema.identity)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(schema.identity.id, identity.id.value));
  }

  async deleteById(id: IdentityId): Promise<void> {
    await this.drizzle
      .update(schema.identity)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(schema.identity.id, id.value));
  }

  async deleteAllByUserId(userId: UserId): Promise<number> {
    // 查询用户的所有身份
    const identities = await this.drizzle.query.identity.findMany({
      where: eq(schema.identity.userId, userId.value),
      columns: { id: true },
    });

    // 标记所有身份为已删除
    await this.drizzle
      .update(schema.identity)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(schema.identity.userId, userId.value));

    return identities.length;
  }

  async getUserIdentityStats(userId: UserId): Promise<{
    totalIdentities: number;
    identityProviders: string[];
  }> {
    // 查询用户的所有身份
    const identitiesData = await this.drizzle.query.identity.findMany({
      where: eq(schema.identity.userId, userId.value),
      columns: { provider: true },
    });

    // 提取唯一的提供商
    const providers = [...new Set(identitiesData.map((id) => id.provider))];

    return {
      totalIdentities: identitiesData.length,
      identityProviders: providers as string[],
    };
  }

  async providerIdentityExists(
    provider: IdentityProvider,
    providerUserId: string,
    excludeUserId?: UserId,
  ): Promise<boolean> {
    let query = and(
      eq(schema.identity.provider, provider),
      eq(schema.identity.identityId, providerUserId),
    );

    if (excludeUserId) {
      query = and(query, ne(schema.identity.userId, excludeUserId.value));
    }

    const [countResult] = await this.drizzle
      .select({ count: sql`count(*)::int` })
      .from(schema.identity)
      .where(query);

    return Number(countResult.count) > 0;
  }
}
