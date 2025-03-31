import { Inject, Injectable } from '@nestjs/common';

import { IUserRepository } from './user.repo-port';

// import { type NodePgDrizzle } from '../db';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor() // @Inject('App') private readonly drizzle: NodePgDrizzle,
  {}
  /**
   * 保存用户
   * @param user 用户聚合根
   */
  async save(user: any): Promise<void> {}
}
