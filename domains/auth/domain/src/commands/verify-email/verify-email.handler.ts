import { Inject, NotFoundException } from '@nestjs/common';

import { CommandHandler, ICommandHandler } from '@finda-co/core';

import { UserRepositoryToken } from '../../constants';
import { type IUserRepository } from '../../repositories/user.repo-port';
import { VerifyEmailCommand } from './verify-email';

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler implements ICommandHandler<VerifyEmailCommand, void> {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: VerifyEmailCommand): Promise<void> {
    const { userId } = command;

    // 查找用户
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 验证用户邮箱
    user.verifyEmail();

    // 保存更改
    await this.userRepository.save(user);
  }
}
