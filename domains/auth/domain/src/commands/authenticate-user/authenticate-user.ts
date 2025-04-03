import { Command } from '@finda-co/core';

import { Email } from '../../value-objects/email';

/**
 * 用户认证命令
 * 用于处理用户通过邮箱和密码进行认证的请求
 */
export class AuthenticateUserCommand extends Command<string> {
  public readonly email: Email;

  constructor(
    email: string,
    public readonly password: string,
  ) {
    super();
    this.email = Email.from(email);
  }
}
