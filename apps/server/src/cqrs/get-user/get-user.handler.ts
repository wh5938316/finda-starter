import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserRepositoryToken } from '../constants';
import { type IUserRepository } from '../user.repo-port';
import { GetUserQuery } from './get-user';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: GetUserQuery) {
    const { userId, includeIdentities, includeSessions } = query;

    // 转换为DTO并返回
    return {} as any;
  }
}
