import { Session, SessionId, UserId } from '@finda-co/domain-auth-core';

export class SessionMapper {
  /**
   * 将会话领域对象转换为持久化对象
   */
  static toPersistence(session: Session): any {
    return {
      id: session.id.value,
      userId: session.userId.value,
      token: session.token,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
      impersonatedBy: session.impersonatedBy?.value,
      expiresAt: session.expiresAt,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    };
  }

  /**
   * 将会话的变更转换为部分持久化对象
   */
  static toPartialPersistence(session: Session): any {
    const changes: any = {};
    const changedFields = session.changedFields;

    if (changedFields.includes('token')) {
      changes.token = session.token;
    }

    if (changedFields.includes('ipAddress')) {
      changes.ipAddress = session.ipAddress;
    }

    if (changedFields.includes('userAgent')) {
      changes.userAgent = session.userAgent;
    }

    if (changedFields.includes('impersonatedBy')) {
      changes.impersonatedBy = session.impersonatedBy?.value;
    }

    if (changedFields.includes('expiresAt')) {
      changes.expiresAt = session.expiresAt;
    }

    // 总是更新updatedAt
    changes.updatedAt = new Date();

    return changes;
  }

  /**
   * 将持久化对象转换为会话领域对象
   */
  static toDomain(sessionRecord: any): Session {
    // 会话属性
    const sessionProps = {
      id: SessionId.from(sessionRecord.id),
      userId: UserId.from(sessionRecord.userId),
      token: sessionRecord.token,
      ipAddress: sessionRecord.ipAddress,
      userAgent: sessionRecord.userAgent,
      impersonatedBy: sessionRecord.impersonatedBy
        ? UserId.from(sessionRecord.impersonatedBy)
        : undefined,
      expiresAt: new Date(sessionRecord.expiresAt),
      createdAt: new Date(sessionRecord.createdAt),
      updatedAt: new Date(sessionRecord.updatedAt),
    };

    // 创建会话实体，并标记为非新建
    const session = Session.load(sessionProps);

    return session;
  }
}
