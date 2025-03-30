import { Entity } from '@finda-co/core';

import { DomainError } from '../core/domain-error';
import { SessionExpiredError } from '../errors/user-errors';
import {
  SessionCreatedEvent,
  SessionExpiredEvent,
  SessionExtendedEvent,
  SessionTerminatedEvent,
} from '../events/session-events';
import { generateToken, signJwt, verifyJwt } from '../utils';
import { SessionId } from '../value-objects/session-id';
import { UserId } from '../value-objects/user-id';

export interface SessionProps {
  id: SessionId;
  userId: UserId;
  token?: string;
  ipAddress?: string;
  userAgent?: string;
  impersonatedBy?: UserId;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Session extends Entity<SessionProps> {
  private _id: SessionId;
  private _userId: UserId;
  private _token?: string;
  private _ipAddress?: string;
  private _userAgent?: string;
  private _impersonatedBy?: UserId;
  private _expiresAt: Date;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: SessionProps, isNew: boolean = true) {
    super(isNew);
    this._id = props.id;
    this._userId = props.userId;
    this._token = props.token;
    this._ipAddress = props.ipAddress;
    this._userAgent = props.userAgent;
    this._impersonatedBy = props.impersonatedBy;
    this._expiresAt = props.expiresAt;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  // 工厂方法
  public static create(
    id: SessionId,
    userId: UserId,
    token?: string,
    ipAddress?: string,
    userAgent?: string,
    impersonatedBy?: UserId,
    expiresAtMinutes: number = 60 * 24 * 7, // 默认7天
  ): Session {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + expiresAtMinutes * 60 * 1000);
    const sessionToken = token || generateToken();

    const session = new Session({
      id,
      userId,
      token: sessionToken,
      ipAddress,
      userAgent,
      impersonatedBy,
      expiresAt,
      createdAt: now,
      updatedAt: now,
    });

    return session;
  }

  // 重建会话
  public static load(props: SessionProps): Session {
    return new Session(props, false);
  }

  // 获取器
  public get id(): SessionId {
    return this._id;
  }

  public get userId(): UserId {
    return this._userId;
  }

  public get token(): string | undefined {
    return this._token;
  }

  public get ipAddress(): string | undefined {
    return this._ipAddress;
  }

  public get userAgent(): string | undefined {
    return this._userAgent;
  }

  public get impersonatedBy(): UserId | undefined {
    return this._impersonatedBy;
  }

  public get expiresAt(): Date {
    return this._expiresAt;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  // 业务方法
  public isExpired(): boolean {
    return new Date() > this._expiresAt;
  }

  public isImpersonated(): boolean {
    return !!this._impersonatedBy;
  }

  /**
   * 生成JWT令牌
   * @param secret JWT密钥
   * @param additionalData 要添加到JWT载荷的额外数据
   * @returns JWT令牌
   */
  public generateJwt(secret: string, additionalData: Record<string, any> = {}): string {
    if (this.isExpired()) {
      throw new SessionExpiredError();
    }

    // 计算过期时间（秒）
    const now = Math.floor(Date.now() / 1000);
    const exp = Math.floor(this._expiresAt.getTime() / 1000);
    const expiresIn = exp - now;

    return signJwt(
      {
        sub: this._userId.toString(),
        sid: this._id.toString(),
        ...additionalData,
      },
      secret,
      expiresIn,
    );
  }

  /**
   * 验证JWT令牌是否有效
   * @param jwt JWT令牌
   * @param secret JWT密钥
   * @returns 是否有效
   */
  public static verifyJwt(jwt: string, secret: string): boolean {
    const payload = verifyJwt(jwt, secret);
    return !!payload;
  }

  public terminate(): void {
    if (this.isExpired()) {
      return; // 已过期，无需终止
    }

    const now = new Date();
    this.update({
      expiresAt: now,
      updatedAt: now,
    } as Partial<SessionProps>);

    this._expiresAt = now;
  }

  public checkAndHandleExpiration(): boolean {
    if (!this.isExpired()) {
      return false;
    }

    return true;
  }

  public extend(minutes: number): void {
    if (this.isExpired()) {
      throw new SessionExpiredError();
    }

    const now = new Date();
    const newExpiresAt = new Date(now.getTime() + minutes * 60 * 1000);

    this.update({
      expiresAt: newExpiresAt,
      updatedAt: now,
    } as Partial<SessionProps>);

    this._expiresAt = newExpiresAt;
  }
}
