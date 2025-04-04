import { ConflictException, Inject } from '@nestjs/common';

import { CommandHandler, ICommandHandler } from '@finda-co/core';

import { User } from '../../aggregates/user.aggregate';
import { UserRepositoryToken } from '../../constants';
import { type IUserRepository } from '../../repositories/user.repo-port';
import { IdentityId } from '../../value-objects/identity-id';
import { Password } from '../../value-objects/password';
import { UserId } from '../../value-objects/user-id';
import { RegisterUserCommand } from './register-user';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand, string> {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: RegisterUserCommand): Promise<string> {
    const { email, password: plainPassword, firstName, lastName, isAnonymous } = command;

    // 检查邮箱是否已存在
    const emailExists = await this.userRepository.emailExists(email);
    if (emailExists) {
      throw new ConflictException('该邮箱已被注册');
    }

    // 创建用户ID
    const userId = UserId.generate();

    // 创建新用户
    const user = await User.create(
      userId,
      email.value,
      firstName,
      lastName,
      'user', // 默认角色为普通用户
      isAnonymous,
    );

    const password = await Password.create(plainPassword);

    user.createIdentity(IdentityId.generate(), 'credential', user.id.value, {
      accountId: user.id.value,
      email: email.value,
      name: `${firstName || ''} ${lastName || ''}`.trim(),
      password: password,
    });

    // 保存用户
    await this.userRepository.save(user);

    // 返回用户ID
    return userId.value;
  }
}
