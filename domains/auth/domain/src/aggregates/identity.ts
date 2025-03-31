import { Entity } from '@finda-co/core';

import { IdentityId } from '../value-objects/identity-id';
import { UserId } from '../value-objects/user-id';
import { User } from './user';

// 内部令牌，用于限制子实体关键方法的访问
export const INTERNAL_IDENTITY_FUNC_TOKEN = Symbol('INTERNAL_IDENTITY_FUNC_TOKEN');

// 定义支持的提供商类型
export const identityProviderValues = ['credential', 'google', 'github', 'facebook'] as const;
export type IdentityProvider = (typeof identityProviderValues)[number];

export interface IdentityProps {
  id: IdentityId;
  userId: UserId;
  provider: IdentityProvider; // 例如 'credential', 'google', 'github', 'facebook' 等
  providerUserId: string; // 在提供商系统中的用户ID
  accountId: string; // 提供商提供的帐户ID，对于credential类型则等于userId
  email?: string; // 可选，从提供商获取的电子邮箱
  name?: string; // 可选，从提供商获取的名称
  scopes?: string[]; // 授权作用域
  accessToken?: string; // OAuth访问令牌
  refreshToken?: string; // OAuth刷新令牌
  tokenExpiresAt?: Date; // 令牌过期时间
  password?: string; // 密码，仅用于credential类型
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Identity实体代表用户的一个认证源
 * 一个用户可以有多个Identity（如Google, Facebook, Email等）
 */
export class Identity extends Entity<IdentityProps> {
  private _id: IdentityId;
  private _userId: UserId;
  private _provider: IdentityProvider;
  private _providerUserId: string;
  private _accountId: string;
  private _email?: string;
  private _name?: string;
  private _scopes: string[];
  private _accessToken?: string;
  private _refreshToken?: string;
  private _tokenExpiresAt?: Date;
  private _password?: string; // 添加密码属性，仅用于credential类型
  private _createdAt: Date;
  private _updatedAt: Date;

  // 用户实体的引用，用于双向导航
  private _user?: User;

  constructor(props: IdentityProps, isNew: boolean = true) {
    super(isNew);
    this._id = props.id;
    this._userId = props.userId;
    this._provider = props.provider;
    this._providerUserId = props.providerUserId;
    this._accountId = props.accountId;
    this._email = props.email;
    this._name = props.name;
    this._scopes = props.scopes || [];
    this._accessToken = props.accessToken;
    this._refreshToken = props.refreshToken;
    this._tokenExpiresAt = props.tokenExpiresAt;
    this._password = props.password;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  /**
   * 创建新的身份
   * 注意：此方法应由User聚合根调用，不应直接在领域外部使用
   * @param id 身份ID
   * @param userId 用户ID
   * @param provider 提供商
   * @param providerUserId 在提供商中的用户ID
   * @param options 其他选项
   */
  public static create(
    id: IdentityId,
    userId: UserId,
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
      password?: string;
    },
  ): Identity {
    const now = new Date();

    const identity = new Identity({
      id,
      userId,
      provider,
      providerUserId,
      accountId: options?.accountId || (provider === 'credential' ? userId.value : providerUserId),
      email: options?.email,
      name: options?.name,
      scopes: options?.scopes || [],
      accessToken: options?.accessToken,
      refreshToken: options?.refreshToken,
      tokenExpiresAt: options?.tokenExpiresAt,
      password: options?.password,
      createdAt: now,
      updatedAt: now,
    });

    return identity;
  }

  /**
   * 从持久化存储加载身份
   */
  public static load(props: IdentityProps): Identity {
    return new Identity(props, false);
  }

  // 获取器
  public get id(): IdentityId {
    return this._id;
  }

  public get userId(): UserId {
    return this._userId;
  }

  public get provider(): IdentityProvider {
    return this._provider;
  }

  public get providerUserId(): string {
    return this._providerUserId;
  }

  public get accountId(): string {
    return this._accountId;
  }

  public get email(): string | undefined {
    return this._email;
  }

  public get name(): string | undefined {
    return this._name;
  }

  public get scopes(): string[] {
    return [...this._scopes];
  }

  public get accessToken(): string | undefined {
    return this._accessToken;
  }

  public get refreshToken(): string | undefined {
    return this._refreshToken;
  }

  public get tokenExpiresAt(): Date | undefined {
    return this._tokenExpiresAt;
  }

  public get password(): string | undefined {
    return this._password;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public get user(): User | undefined {
    return this._user;
  }

  /**
   * 检查Token是否为内部令牌
   * @param token 要检查的令牌
   * @throws Error 如果令牌不是内部令牌
   */
  private _checkInternalToken(token: symbol): void {
    if (token !== INTERNAL_IDENTITY_FUNC_TOKEN) {
      throw new Error('不允许在领域外部调用内部实体方法');
    }
  }

  // 设置用户引用，用于双向导航
  public setUser(user: User): void {
    if (user.id.value !== this._userId.value) {
      throw new Error('用户ID不匹配，无法设置用户引用');
    }
    this._user = user;
  }

  /**
   * 更新身份信息 - 内部方法
   * 此方法受内部令牌保护，只能由User聚合根调用
   * @param token 内部令牌
   * @param props 要更新的属性
   */
  public updateIdentity(token: symbol, props: Partial<IdentityProps>): void {
    this._checkInternalToken(token);
    super.update(props);

    if (props.email !== undefined) this._email = props.email;
    if (props.name !== undefined) this._name = props.name;
    if (props.accountId !== undefined) this._accountId = props.accountId;
    if (props.accessToken !== undefined) this._accessToken = props.accessToken;
    if (props.refreshToken !== undefined) this._refreshToken = props.refreshToken;
    if (props.tokenExpiresAt !== undefined) this._tokenExpiresAt = props.tokenExpiresAt;

    this._updatedAt = new Date();
  }

  /**
   * 更新OAuth令牌 - 内部方法
   * 此方法受内部令牌保护，只能由User聚合根调用
   * @param token 内部令牌
   * @param accessToken 新的访问令牌
   * @param refreshToken 新的刷新令牌
   * @param expiresAt 令牌过期时间
   */
  public updateTokens(
    token: symbol,
    accessToken: string,
    refreshToken?: string,
    expiresAt?: Date,
  ): void {
    this._checkInternalToken(token);
    this.update({
      accessToken,
      refreshToken,
      tokenExpiresAt: expiresAt,
      updatedAt: new Date(),
    } as Partial<IdentityProps>);
  }

  /**
   * 更新授权作用域 - 内部方法
   * 此方法受内部令牌保护，只能由User聚合根调用
   * @param token 内部令牌
   * @param scopes 新的授权作用域
   */
  public updateScopes(token: symbol, scopes: string[]): void {
    this._checkInternalToken(token);

    if (JSON.stringify(this._scopes) === JSON.stringify(scopes)) {
      return; // 作用域未变更，无需更新
    }

    this._scopes = [...scopes];

    this.update({
      updatedAt: new Date(),
    } as Partial<IdentityProps>);
  }

  /**
   * 标记身份为已删除 - 内部方法
   * 此方法受内部令牌保护，只能由User聚合根调用
   * @param token 内部令牌
   */
  public markAsRemoved(token: symbol): void {
    this._checkInternalToken(token);
  }

  /**
   * 检查Token是否过期
   * @returns 是否过期
   */
  public isTokenExpired(): boolean {
    if (!this._tokenExpiresAt) {
      return false;
    }

    return this._tokenExpiresAt < new Date();
  }

  /**
   * 验证密码（仅适用于credential提供商）
   * @param plainPassword 明文密码
   * @returns 是否匹配
   * @throws Error 如果提供商不是credential或密码不存在
   */
  public async verifyPassword(plainPassword: string): Promise<boolean> {
    if (this._provider !== 'credential') {
      throw new Error('只有credential提供商支持密码验证');
    }

    if (!this._password) {
      throw new Error('没有设置密码');
    }

    // 这里应该调用密码验证服务
    return false; // 示例实现
  }

  /**
   * 检查身份是否具有特定作用域
   * @param scope 要检查的作用域
   */
  public hasScope(scope: string): boolean {
    return this._scopes.includes(scope);
  }

  /**
   * 检查身份是否具有所有指定的作用域
   * @param scopes 要检查的作用域列表
   */
  public hasScopes(scopes: string[]): boolean {
    return scopes.every((scope) => this._scopes.includes(scope));
  }
}
