import { Inject, NotFoundException } from '@nestjs/common';
import { randomBytes } from 'crypto';

import { CommandHandler, ICommandHandler } from '@finda-co/core';

import { UserRepositoryToken } from '../../constants';
import { type IUserRepository } from '../../repositories/user.repo-port';
import { RequestPasswordResetCommand } from './request-password-reset';

@CommandHandler(RequestPasswordResetCommand)
export class RequestPasswordResetHandler
  implements ICommandHandler<RequestPasswordResetCommand, string>
{
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: RequestPasswordResetCommand): Promise<string> {
    const { email } = command;

    // 查找用户
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('没有找到使用该邮箱的用户');
    }

    // 生成密码重置令牌
    const token = randomBytes(32).toString('hex');

    // TODO: 在实际应用中，应存储令牌和过期时间
    // 例如：await this.resetTokenRepository.saveToken(user.id, token, expiresAt);

    // TODO: 通常，这里会触发发送重置密码邮件的事件

    // 返回令牌（在实际应用中通常不会直接返回）
    return token;
  }
}
