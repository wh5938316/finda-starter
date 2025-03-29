import { Expose } from 'class-transformer';

import { Session } from '../aggregates';

export class SessionDto {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly token: string | null,
    public readonly ipAddress: string | null,
    public readonly userAgent: string | null,
    public readonly impersonatedBy: string | null,
    public readonly fingerprint: string | null,
    public readonly expiresAt: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  @Expose()
  public get isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  @Expose()
  public get isImpersonated(): boolean {
    return !!this.impersonatedBy;
  }

  public static from(session: Session): SessionDto {
    return new SessionDto(
      session.id.toString(),
      session.userId.toString(),
      session.token || null,
      session.ipAddress || null,
      session.userAgent || null,
      session.impersonatedBy?.toString() || null,
      session.fingerprint?.toString() || null,
      session.expiresAt,
      session.createdAt,
      session.updatedAt,
    );
  }
}
