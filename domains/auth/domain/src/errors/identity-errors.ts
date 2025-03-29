import { DomainError } from '../core/domain-error';

export class IdentityNotFoundError extends DomainError {
  constructor(identityId: string) {
    super(`身份ID为${identityId}的身份未找到`);
  }
}

export class IdentityProviderNotSupportedError extends DomainError {
  constructor(providerId: string) {
    super(`不支持的身份提供商：${providerId}`);
  }
}

export class CannotUnlinkLastIdentityError extends DomainError {
  constructor() {
    super('无法解除最后一个身份链接，用户必须至少保留一个身份');
  }
}

export class IdentityAlreadyExistsError extends DomainError {
  constructor(providerId: string, providerUserId: string) {
    super(`提供商${providerId}的用户ID${providerUserId}已存在身份`);
  }
}

export class InvalidIdentityOperationError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
