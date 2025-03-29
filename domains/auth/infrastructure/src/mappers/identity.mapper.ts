import { Identity, IdentityId, UserId } from '@finda-co/domain-auth-core';

// 注意：我们在domain模块中修改了Identity类，但基础设施层仍在引用旧版本
// 在发布新版本的domain模块后，此处应该更新为：
// import { Identity, IdentityId, UserId, Provider } from '@finda-co/domain-auth-core';
// 并使用新的provider和accountId字段

export class IdentityMapper {
  /**
   * 将身份领域对象转换为持久化对象
   */
  toPersistence(identity: Identity): any {
    return {
      id: identity.id.toString(),
      userId: identity.userId.toString(),
      providerUserId: identity.providerUserId,
      provider: identity.provider,
      accountId: identity.accountId,
      accessToken: identity.accessToken,
      refreshToken: identity.refreshToken,
      accessTokenExpiresAt: identity.tokenExpiresAt,
      refreshTokenExpiresAt: identity.tokenExpiresAt, // 暂时使用相同的过期时间
      scope: identity.scopes,
      idToken: null, // idToken暂时为空
      password: identity.password, // 添加password字段
      createdAt: identity.createdAt,
      updatedAt: identity.updatedAt,
    };
  }

  /**
   * 将身份的变更转换为部分持久化对象
   */
  toPartialPersistence(identity: Identity): any {
    const changes: any = {};
    const changedFields = identity.changedFields;

    if (changedFields.includes('providerUserId')) {
      changes.identityId = identity.providerUserId;
    }

    if (changedFields.includes('provider')) {
      changes.provider = identity.provider;
    }

    if (changedFields.includes('accountId')) {
      changes.accountId = identity.accountId;
    }

    if (changedFields.includes('accessToken')) {
      changes.accessToken = identity.accessToken;
    }

    if (changedFields.includes('refreshToken')) {
      changes.refreshToken = identity.refreshToken;
    }

    if (changedFields.includes('tokenExpiresAt')) {
      changes.accessTokenExpiresAt = identity.tokenExpiresAt;
      changes.refreshTokenExpiresAt = identity.tokenExpiresAt; // 暂时使用相同的过期时间
    }

    if (changedFields.includes('scopes')) {
      changes.scope = identity.scopes;
    }

    if (changedFields.includes('password')) {
      changes.password = identity.password;
    }

    // 总是更新updatedAt
    changes.updatedAt = new Date();

    return changes;
  }

  /**
   * 将持久化对象转换为身份领域对象
   */
  toDomain(identityRecord: any): Identity {
    // 身份属性
    const identityProps = {
      id: IdentityId.from(identityRecord.id),
      userId: UserId.from(identityRecord.userId),
      provider: identityRecord.provider,
      accountId: identityRecord.accountId,
      providerUserId: identityRecord.providerUserId,
      email: identityRecord.email,
      name: undefined, // 这个信息可能需要从其他表获取
      scopes: identityRecord.scope || [],
      accessToken: identityRecord.accessToken,
      refreshToken: identityRecord.refreshToken,
      tokenExpiresAt: identityRecord.accessTokenExpiresAt,
      password: identityRecord.password,
      createdAt: new Date(identityRecord.createdAt),
      updatedAt: new Date(identityRecord.updatedAt),
    };

    // 创建身份实体，并标记为非新建
    const identity = Identity.load(identityProps);

    return identity;
  }
}
