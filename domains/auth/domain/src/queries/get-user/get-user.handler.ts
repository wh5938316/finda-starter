import { Inject, NotFoundException } from '@nestjs/common';

import { IQueryHandler, QueryHandler } from '@finda-co/core';

import { UserRepositoryToken } from '../../constants';
import { UserDto } from '../../dtos/user.dto';
import { type IUserRepository } from '../../repositories/user.repo-port';
import { GetUserQuery } from './get-user';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery, UserDto> {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: GetUserQuery): Promise<UserDto> {
    const { userId, includeIdentities, includeSessions } = query;

    // 查找用户
    let user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 加载用户身份信息
    if (includeIdentities) {
      user = await this.userRepository.loadIdentities(user);
    }

    // 加载用户会话信息
    if (includeSessions) {
      user = await this.userRepository.loadSessions(user);
    }

    // 转换为DTO并返回
    return UserDto.from(user);
  }
}
