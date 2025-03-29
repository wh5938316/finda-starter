import { DomainError } from '../core/domain-error';

export class UserNotFoundError extends DomainError {
  constructor(userId: string) {
    super(`用户ID为${userId}的用户未找到`);
  }
}

export class EmailAlreadyExistsError extends DomainError {
  constructor(email: string) {
    super(`电子邮箱${email}已被使用`);
  }
}

export class InvalidCredentialsError extends DomainError {
  constructor() {
    super('用户凭据无效');
  }
}

export class EmailNotVerifiedError extends DomainError {
  constructor() {
    super('电子邮箱未验证');
  }
}

export class UserAccountBannedError extends DomainError {
  constructor(reason?: string, expiresAt?: Date) {
    const expireInfo = expiresAt
      ? `，封禁将于${expiresAt.toLocaleDateString()}解除`
      : '，封禁为永久性';
    const reasonInfo = reason ? `，原因：${reason}` : '';
    super(`用户账户已被封禁${reasonInfo}${expireInfo}`);
  }
}

export class UserAccountDeactivatedError extends DomainError {
  constructor() {
    super('用户账户已被停用');
  }
}

export class InsufficientPermissionError extends DomainError {
  constructor(action: string) {
    super(`没有执行${action}的权限`);
  }
}

export class InvalidPasswordError extends DomainError {
  constructor() {
    super('密码无效，请确保密码符合安全要求');
  }
}

export class SessionExpiredError extends DomainError {
  constructor() {
    super('会话已过期，请重新登录');
  }
}

export class SuspiciousActivityError extends DomainError {
  constructor(reason: string) {
    super(`检测到可疑活动：${reason}`);
  }
}

export class SessionNotFoundError extends DomainError {
  constructor(sessionId: string) {
    super(`会话ID为${sessionId}的会话未找到`);
  }
}

export class PasswordTooShortError extends DomainError {
  constructor(minLength: number) {
    super(`密码长度不能少于${minLength}个字符`);
  }
}

export class PasswordTooLongError extends DomainError {
  constructor(maxLength: number) {
    super(`密码长度不能超过${maxLength}个字符`);
  }
}

export class PasswordTooWeakError extends DomainError {
  constructor() {
    super('密码强度不足，必须包含大小写字母、数字和特殊字符');
  }
}
