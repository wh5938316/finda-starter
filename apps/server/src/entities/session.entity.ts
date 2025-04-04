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

import { UserEntity } from './user.entity';

@Entity({ name: 'session', schema: 'auth' })
export class SessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  @Index('session_user_id_index')
  userId: string;

  @Column({ nullable: true })
  token: string;

  @Column({ name: 'ip_address', nullable: true, type: 'inet' })
  ipAddress: string | null;

  @Column({ name: 'user_agent', nullable: true })
  userAgent: string | null;

  @Column({ name: 'impersonated_by', nullable: true })
  impersonatedBy: string | null;

  @Column({ nullable: true })
  fingerprint: string | null;

  @Column({ name: 'expires_at' })
  expiresAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  // 关系
  @ManyToOne(() => UserEntity, (user) => user.sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.impersonations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'impersonated_by' })
  impersonator: UserEntity;

  // 静态工厂方法
  public static create(
    id: string,
    userId: string,
    token: string,
    ipAddress: string,
    userAgent: string,
    impersonatedBy?: string,
    expiresAtMinutes: number = 60 * 24 * 7, // 默认7天
  ): SessionEntity {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + expiresAtMinutes * 60 * 1000);
    const sessionToken = token || this.generateToken();

    const session = new SessionEntity();
    session.id = id;
    session.userId = userId;
    session.token = sessionToken;
    session.ipAddress = ipAddress;
    session.userAgent = userAgent;
    session.impersonatedBy = impersonatedBy ?? null;
    session.expiresAt = expiresAt;
    session.createdAt = now;
    session.updatedAt = now;

    return session;
  }

  // 生成随机令牌
  private static generateToken(): string {
    return (
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
  }

  // 业务方法
  public isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  public isImpersonated(): boolean {
    return !!this.impersonatedBy;
  }

  /**
   * 生成JWT令牌
   * @param secret JWT密钥
   * @param additionalData 要添加到JWT载荷的额外数据
   * @returns JWT令牌
   */
  public generateJwt(secret: string, additionalData: Record<string, any> = {}): string {
    if (this.isExpired()) {
      throw new Error('会话已过期');
    }

    // 计算过期时间（秒）
    const now = Math.floor(Date.now() / 1000);
    const exp = Math.floor(this.expiresAt.getTime() / 1000);
    const expiresIn = exp - now;

    // 此处需要真实的 JWT 签名逻辑
    const payload = {
      sub: this.userId,
      sid: this.id,
      exp: exp,
      iat: now,
      ...additionalData,
    };

    // 简化版JWT实现，实际应用中应使用库如jsonwebtoken
    return `${Buffer.from(JSON.stringify(payload)).toString('base64')}.${Buffer.from(secret).toString('base64')}`;
  }

  public terminate(): void {
    if (this.isExpired()) {
      return; // 已过期，无需终止
    }

    const now = new Date();
    this.expiresAt = now;
    this.updatedAt = now;
  }

  public extend(minutes: number): void {
    if (this.isExpired()) {
      throw new Error('会话已过期');
    }

    const now = new Date();
    const newExpiresAt = new Date(now.getTime() + minutes * 60 * 1000);

    this.expiresAt = newExpiresAt;
    this.updatedAt = now;
  }
}
