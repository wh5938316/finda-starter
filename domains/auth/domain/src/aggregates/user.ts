import { AggregateRoot } from '@finda-co/core';

import { DomainError } from '../core/domain-error';
import { CannotUnlinkLastIdentityError, IdentityNotFoundError } from '../errors/identity-errors';
import {
  EmailNotVerifiedError,
  InvalidCredentialsError,
  SessionNotFoundError,
  UserAccountBannedError,
  UserAccountDeactivatedError,
} from '../errors/user-errors';
import {
  UserActivatedEvent,
  UserAllSessionsRevokedEvent,
  UserAnonymousEvent,
  UserBannedEvent,
  UserCreatedEvent,
  UserDeactivatedEvent,
  UserEmailVerifiedEvent,
  UserLoggedInEvent,
  UserPasswordChangedEvent,
  UserProfileUpdatedEvent,
  UserRegularEvent,
  UserSessionRevokedEvent,
  UserUnbannedEvent,
} from '../events/user-events';
import { Email } from '../value-objects/email';
import { IdentityId } from '../value-objects/identity-id';
import { Password } from '../value-objects/password';
import { SessionId } from '../value-objects/session-id';
import { UserId } from '../value-objects/user-id';
import {
  INTERNAL_IDENTITY_FUNC_TOKEN,
  Identity,
  IdentityProps,
  IdentityProvider,
} from './identity';
import { Session } from './session';

export const userRoleValues = ['user', 'admin'] as const;
export type UserRole = (typeof userRoleValues)[number];

export interface UserProps {
  id: UserId;
  email: string;
  firstName?: string;
  lastName?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isAnonymous: boolean;
  role: UserRole;
  banned: boolean;
  banReason?: string;
  banExpires?: Date;
  image?: string;
  anonymousCreditAccountId?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  currentSessionId?: string;
}

export class User extends AggregateRoot<UserProps> {
  private _id: UserId;
  private _email: Email;
  private _password: Password;
  private _firstName?: string;
  private _lastName?: string;
  private _isActive: boolean;
  private _isEmailVerified: boolean;
  private _isAnonymous: boolean;
  private _role: UserRole;
  private _banned: boolean;
  private _banReason?: string;
  private _banExpires?: Date;
  private _image?: string;
  private _anonymousCreditAccountId?: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _lastLoginAt?: Date;
  private _currentSessionId?: string;

  // 子实体集合
  private _identities: Identity[] = [];
  private _sessions: Session[] = [];

  constructor(props: UserProps, isNew: boolean = true) {
    super(isNew);
    this._id = props.id;
    this._email = Email.create(props.email);
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._isActive = props.isActive;
    this._isEmailVerified = props.isEmailVerified;
    this._isAnonymous = props.isAnonymous;
    this._role = props.role;
    this._banned = props.banned;
    this._banReason = props.banReason;
    this._banExpires = props.banExpires;
    this._image = props.image;
    this._anonymousCreditAccountId = props.anonymousCreditAccountId;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._lastLoginAt = props.lastLoginAt;
    this._currentSessionId = props.currentSessionId;
  }

  // 工厂方法，创建新用户
  public static async create(
    id: UserId,
    email: string,
    plainPassword: string,
    firstName?: string,
    lastName?: string,
    role: UserRole = 'user',
    isAnonymous: boolean = false,
  ): Promise<User> {
    const emailObj = Email.create(email);
    const passwordObj = Password.create(plainPassword);
    const hashedPassword = await passwordObj.getHashedValue();

    const now = new Date();
    const user = new User({
      id,
      email: emailObj.value,
      firstName,
      lastName,
      isActive: true,
      isEmailVerified: false,
      isAnonymous,
      role,
      banned: false,
      createdAt: now,
      updatedAt: now,
    });

    user.apply(new UserCreatedEvent(id, emailObj.value));

    if (isAnonymous) {
      user.apply(new UserAnonymousEvent(id));
    }

    return user;
  }

  // 重建用户（从存储库恢复）
  public static load(props: UserProps): User {
    return new User(props, false);
  }

  // 获取器
  public get id(): UserId {
    return this._id;
  }

  public get email(): string {
    return this._email.value;
  }

  public get emailObj(): Email {
    return this._email;
  }

  public get passwordObj(): Password {
    return this._password;
  }

  public get firstName(): string | undefined {
    return this._firstName;
  }

  public get lastName(): string | undefined {
    return this._lastName;
  }

  public get fullName(): string {
    const parts: string[] = [];
    if (this._firstName) parts.push(this._firstName);
    if (this._lastName) parts.push(this._lastName);
    return parts.join(' ') || '';
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public get isEmailVerified(): boolean {
    return this._isEmailVerified;
  }

  public get isAnonymous(): boolean {
    return this._isAnonymous;
  }

  public get role(): UserRole {
    return this._role;
  }

  public get banned(): boolean {
    return this._banned;
  }

  public get banReason(): string | undefined {
    return this._banReason;
  }

  public get banExpires(): Date | undefined {
    return this._banExpires;
  }

  public get image(): string | undefined {
    return this._image;
  }

  public get anonymousCreditAccountId(): string | undefined {
    return this._anonymousCreditAccountId;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public get lastLoginAt(): Date | undefined {
    return this._lastLoginAt;
  }

  public get currentSessionId(): string | undefined {
    return this._currentSessionId;
  }

  public get identities(): Identity[] {
    return [...this._identities];
  }

  public get sessions(): Session[] {
    return [...this._sessions];
  }

  /**
   * 获取当前会话
   * @returns 当前会话，如果没有返回undefined
   */
  public getCurrentSession(): Session | undefined {
    if (!this._currentSessionId) {
      return undefined;
    }

    return this._sessions.find((s) => s.id.toString() === this._currentSessionId);
  }

  /**
   * 设置当前会话
   * @param session 要设置为当前会话的会话
   */
  public setCurrentSession(session: Session): void {
    // 确保会话属于此用户
    if (!session || session.userId.toString() !== this._id.toString()) {
      throw new Error('会话不属于此用户');
    }

    // 更新当前会话ID
    this.update({
      currentSessionId: session.id.toString(),
      updatedAt: new Date(),
    } as Partial<UserProps>);

    this._currentSessionId = session.id.toString();

    // 确保会话在用户的会话列表中
    this.addSession(session);
  }

  // 关系管理
  public addIdentity(identity: Identity): void {
    if (!this._identities.some((i) => i.id.toString() === identity.id.toString())) {
      this._identities.push(identity);
      identity.setUser(this);
    }
  }

  public removeIdentity(identityId: string): void {
    this._identities = this._identities.filter((i) => i.id.toString() !== identityId);
  }

  public addSession(session: Session): void {
    if (!this._sessions.some((s) => s.id.toString() === session.id.toString())) {
      this._sessions.push(session);
    }
  }

  public removeSession(sessionId: string): void {
    this._sessions = this._sessions.filter((s) => s.id.toString() !== sessionId);

    // 如果移除的是当前会话，清除当前会话ID
    if (this._currentSessionId === sessionId) {
      this._currentSessionId = undefined;

      this.update({
        currentSessionId: undefined,
        updatedAt: new Date(),
      } as Partial<UserProps>);
    }
  }

  /**
   * 撤销会话
   * @param sessionId 会话ID
   * @throws SessionNotFoundError 如果会话不存在
   */
  public revokeSession(sessionId: string | SessionId): void {
    const sessionIdStr = sessionId.toString();
    const session = this._sessions.find((s) => s.id.toString() === sessionIdStr);

    if (!session) {
      throw new SessionNotFoundError(sessionIdStr);
    }

    // 终止会话
    session.terminate();

    // 发布会话撤销事件
    this.apply(new UserSessionRevokedEvent(this._id, SessionId.from(sessionIdStr)));

    // 如果撤销的是当前会话，清除当前会话ID
    if (this._currentSessionId === sessionIdStr) {
      this._currentSessionId = undefined;

      this.update({
        currentSessionId: undefined,
        updatedAt: new Date(),
      } as Partial<UserProps>);
    }
  }

  /**
   * 撤销所有会话
   * 包括当前会话
   */
  public revokeAllSessions(): void {
    // 终止所有会话
    this._sessions.forEach((session) => {
      session.terminate();
    });

    // 清除当前会话ID
    this._currentSessionId = undefined;

    this.update({
      currentSessionId: undefined,
      updatedAt: new Date(),
    } as Partial<UserProps>);

    // 发布所有会话撤销事件
    this.apply(new UserAllSessionsRevokedEvent(this._id));
  }

  /**
   * 验证会话是否有效
   * @param sessionId 会话ID
   * @returns 会话是否有效
   */
  public validateSession(sessionId: string | SessionId): boolean {
    const sessionIdStr = sessionId.toString();
    const session = this._sessions.find((s) => s.id.toString() === sessionIdStr);

    if (!session) {
      return false;
    }

    return !session.isExpired();
  }

  // 业务方法
  public updateProfile(firstName?: string, lastName?: string, image?: string): void {
    this.update({
      firstName,
      lastName,
      image,
      updatedAt: new Date(),
    } as Partial<UserProps>);

    this.apply(new UserProfileUpdatedEvent(this._id, firstName, lastName));
  }

  public async updatePassword(plainPassword: string): Promise<void> {
    const passwordObj = Password.create(plainPassword);
    const hashedPassword = await passwordObj.getHashedValue();

    this.update({
      password: hashedPassword,
      updatedAt: new Date(),
    } as Partial<UserProps>);

    this._password = passwordObj;
    this.apply(new UserPasswordChangedEvent(this._id));

    // 密码更改后撤销所有会话（除当前会话外）
    this.revokeOtherSessions();
  }

  /**
   * 撤销除当前会话外的所有会话
   */
  public revokeOtherSessions(): void {
    if (!this._currentSessionId) {
      // 如果没有当前会话，撤销所有会话
      this.revokeAllSessions();
      return;
    }

    // 终止所有非当前会话
    this._sessions.forEach((session) => {
      if (session.id.toString() !== this._currentSessionId) {
        session.terminate();
      }
    });

    // 发布所有会话撤销事件
    this.apply(new UserAllSessionsRevokedEvent(this._id, this._currentSessionId));
  }

  public verifyEmail(): void {
    if (this._isEmailVerified) {
      return; // 已经验证过了，无需再次验证
    }

    this.update({
      isEmailVerified: true,
      updatedAt: new Date(),
    } as Partial<UserProps>);

    this._isEmailVerified = true;
    this.apply(new UserEmailVerifiedEvent(this._id));
  }

  public deactivate(): void {
    if (!this._isActive) {
      return; // 已经停用，无需再次停用
    }

    this.update({
      isActive: false,
      updatedAt: new Date(),
    } as Partial<UserProps>);

    this._isActive = false;
    this.apply(new UserDeactivatedEvent(this._id));

    // 停用账户时撤销所有会话
    this.revokeAllSessions();
  }

  public activate(): void {
    if (this._isActive) {
      return; // 已经激活，无需再次激活
    }

    this.update({
      isActive: true,
      updatedAt: new Date(),
    } as Partial<UserProps>);

    this._isActive = true;
    this.apply(new UserActivatedEvent(this._id));
  }

  public ban(reason?: string, expiresDays?: number): void {
    if (this._banned) {
      return; // 已经被封禁
    }

    const banExpires = expiresDays
      ? new Date(Date.now() + expiresDays * 24 * 60 * 60 * 1000)
      : undefined;

    this.update({
      banned: true,
      banReason: reason,
      banExpires,
      updatedAt: new Date(),
    } as Partial<UserProps>);

    this._banned = true;
    this._banReason = reason;
    this._banExpires = banExpires;

    this.apply(new UserBannedEvent(this._id, reason, banExpires));

    // 封禁账户时撤销所有会话
    this.revokeAllSessions();
  }

  public unban(): void {
    if (!this._banned) {
      return; // 未被封禁
    }

    this.update({
      banned: false,
      banReason: undefined,
      banExpires: undefined,
      updatedAt: new Date(),
    } as Partial<UserProps>);

    this._banned = false;
    this._banReason = undefined;
    this._banExpires = undefined;

    this.apply(new UserUnbannedEvent(this._id));
  }

  public convertToRegular(email: string): void {
    if (!this._isAnonymous) {
      return; // 已经是正式用户
    }

    const emailObj = Email.create(email);

    this.update({
      isAnonymous: false,
      email: emailObj.value,
      anonymousCreditAccountId: undefined,
      updatedAt: new Date(),
    } as Partial<UserProps>);

    this._isAnonymous = false;
    this._email = emailObj;
    this._anonymousCreditAccountId = undefined;

    this.apply(new UserRegularEvent(this._id, emailObj.value));
  }

  public recordLogin(): void {
    const now = new Date();
    this.update({
      lastLoginAt: now,
      updatedAt: now,
    } as Partial<UserProps>);

    this._lastLoginAt = now;
    this.apply(new UserLoggedInEvent(this._id, now));
  }

  // 检查用户是否可以登录
  public checkCanLogin(): boolean {
    if (!this._isActive) {
      throw new UserAccountDeactivatedError();
    }

    if (this._banned) {
      throw new UserAccountBannedError(this._banReason, this._banExpires);
    }

    if (!this._isEmailVerified && !this._isAnonymous) {
      throw new EmailNotVerifiedError();
    }

    return true;
  }

  // 检查用户是否为管理员
  public isAdmin(): boolean {
    return this._role === 'admin';
  }

  // 是否封禁已过期
  public isBanExpired(): boolean {
    if (!this._banned || !this._banExpires) {
      return false;
    }

    return new Date() > this._banExpires;
  }

  // 检查封禁状态并可能解除封禁
  public checkAndHandleBanExpiration(): boolean {
    if (this.isBanExpired()) {
      this.unban();
      return true;
    }
    return false;
  }

  /**
   * 创建并添加一个新的身份
   * @param id 身份ID
   * @param provider 提供商
   * @param providerUserId 在提供商系统中的用户ID
   * @param options 其他选项
   * @returns 创建的身份
   */
  public createIdentity(
    id: IdentityId,
    provider: IdentityProvider,
    providerUserId: string,
    options?: {
      accountId?: string;
      email?: string;
      name?: string;
      scopes?: string[];
      accessToken?: string;
      refreshToken?: string;
      tokenExpiresAt?: Date;
      password?: string; // 为credential类型添加密码选项
    },
  ): Identity {
    const identity = Identity.create(id, this._id, provider, providerUserId, options);
    this.addIdentity(identity);
    return identity;
  }

  /**
   * 更新身份信息
   * @param identityId 身份ID
   * @param props 要更新的属性
   * @throws IdentityNotFoundError 如果身份不存在
   */
  public updateIdentity(identityId: string | IdentityId, props: Partial<IdentityProps>): void {
    const identity = this.findIdentity(identityId);
    if (!identity) {
      throw new IdentityNotFoundError(identityId.toString());
    }

    identity.updateIdentity(INTERNAL_IDENTITY_FUNC_TOKEN, props);
  }

  /**
   * 更新身份令牌
   * @param identityId 身份ID
   * @param accessToken 新的访问令牌
   * @param refreshToken 新的刷新令牌
   * @param expiresAt 令牌过期时间
   * @throws IdentityNotFoundError 如果身份不存在
   */
  public updateIdentityTokens(
    identityId: string | IdentityId,
    accessToken: string,
    refreshToken?: string,
    expiresAt?: Date,
  ): void {
    const identity = this.findIdentity(identityId);
    if (!identity) {
      throw new IdentityNotFoundError(identityId.toString());
    }

    identity.updateTokens(INTERNAL_IDENTITY_FUNC_TOKEN, accessToken, refreshToken, expiresAt);
  }

  /**
   * 更新身份授权作用域
   * @param identityId 身份ID
   * @param scopes 新的授权作用域
   * @throws IdentityNotFoundError 如果身份不存在
   */
  public updateIdentityScopes(identityId: string | IdentityId, scopes: string[]): void {
    const identity = this.findIdentity(identityId);
    if (!identity) {
      throw new IdentityNotFoundError(identityId.toString());
    }

    identity.updateScopes(INTERNAL_IDENTITY_FUNC_TOKEN, scopes);
  }

  /**
   * 解除身份链接
   * @param identityId 身份ID
   * @throws IdentityNotFoundError 如果身份不存在
   * @throws CannotUnlinkLastIdentityError 如果尝试解除最后一个身份
   */
  public unlinkIdentity(identityId: string | IdentityId): void {
    const identity = this.findIdentity(identityId);
    if (!identity) {
      throw new IdentityNotFoundError(identityId.toString());
    }

    // 确保用户至少有一个其他身份
    if (this._identities.length <= 1) {
      throw new CannotUnlinkLastIdentityError();
    }

    // 标记身份为已删除
    identity.markAsRemoved(INTERNAL_IDENTITY_FUNC_TOKEN);

    // 从用户的身份集合中移除
    this.removeIdentity(identity.id.toString());
  }

  /**
   * 查找身份
   * @param identityId 身份ID
   * @returns 找到的身份，如果不存在返回undefined
   */
  public findIdentity(identityId: string | IdentityId): Identity | undefined {
    const idStr = identityId.toString();
    return this._identities.find((i) => i.id.toString() === idStr);
  }

  /**
   * 查找指定提供商的身份
   * @param provider 提供商
   * @returns 找到的身份列表
   */
  public findIdentitiesByProvider(provider: IdentityProvider): Identity[] {
    return this._identities.filter((i) => i.provider === provider);
  }

  /**
   * 检查用户是否有指定提供商的身份
   * @param provider 提供商
   * @returns 是否有该提供商的身份
   */
  public hasIdentityProvider(provider: IdentityProvider): boolean {
    return this._identities.some((i) => i.provider === provider);
  }

  /**
   * 使用凭证身份验证用户
   * @param plainPassword 明文密码
   * @returns 验证成功返回true
   * @throws InvalidCredentialsError 如果凭证无效
   * @throws UserAccountBannedError 如果账户被禁止
   * @throws UserAccountDeactivatedError 如果账户未激活
   */
  public async authenticate(plainPassword: string): Promise<boolean> {
    // 查找credential类型的身份
    const credentialIdentity = this._identities.find(
      (identity) => identity.provider === 'credential',
    );

    if (!credentialIdentity) {
      throw new InvalidCredentialsError();
    }

    // 验证密码 - 通过Identity进行验证
    try {
      const isValid = await credentialIdentity.verifyPassword(plainPassword);
      if (!isValid) {
        throw new InvalidCredentialsError();
      }
    } catch (error) {
      throw new InvalidCredentialsError();
    }

    // 验证通过后检查登录状态
    this.checkCanLogin();
    return true;
  }
}
