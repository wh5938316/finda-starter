import { Expose } from 'class-transformer';

import { Identity, IdentityProvider } from '../aggregates';

export class IdentityDto {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly identityId: string,
    public readonly provider: IdentityProvider,
    public readonly accessToken: string | null,
    public readonly refreshToken: string | null,
    public readonly accessTokenExpiresAt: Date | null,
    public readonly refreshTokenExpiresAt: Date | null,
    public readonly scope: string[] | null,
    public readonly idToken: string | null,
    public readonly password: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  @Expose()
  public get isCredentialProvider(): boolean {
    return this.provider === 'credential';
  }

  @Expose()
  public get isTokenExpired(): boolean {
    if (!this.accessTokenExpiresAt) {
      return false;
    }
    return new Date() > this.accessTokenExpiresAt;
  }

  @Expose()
  public get isRefreshTokenExpired(): boolean {
    if (!this.refreshTokenExpiresAt) {
      return false;
    }
    return new Date() > this.refreshTokenExpiresAt;
  }

  public static from(identity: Identity): IdentityDto {
    return new IdentityDto(
      identity.id.value,
      identity.userId.value,
      identity.providerUserId,
      identity.provider,
      identity.accessToken || null,
      identity.refreshToken || null,
      identity.tokenExpiresAt || null,
      identity.tokenExpiresAt || null,
      identity.scopes || null,
      null,
      null,
      identity.createdAt,
      identity.updatedAt,
    );
  }
}
