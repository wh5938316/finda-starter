import { Injectable } from '@nestjs/common';

import { User, UserId } from '@finda-co/domain-auth-core';

@Injectable()
export class UserMapper {
  /**
   * 将用户领域对象转换为持久化对象
   */
  toPersistence(user: User): any {
    return {
      id: user.id.toString(),
      anonymousCreditAccountId: user.anonymousCreditAccountId,
      name: user.fullName || null,
      email: user.email,
      emailVerified: user.isEmailVerified,
      image: user.image,
      isAnonymous: user.isAnonymous,
      role: user.role,
      banned: user.banned,
      banReason: user.banReason,
      banExpires: user.banExpires,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * 将用户的变更转换为部分持久化对象
   */
  toPartialPersistence(user: User): any {
    const changes: any = {};
    const changedFields = user.changedFields;

    if (changedFields.includes('email')) {
      changes.email = user.email;
    }

    if (changedFields.includes('isEmailVerified')) {
      changes.emailVerified = user.isEmailVerified;
    }

    if (changedFields.includes('firstName') || changedFields.includes('lastName')) {
      changes.name = user.fullName || null;
    }

    if (changedFields.includes('image')) {
      changes.image = user.image;
    }

    if (changedFields.includes('isAnonymous')) {
      changes.isAnonymous = user.isAnonymous;
    }

    if (changedFields.includes('role')) {
      changes.role = user.role;
    }

    if (changedFields.includes('banned')) {
      changes.banned = user.banned;
    }

    if (changedFields.includes('banReason')) {
      changes.banReason = user.banReason;
    }

    if (changedFields.includes('banExpires')) {
      changes.banExpires = user.banExpires;
    }

    if (changedFields.includes('anonymousCreditAccountId')) {
      changes.anonymousCreditAccountId = user.anonymousCreditAccountId;
    }

    // 总是更新updatedAt
    changes.updatedAt = new Date();

    return changes;
  }

  /**
   * 将持久化对象转换为用户领域对象
   */
  toDomain(userRecord: any): User {
    // 基本用户属性
    const userProps = {
      id: UserId.from(userRecord.id),
      email: userRecord.email,
      firstName: userRecord.name ? userRecord.name.split(' ')[0] : undefined,
      lastName: userRecord.name ? userRecord.name.split(' ').slice(1).join(' ') : undefined,
      isActive: !userRecord.deletedAt,
      isEmailVerified: !!userRecord.emailVerified,
      isAnonymous: !!userRecord.isAnonymous,
      role: userRecord.role,
      banned: !!userRecord.banned,
      banReason: userRecord.banReason,
      banExpires: userRecord.banExpires,
      image: userRecord.image,
      anonymousCreditAccountId: userRecord.anonymousCreditAccountId,
      createdAt: userRecord.createdAt,
      updatedAt: userRecord.updatedAt,
      lastLoginAt: userRecord.lastLoginAt,
      currentSessionId: userRecord.currentSessionId,
    };

    // 创建用户实体，并标记为非新建
    const user = User.load(userProps);

    return user;
  }
}
