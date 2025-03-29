import { Redis } from 'ioredis';

import { Session, SessionId, UserId } from '@finda-co/domain-auth-core';

export class RedisService {
  private readonly SESSION_PREFIX = 'auth:session:';
  private readonly SESSION_BY_TOKEN_PREFIX = 'auth:session:token:';
  private readonly SESSION_BY_FINGERPRINT_PREFIX = 'auth:session:fingerprint:';
  private readonly SESSION_TTL = 60 * 60 * 24 * 7; // 7天，秒为单位

  constructor(private readonly redis: Redis) {}

  /**
   * 将会话存储到Redis
   */
  async setSession(session: Session): Promise<void> {
    if (session.isExpired()) {
      return;
    }

    // 计算TTL（过期时间减去当前时间，转换为秒）
    const now = new Date().getTime();
    const expiresAt = session.expiresAt.getTime();
    const ttl = Math.floor((expiresAt - now) / 1000);

    if (ttl <= 0) {
      return;
    }

    // 会话数据
    const sessionData = {
      id: session.id.toString(),
      userId: session.userId.toString(),
      token: session.token,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
      impersonatedBy: session.impersonatedBy?.toString(),
      fingerprint: session.fingerprint?.toString(),
      expiresAt: session.expiresAt.toISOString(),
    };

    // 存储会话数据
    const sessionKey = this.getSessionKey(session.id);
    await this.redis.setex(sessionKey, ttl, JSON.stringify(sessionData));

    // 创建token索引
    if (session.token) {
      const tokenKey = this.getSessionByTokenKey(session.token);
      await this.redis.setex(tokenKey, ttl, session.id.toString());
    }

    // 创建指纹索引
    if (session.fingerprint) {
      const fingerprintKey = this.getSessionByFingerprintKey(session.fingerprint);
      await this.redis.setex(fingerprintKey, ttl, session.id.toString());
    }
  }

  /**
   * 从Redis获取会话
   */
  async getSession(sessionId: SessionId): Promise<any | null> {
    const sessionKey = this.getSessionKey(sessionId);
    const sessionData = await this.redis.get(sessionKey);

    if (!sessionData) {
      return null;
    }

    return JSON.parse(sessionData);
  }

  /**
   * 通过令牌获取会话ID，然后获取会话
   */
  async getSessionByToken(token: string): Promise<any | null> {
    const tokenKey = this.getSessionByTokenKey(token);
    const sessionId = await this.redis.get(tokenKey);

    if (!sessionId) {
      return null;
    }

    return this.getSession(SessionId.from(sessionId));
  }

  /**
   * 通过指纹获取会话ID，然后获取会话
   */
  async getSessionByFingerprint(fingerprint: string): Promise<any | null> {
    const fingerprintKey = this.getSessionByFingerprintKey(fingerprint);
    const sessionId = await this.redis.get(fingerprintKey);

    if (!sessionId) {
      return null;
    }

    return this.getSession(SessionId.from(sessionId));
  }

  /**
   * 通过会话ID获取用户ID
   */
  async getUserIdBySessionId(sessionId: SessionId): Promise<string | null> {
    const sessionData = await this.getSession(sessionId);
    return sessionData?.userId || null;
  }

  /**
   * 从Redis删除会话
   */
  async deleteSession(sessionId: SessionId): Promise<void> {
    // 获取会话数据
    const sessionData = await this.getSession(sessionId);
    if (!sessionData) {
      return;
    }

    // 删除令牌索引
    if (sessionData.token) {
      const tokenKey = this.getSessionByTokenKey(sessionData.token);
      await this.redis.del(tokenKey);
    }

    // 删除指纹索引
    if (sessionData.fingerprint) {
      const fingerprintKey = this.getSessionByFingerprintKey(sessionData.fingerprint);
      await this.redis.del(fingerprintKey);
    }

    // 删除会话数据
    const sessionKey = this.getSessionKey(sessionId);
    await this.redis.del(sessionKey);
  }

  /**
   * 删除用户的所有会话
   */
  async deleteUserSessions(userId: UserId, exceptSessionId?: SessionId): Promise<void> {
    // 查找用户的所有会话
    // 由于Redis不支持按值查询，这在实际项目中通常需要一些额外的设计
    // 一个简单的方法是在数据库中查询用户的所有会话ID，然后逐个从Redis中删除
    // 这里暂不实现
  }

  /**
   * 生成会话键
   */
  private getSessionKey(sessionId: SessionId): string {
    return `${this.SESSION_PREFIX}${sessionId.toString()}`;
  }

  /**
   * 生成令牌索引键
   */
  private getSessionByTokenKey(token: string): string {
    return `${this.SESSION_BY_TOKEN_PREFIX}${token}`;
  }

  /**
   * 生成指纹索引键
   */
  private getSessionByFingerprintKey(fingerprint: string): string {
    return `${this.SESSION_BY_FINGERPRINT_PREFIX}${fingerprint}`;
  }
}
