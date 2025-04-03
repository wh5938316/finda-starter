import { Session } from '../aggregates/session.entity';
import { SessionId } from '../value-objects/session-id';
import { UserId } from '../value-objects/user-id';

/**
 * 会话仓库接口
 * 定义与Session聚合根交互的所有方法
 */
export interface ISessionRepository {
  /**
   * 保存会话
   * @param session 会话聚合根
   */
  save(session: Session): Promise<void>;

  /**
   * 通过ID查找会话
   * @param id 会话ID
   */
  findById(id: SessionId): Promise<Session | null>;

  /**
   * 通过令牌查找会话
   * @param token 会话令牌
   */
  findByToken(token: string): Promise<Session | null>;

  /**
   * 查找用户的所有会话
   * @param userId 用户ID
   * @param includeExpired 是否包含已过期的会话
   */
  findByUserId(userId: UserId, includeExpired?: boolean): Promise<Session[]>;

  /**
   * 删除会话
   * @param session 会话实体
   */
  delete(session: Session): Promise<void>;

  /**
   * 根据ID删除会话
   * @param id 会话ID
   */
  deleteById(id: SessionId): Promise<void>;

  /**
   * 删除用户的所有会话
   * @param userId 用户ID
   * @param exceptSessionId 需要排除的会话ID
   */
  deleteAllByUserId(userId: UserId, exceptSessionId?: SessionId): Promise<number>;

  /**
   * 删除所有过期会话
   * @param olderThan 可选，删除早于指定日期的会话
   */
  deleteExpired(olderThan?: Date): Promise<number>;

  /**
   * 清理未使用的会话
   * @param idleTimeMinutes 闲置时间(分钟)
   */
  cleanupIdleSessions(idleTimeMinutes: number): Promise<number>;

  /**
   * 查询会话统计信息
   */
  getSessionStats(): Promise<{
    totalActive: number;
    totalExpired: number;
    averageSessionDurationMinutes: number;
  }>;
}
