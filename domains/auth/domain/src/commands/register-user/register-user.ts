import { Command } from '@finda-co/core';

import { Email } from '../../value-objects/email';
import { UserId } from '../../value-objects/user-id';

/**
 * 用户注册命令
 * 用于创建新用户
 */
export class RegisterUserCommand extends Command<string> {
  public readonly email: Email;

  constructor(
    email: string,
    public readonly password: string,
    public readonly firstName?: string,
    public readonly lastName?: string,
    public readonly isAnonymous: boolean = false,
  ) {
    super();
    this.email = Email.from(email);
  }
}
