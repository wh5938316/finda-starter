import { Command } from '@finda-co/core';

import { UserId } from '../../value-objects/user-id';

/**
 * 重置密码命令
 * 用于用户重置密码
 */
export class ResetPasswordCommand extends Command<void> {
  public readonly userId: UserId;

  constructor(
    userId: string,
    public readonly token: string,
    public readonly newPassword: string,
  ) {
    super();
    this.userId = UserId.from(userId);
  }
}
