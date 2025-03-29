import { Command } from '@finda-co/core';

import { UserId } from '../../value-objects/user-id';

/**
 * 验证邮箱命令
 * 用于验证用户邮箱地址
 */
export class VerifyEmailCommand extends Command<void> {
  public readonly userId: UserId;

  constructor(userId: string) {
    super();
    this.userId = UserId.from(userId);
  }
}
