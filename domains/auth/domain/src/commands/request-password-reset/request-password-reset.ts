import { Command } from '@finda-co/core';

import { Email } from '../../value-objects/email';

/**
 * 请求重置密码命令
 * 用于用户忘记密码时请求重置
 */
export class RequestPasswordResetCommand extends Command<string> {
  public readonly email: Email;

  constructor(email: string) {
    super();
    this.email = Email.from(email);
  }
}
