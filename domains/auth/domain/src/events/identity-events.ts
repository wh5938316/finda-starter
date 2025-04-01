import { IdentityProvider } from '../aggregates/identity.entity';
import { DomainEvent } from '../core/domain-event';
import { IdentityId } from '../value-objects/identity-id';
import { UserId } from '../value-objects/user-id';

export class IdentityCreatedEvent extends DomainEvent {
  constructor(
    public readonly identityId: IdentityId,
    public readonly userId: UserId,
    public readonly provider: IdentityProvider,
  ) {
    super();
  }
}

export class IdentityRemovedEvent extends DomainEvent {
  constructor(
    public readonly identityId: IdentityId,
    public readonly userId: UserId,
    public readonly provider: IdentityProvider,
  ) {
    super();
  }
}

export class IdentityScopesUpdatedEvent extends DomainEvent {
  constructor(
    public readonly identityId: IdentityId,
    public readonly userId: UserId,
    public readonly scopes: string[],
  ) {
    super();
  }
}

export class IdentityTokensUpdatedEvent extends DomainEvent {
  constructor(
    public readonly identityId: IdentityId,
    public readonly userId: UserId,
    public readonly provider: IdentityProvider,
  ) {
    super();
  }
}

export class IdentityLinkedEvent extends DomainEvent {
  constructor(
    public readonly identityId: IdentityId,
    public readonly userId: UserId,
    public readonly provider: IdentityProvider,
  ) {
    super();
  }
}

export class IdentityUnlinkedEvent extends DomainEvent {
  constructor(
    public readonly identityId: IdentityId,
    public readonly userId: UserId,
    public readonly provider: IdentityProvider,
  ) {
    super();
  }
}

export class PasswordChangedEvent {
  constructor(
    public readonly identityId: IdentityId,
    public readonly userId: UserId,
  ) {}
}

export class PasswordResetRequestedEvent {
  constructor(
    public readonly identityId: IdentityId,
    public readonly userId: UserId,
    public readonly email: string,
  ) {}
}

export class PasswordResetCompletedEvent {
  constructor(
    public readonly identityId: IdentityId,
    public readonly userId: UserId,
  ) {}
}
