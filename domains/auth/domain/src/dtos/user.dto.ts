import { Expose } from 'class-transformer';

import { Identity, Session } from '../aggregates';
import { User, UserRole } from '../aggregates/user';
import { IdentityDto } from './identity.dto';
import { SessionDto } from './session.dto';

export class UserDto {
  identities?: IdentityDto[];
  sessions?: SessionDto[];

  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly firstName: string | null,
    public readonly lastName: string | null,
    public readonly isActive: boolean,
    public readonly isEmailVerified: boolean,
    public readonly isAnonymous: boolean,
    public readonly role: UserRole,
    public readonly banned: boolean,
    public readonly banReason: string | null,
    public readonly banExpires: Date | null,
    public readonly image: string | null,
    public readonly anonymousCreditAccountId: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly lastLoginAt: Date | null,
    identities?: Identity[] | null,
    sessions?: Session[] | null,
  ) {
    if (identities) {
      this.identities = identities.map((identity) => IdentityDto.from(identity));
    }

    if (sessions) {
      this.sessions = sessions.map((session) => SessionDto.from(session));
    }
  }

  @Expose()
  public get fullName(): string {
    const parts = [];
    if (this.firstName) parts.push(this.firstName);
    if (this.lastName) parts.push(this.lastName);
    return parts.join(' ') || '';
  }

  @Expose()
  public get isAdmin(): boolean {
    return this.role === 'admin';
  }

  @Expose()
  public get isBanExpired(): boolean {
    if (!this.banned || !this.banExpires) {
      return false;
    }
    return new Date() > this.banExpires;
  }

  public static from(user: User): UserDto {
    return new UserDto(
      user.id.toString(),
      user.email,
      user.firstName || null,
      user.lastName || null,
      user.isActive,
      user.isEmailVerified,
      user.isAnonymous,
      user.role,
      user.banned,
      user.banReason || null,
      user.banExpires || null,
      user.image || null,
      user.anonymousCreditAccountId || null,
      user.createdAt,
      user.updatedAt,
      user.lastLoginAt || null,
      user.identities.length > 0 ? user.identities : null,
      user.sessions.length > 0 ? user.sessions : null,
    );
  }
}
