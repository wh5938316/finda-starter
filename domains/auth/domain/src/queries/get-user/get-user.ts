import { Query } from '@finda-co/core';

import { UserId } from '../../value-objects/user-id';
import { UserDto } from '@/dtos';

/**
 * 获取用户信息查询
 * 用于根据用户ID获取用户详细信息
 */
export class GetUserQuery extends Query<Omit<UserDto, 'from'>> {
  public readonly userId: UserId;

  constructor(
    userId: string,
    public readonly includeIdentities: boolean = false,
    public readonly includeSessions: boolean = false,
  ) {
    super();
    this.userId = UserId.from(userId);
  }
}
