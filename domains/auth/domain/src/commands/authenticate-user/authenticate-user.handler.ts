import { Inject } from '@nestjs/common';

import { CommandHandler, ICommandHandler } from '@finda-co/core';

import { Session } from '../../aggregates/session.entity';
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
      throw new InvalidCredentialsError();
    }

    // 加载用户身份信息
    await this.userRepository.loadIdentities(user);

    // 验证用户密码 - 使用新的Password类型验证
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
  }
}
