import { Inject, UnauthorizedException } from '@nestjs/common';

import { CommandHandler, ICommandHandler } from '@finda-co/core';

import { Session } from '../../aggregates/session';
import { UserRepositoryToken } from '../../constants';
import { InvalidCredentialsError } from '../../errors/user-errors';
import { type IUserRepository } from '../../repositories/user.repo-port';
import { SessionId } from '../../value-objects/session-id';
import { AuthenticateUserCommand } from './authenticate-user';

@CommandHandler(AuthenticateUserCommand)
export class AuthenticateUserHandler implements ICommandHandler<AuthenticateUserCommand, string> {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: AuthenticateUserCommand): Promise<string> {
    const { email, password } = command;

    // 查找用户
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('用户不存在或密码错误');
    }

    try {
      // 验证用户密码
      const authenticated = await user.authenticate(password);
      if (!authenticated) {
        throw new InvalidCredentialsError();
      }

      // 记录登录
      user.recordLogin();

      // 创建新会话
      const sessionId = SessionId.generate();
      // Session.create(id, userId, token?, ipAddress?, userAgent?, impersonatedBy?, expiresAtMinutes?)
      const session = Session.create(
        sessionId,
        user.id,
        undefined, // token
        undefined, // ipAddress
        undefined, // userAgent
        undefined, // impersonatedBy
        60 * 24, // expiresAtMinutes: 24小时
      );

      // 设置为当前会话
      user.setCurrentSession(session);

      // 保存用户和会话信息
      await this.userRepository.save(user);

      // 返回会话ID
      return sessionId.value;
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        throw new UnauthorizedException('用户不存在或密码错误');
      }
      throw error;
    }
  }
}
