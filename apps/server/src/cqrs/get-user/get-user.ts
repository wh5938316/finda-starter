import { Query } from '@nestjs/cqrs';

/**
 * 获取用户信息查询
 * 用于根据用户ID获取用户详细信息
 */
export class GetUserQuery extends Query<any> {
  constructor(
    public readonly userId: string,
    public readonly includeIdentities: boolean = false,
    public readonly includeSessions: boolean = false,
  ) {
    super();
  }
}
