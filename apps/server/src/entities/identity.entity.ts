import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';

import { Password } from '@finda-co/domain-auth-core';

import { UserEntity } from './user.entity';

export enum IdentityProvider {
  CREDENTIAL = 'credential',
  GOOGLE = 'google',
  GITHUB = 'github',
  FACEBOOK = 'facebook',
}

// Password值对象转换器
const passwordTransformer: ValueTransformer = {
  // 数据库 -> 实体（读取操作）
  from(value: string | null): Password | null {
    if (!value) return null;
    return Password.from(value);
  },
  // 实体 -> 数据库（写入操作）
  to(value: Password | string | null): string | null {
    if (!value) return null;
    if (typeof value === 'string') return value;
    return value.value;
  },
};

// 内部令牌，用于限制子实体关键方法的访问
export const INTERNAL_IDENTITY_FUNC_TOKEN = Symbol('INTERNAL_IDENTITY_FUNC_TOKEN');

@Entity({ name: 'identity', schema: 'auth' })
export class IdentityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  @Index('identity_user_id_index')
  userId: string;

  @Column({ name: 'identity_id' })
  identityId: string;

  @Column({
    type: 'enum',
    enum: IdentityProvider,
  })
  provider: IdentityProvider;

  @Column({ name: 'access_token', nullable: true })
  accessToken: string | null;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string | null;

  @Column({ name: 'access_token_expires_at', nullable: true })
  accessTokenExpiresAt: Date | null;

  @Column({ name: 'refresh_token_expires_at', nullable: true })
  refreshTokenExpiresAt: Date | null;

  @Column('simple-array', { nullable: true })
  scope: string[];

  @Column({ name: 'id_token', nullable: true })
  idToken: string;

  @Column({
    nullable: true,
    transformer: passwordTransformer,
  })
  password: Password | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  // 关系
  @ManyToOne(() => UserEntity, (user) => user.identities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  // 静态工厂方法
  public static create(
    id: string,
    userId: string,
    provider: IdentityProvider,
    providerUserId: string,
    options?: {
      accountId?: string;
      email?: string;
      name?: string;
      scope?: string[];
      accessToken?: string;
      refreshToken?: string;
      tokenExpiresAt?: Date;
      password?: string | Password;
    },
  ): IdentityEntity {
    const now = new Date();

    const identity = new IdentityEntity();
    identity.id = id;
    identity.userId = userId;
    identity.provider = provider;
    identity.identityId = providerUserId;
    identity.accessToken = options?.accessToken || null;
    identity.refreshToken = options?.refreshToken || null;
    identity.accessTokenExpiresAt = options?.tokenExpiresAt || null;
    identity.scope = options?.scope || [];

    // 对于已存在的Password对象，直接设置
    if (options?.password && typeof options.password !== 'string') {
      identity.password = options.password;
    } else {
      identity.password = null;
    }

    identity.createdAt = now;
    identity.updatedAt = now;

    return identity;
  }

  /**
   * 异步静态工厂方法 - 支持密码哈希
   * @param id 身份ID
   * @param userId 用户ID
   * @param provider 提供商
   * @param providerUserId 提供商用户ID
   * @param options 其他选项，包括明文密码
   * @returns Promise<IdentityEntity> 带密码哈希的实体
   */
  public static async createWithPassword(
    id: string,
    userId: string,
    provider: IdentityProvider,
    providerUserId: string,
    options?: {
      accountId?: string;
      email?: string;
      name?: string;
      scope?: string[];
      accessToken?: string;
      refreshToken?: string;
      tokenExpiresAt?: Date;
      password?: string;
    },
  ): Promise<IdentityEntity> {
    // 创建基本实体
    const identity = this.create(id, userId, provider, providerUserId, {
      ...options,
      password: undefined, // 先不设置密码
    });

    // 如果有密码，且是credential类型，异步设置密码
    if (options?.password && provider === IdentityProvider.CREDENTIAL) {
      identity.password = await Password.create(options.password);
    }

    return identity;
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
  public setUser(user: UserEntity): void {
    if (user.id !== this.userId) {
      throw new Error('用户ID不匹配，无法设置用户引用');
    }
    this.user = user;
  }

  /**
   * 设置密码 - 内部方法
   * 此方法受内部令牌保护，只能由User聚合根调用
   * @param token 内部令牌
   * @param newPassword 密码
   */
  public async setPassword(token: symbol, newPassword: string | Password): Promise<void> {
    this._checkInternalToken(token);

    if (this.provider !== IdentityProvider.CREDENTIAL) {
      throw new Error('只有credential提供商支持设置密码');
    }

    if (typeof newPassword === 'string') {
      // 使用Password值对象创建密码
      this.password = await Password.create(newPassword);
    } else {
      this.password = newPassword;
    }

    this.updatedAt = new Date();
  }

  /**
   * 更新身份信息 - 内部方法
   * 此方法受内部令牌保护，只能由User聚合根调用
   * @param token 内部令牌
   * @param props 要更新的属性
   */
  public updateIdentity(
    token: symbol,
    props: {
      email?: string;
      name?: string;
      accountId?: string;
      accessToken?: string;
      refreshToken?: string;
      tokenExpiresAt?: Date;
    },
  ): void {
    this._checkInternalToken(token);

    if (props.accessToken !== undefined) this.accessToken = props.accessToken;
    if (props.refreshToken !== undefined) this.refreshToken = props.refreshToken;
    if (props.tokenExpiresAt !== undefined) this.accessTokenExpiresAt = props.tokenExpiresAt;

    this.updatedAt = new Date();
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

    this.accessToken = accessToken;
    this.refreshToken = refreshToken || null;
    this.accessTokenExpiresAt = expiresAt || null;
    this.updatedAt = new Date();
  }

  /**
   * 更新授权作用域 - 内部方法
   * 此方法受内部令牌保护，只能由User聚合根调用
   * @param token 内部令牌
   * @param scope 新的授权作用域
   */
  public updateScopes(token: symbol, scope: string[]): void {
    this._checkInternalToken(token);

    if (JSON.stringify(this.scope) === JSON.stringify(scope)) {
      return; // 作用域未变更，无需更新
    }

    this.scope = [...scope];
    this.updatedAt = new Date();
  }

  /**
   * 标记身份为已删除 - 内部方法
   * 此方法受内部令牌保护，只能由User聚合根调用
   * @param token 内部令牌
   */
  public markAsRemoved(token: symbol): void {
    this._checkInternalToken(token);
    this.deletedAt = new Date();
  }

  /**
   * 检查Token是否过期
   * @returns 是否过期
   */
  public isTokenExpired(): boolean {
    if (!this.accessTokenExpiresAt) {
      return false;
    }

    return this.accessTokenExpiresAt < new Date();
  }

  /**
   * 验证密码（仅适用于credential提供商）
   * @param plainPassword 明文密码
   * @returns 是否匹配
   * @throws Error 如果提供商不是credential或密码不存在
   */
  public async verifyPassword(plainPassword: string): Promise<boolean> {
    if (this.provider !== IdentityProvider.CREDENTIAL) {
      throw new Error('只有credential提供商支持密码验证');
    }

    if (!this.password) {
      throw new Error('没有设置密码');
    }

    // 使用Password值对象的verify方法验证密码
    return await this.password.verify(plainPassword);
  }

  /**
   * 检查身份是否具有特定作用域
   * @param scopeItem 要检查的作用域
   */
  public hasScope(scopeItem: string): boolean {
    return this.scope?.includes(scopeItem) || false;
  }

  /**
   * 检查身份是否具有所有指定的作用域
   * @param scopeItems 要检查的作用域列表
   */
  public hasScopes(scopeItems: string[]): boolean {
    return scopeItems.every((scope) => this.hasScope(scope));
  }

  /**
   * 初始化密码 - 公共方法
   * 不需要内部令牌，用于初始化过程中设置密码
   * @param plainPassword 明文密码
   * @throws Error 如果提供商不是credential类型
   */
  public async initializePassword(plainPassword: string): Promise<void> {
    if (this.provider !== IdentityProvider.CREDENTIAL) {
      throw new Error('只有credential提供商支持设置密码');
    }

    if (this.password) {
      throw new Error('密码已经设置，无法初始化');
    }

    this.password = await Password.create(plainPassword);
    this.updatedAt = new Date();
  }
}
