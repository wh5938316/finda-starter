import { DomainEvent } from '../core/domain-event';
import { SessionId } from '../value-objects/session-id';
import { UserId } from '../value-objects/user-id';

export class SessionCreatedEvent extends DomainEvent {
  constructor(
    public readonly sessionId: SessionId,
    public readonly userId: UserId,
    public readonly ipAddress?: string,
    public readonly userAgent?: string,
  ) {
    super();
  }
}

export class SessionTerminatedEvent extends DomainEvent {
  constructor(
    public readonly sessionId: SessionId,
    public readonly userId: UserId,
  ) {
    super();
  }
}

export class SessionExpiredEvent extends DomainEvent {
  constructor(
    public readonly sessionId: SessionId,
    public readonly userId: UserId,
  ) {
    super();
  }
}

export class SessionExtendedEvent extends DomainEvent {
  constructor(
    public readonly sessionId: SessionId,
    public readonly userId: UserId,
    public readonly newExpiresAt: Date,
  ) {
    super();
  }
}

export class ImpersonationStartedEvent extends DomainEvent {
  constructor(
    public readonly sessionId: SessionId,
    public readonly impersonatorId: UserId,
    public readonly impersonatedUserId: UserId,
  ) {
    super();
  }
}

export class ImpersonationEndedEvent extends DomainEvent {
  constructor(
    public readonly sessionId: SessionId,
    public readonly impersonatorId: UserId,
    public readonly impersonatedUserId: UserId,
  ) {
    super();
  }
}
