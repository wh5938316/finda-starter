import {
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';

import { Email } from '@finda-co/domain-auth-core';

import { IdentityEntity } from './identity.entity';
import { SessionEntity } from './session.entity';

// Email值对象转换器
const emailTransformer: ValueTransformer = {
  // 数据库 -> 实体（读取操作）
  from(value: string | null): Email | null {
    if (!value) return null;
    return Email.from(value);
  },
  // 实体 -> 数据库（写入操作）
  to(value: Email | string): string {
    if (typeof value === 'string') return value;
    return value.value;
  },
};

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

// 用户可变数据接口
export interface UserChangeableData {
  email?: string | Email;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
  isAnonymous?: boolean;
  role?: UserRole;
  banned?: boolean;
  banReason?: string;
  banExpires?: Date;
  image?: string;
  anonymousCreditAccountId?: string;
  updatedAt?: Date;
  lastLoginAt?: Date;
}

@Entity({ name: 'user', schema: 'auth' })
@Check(`"is_anonymous" = true OR "email" IS NOT NULL`)
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName: string | null;

  @Column({ nullable: true })
  lastName: string | null;

  @Column({
    length: 320,
    nullable: false,
    unique: true,
    transformer: emailTransformer,
  })
  @Index('email_unique_index', { unique: true })
  email: Email;

  @Column({ name: 'email_verified', default: false })
  emailVerified: boolean;

  @Column({ nullable: true })
  image: string | null;

  @Column({ name: 'is_anonymous', default: false })
  isAnonymous: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ default: false })
  banned: boolean;

  @Column({ name: 'ban_reason', nullable: true })
  banReason: string | null;

  @Column({ name: 'ban_expires', nullable: true })
  banExpires: Date | null;

  @Column({ name: 'anonymous_credit_account_id', nullable: true })
  anonymousCreditAccountId: string | null;

  @Column({ name: 'last_login_at', nullable: true })
  lastLoginAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  // 关系
  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];

  @OneToMany(() => SessionEntity, (session) => session.impersonator)
  impersonations: SessionEntity[];

  @OneToMany(() => IdentityEntity, (identity) => identity.user)
  identities: IdentityEntity[];

  // 内存状态，不会被持久化
  private _currentSessionId?: string;

  // 静态工厂方法
  public static create(
    id: string,
    email: string | Email,
    firstName?: string,
    lastName?: string,
    role: UserRole = UserRole.USER,
    isAnonymous: boolean = false,
  ): UserEntity {
    const user = new UserEntity();
    user.id = id;

    // 根据输入类型设置email
    if (typeof email === 'string') {
      user.email = Email.from(email);
    } else {
      user.email = email;
    }

    user.firstName = firstName || null;
    user.lastName = lastName || null;
    user.isActive = true;
    user.emailVerified = false;
    user.isAnonymous = isAnonymous;
    user.role = role;
    user.banned = false;
    user.createdAt = new Date();
    user.updatedAt = new Date();
    return user;
  }

  // 获取完整用户名
  public get fullName(): string {
    const parts: string[] = [];
    if (this.firstName) parts.push(this.firstName);
    if (this.lastName) parts.push(this.lastName);
    return parts.join(' ') || '';
  }

  // 非持久化属性，仅在内存中使用
  public get currentSessionId(): string | undefined {
    return this._currentSessionId;
  }

  // 设置当前会话
  public setCurrentSession(session: SessionEntity): void {
    // 确保会话属于此用户
    if (!session || session.userId !== this.id) {
      throw new Error('会话不属于此用户');
    }

    // 更新当前会话ID（内存中的状态）
    this._currentSessionId = session.id;

    // 确保会话在用户的会话列表中
    this.addSession(session);
  }

  // 关系管理
  public addIdentity(identity: IdentityEntity): void {
    if (!this.identities) {
      this.identities = [];
    }

    if (!this.identities.some((i) => i.id === identity.id)) {
      this.identities.push(identity);
      identity.user = this;
    }
  }

  public removeIdentity(identityId: string): void {
    if (!this.identities) return;
    this.identities = this.identities.filter((i) => i.id !== identityId);
  }

  public addSession(session: SessionEntity): void {
    if (!this.sessions) {
      this.sessions = [];
    }

    if (!this.sessions.some((s) => s.id === session.id)) {
      this.sessions.push(session);
    }
  }

  public removeSession(sessionId: string): void {
    if (!this.sessions) return;
    this.sessions = this.sessions.filter((s) => s.id !== sessionId);

    // 如果移除的是当前会话，清除当前会话ID
    if (this._currentSessionId === sessionId) {
      this._currentSessionId = undefined;
    }
  }

  // 业务方法
  public updateProfile(firstName?: string, lastName?: string, image?: string): void {
    // 更新属性
    this.firstName = firstName || null;
    this.lastName = lastName || null;
    this.image = image || null;
    this.updatedAt = new Date();
  }

  public verifyEmail(): void {
    if (this.emailVerified) {
      return; // 已经验证过了，无需再次验证
    }

    this.emailVerified = true;
    this.updatedAt = new Date();
  }

  public deactivate(): void {
    if (!this.isActive) {
      return; // 已经停用，无需再次停用
    }

    this.isActive = false;
    this.updatedAt = new Date();

    // 停用账户时撤销所有会话
    this.revokeAllSessions();
  }

  public activate(): void {
    if (this.isActive) {
      return; // 已经激活，无需再次激活
    }

    this.isActive = true;
    this.updatedAt = new Date();
  }

  public ban(reason?: string, expiresDays?: number): void {
    if (this.banned) {
      return; // 已经被封禁
    }

    const banExpires = expiresDays
      ? new Date(Date.now() + expiresDays * 24 * 60 * 60 * 1000)
      : null;

    this.banned = true;
    this.banReason = reason || null;
    this.banExpires = banExpires;
    this.updatedAt = new Date();

    // 封禁账户时撤销所有会话
    this.revokeAllSessions();
  }

  public unban(): void {
    if (!this.banned) {
      return; // 未被封禁
    }

    this.banned = false;
    this.banReason = null;
    this.banExpires = null;
    this.updatedAt = new Date();
  }

  public convertToRegular(email: string | Email): void {
    if (!this.isAnonymous) {
      return; // 已经是正式用户
    }

    this.isAnonymous = false;

    // 根据输入类型设置email
    if (typeof email === 'string') {
      this.email = Email.from(email);
    } else {
      this.email = email;
    }

    this.anonymousCreditAccountId = null;
    this.updatedAt = new Date();
  }

  public recordLogin(): void {
    const now = new Date();
    this.lastLoginAt = now;
    this.updatedAt = now;
  }

  // 检查用户是否可以登录
  public checkCanLogin(): boolean {
    if (!this.isActive) {
      throw new Error('用户账户已停用');
    }

    if (this.banned) {
      throw new Error('用户账户已被封禁');
    }

    if (!this.emailVerified && !this.isAnonymous) {
      throw new Error('邮箱未验证');
    }

    return true;
  }

  // 撤销会话
  public revokeSession(sessionId: string): void {
    const session = this.sessions?.find((s) => s.id === sessionId);

    if (!session) {
      throw new Error(`找不到会话：${sessionId}`);
    }

    // 终止会话
    session.terminate();

    // 如果撤销的是当前会话，清除当前会话ID
    if (this._currentSessionId === sessionId) {
      this._currentSessionId = undefined;
    }
  }

  // 撤销所有会话
  public revokeAllSessions(): void {
    // 终止所有会话
    this.sessions?.forEach((session) => {
      session.terminate();
    });

    // 清除当前会话ID
    this._currentSessionId = undefined;
  }

  // 检查用户是否为管理员
  public isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  // 是否封禁已过期
  public isBanExpired(): boolean {
    if (!this.banned || !this.banExpires) {
      return false;
    }

    return new Date() > this.banExpires;
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
   * 查找身份
   * @param identityId 身份ID
   * @returns 找到的身份，如果不存在返回undefined
   */
  public findIdentity(identityId: string): IdentityEntity | undefined {
    return this.identities?.find((i) => i.id === identityId);
  }

  /**
   * 查找指定提供商的身份
   * @param provider 提供商
   * @returns 找到的身份列表
   */
  public findIdentitiesByProvider(provider: string): IdentityEntity[] {
    return this.identities?.filter((i) => i.provider === provider) || [];
  }

  /**
   * 检查用户是否有指定提供商的身份
   * @param provider 提供商
   * @returns 是否有该提供商的身份
   */
  public hasIdentityProvider(provider: string): boolean {
    return this.identities?.some((i) => i.provider === provider) || false;
  }

  /**
   * 使用凭证身份验证用户
   * @param plainPassword 明文密码
   * @returns 验证成功返回true
   */
  public async authenticate(plainPassword: string): Promise<boolean> {
    // 查找credential类型的身份
    const credentialIdentity = this.identities?.find(
      (identity) => identity.provider === 'credential',
    );

    if (!credentialIdentity) {
      throw new Error('凭证无效');
    }

    // 验证密码
    try {
      const isValid = await credentialIdentity.verifyPassword(plainPassword);
      if (!isValid) {
        throw new Error('凭证无效');
      }
    } catch (error) {
      throw new Error('凭证无效');
    }

    // 验证通过后检查登录状态
    this.checkCanLogin();
    return true;
  }
}
