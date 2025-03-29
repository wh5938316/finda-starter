import { Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { CommandHandler, ICommandHandler } from '@finda-co/core';

import { UserRepositoryToken } from '../../constants';
import { type IUserRepository } from '../../repositories/user.repo-port';
import { ResetPasswordCommand } from './reset-password';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler implements ICommandHandler<ResetPasswordCommand, void> {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: ResetPasswordCommand): Promise<void> {
    const { userId, token, newPassword } = command;

    // 查找用户
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // TODO: 在实际应用中，验证重置令牌是否有效
    // 例如：const isValid = await this.resetTokenRepository.validateToken(userId, token);
    // if (!isValid) {
    //   throw new UnauthorizedException('重置令牌无效或已过期');
    // }

    // 更新用户密码
    await user.updatePassword(newPassword);

    // 保存用户
    await this.userRepository.save(user);

    // TODO: 在实际应用中，标记令牌为已使用
    // 例如：await this.resetTokenRepository.markTokenAsUsed(userId, token);
  }
}
