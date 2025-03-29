import { DomainEvent } from '../core/domain-event';
import { SessionId } from '../value-objects/session-id';
import { UserId } from '../value-objects/user-id';

export class UserCreatedEvent extends DomainEvent {
  constructor(
    public readonly userId: UserId,
    public readonly email: string,
  ) {
    super();
  }
}

export class UserLoggedInEvent extends DomainEvent {
  constructor(
    public readonly userId: UserId,
    public readonly loginTime: Date,
  ) {
    super();
  }
}

export class UserProfileUpdatedEvent extends DomainEvent {
  constructor(
    public readonly userId: UserId,
    public readonly firstName?: string,
    public readonly lastName?: string,
  ) {
    super();
  }
}

export class UserPasswordChangedEvent extends DomainEvent {
  constructor(public readonly userId: UserId) {
    super();
  }
}

export class UserEmailVerifiedEvent extends DomainEvent {
  constructor(public readonly userId: UserId) {
    super();
  }
}

export class UserDeactivatedEvent extends DomainEvent {
  constructor(public readonly userId: UserId) {
    super();
  }
}

export class UserActivatedEvent extends DomainEvent {
  constructor(public readonly userId: UserId) {
    super();
  }
}

export class UserBannedEvent extends DomainEvent {
  constructor(
    public readonly userId: UserId,
    public readonly reason?: string,
    public readonly expiresAt?: Date,
  ) {
    super();
  }
}

export class UserUnbannedEvent extends DomainEvent {
  constructor(public readonly userId: UserId) {
    super();
  }
}

export class UserAnonymousEvent extends DomainEvent {
  constructor(public readonly userId: UserId) {
    super();
  }
}

export class UserRegularEvent extends DomainEvent {
  constructor(
    public readonly userId: UserId,
    public readonly email: string,
  ) {
    super();
  }
}

export class UserSessionRevokedEvent extends DomainEvent {
  constructor(
    public readonly userId: UserId,
    public readonly sessionId: SessionId,
  ) {
    super();
  }
}

export class UserAllSessionsRevokedEvent extends DomainEvent {
  constructor(
    public readonly userId: UserId,
    public readonly exceptSessionId?: string,
  ) {
    super();
  }
}
