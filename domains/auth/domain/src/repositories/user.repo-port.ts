import { User } from '../aggregates/user.aggregate';
import { Email } from '../value-objects/email';
import { IdentityId } from '../value-objects/identity-id';
import { SessionId } from '../value-objects/session-id';
import { UserId } from '../value-objects/user-id';

/**
 * 用户仓库接口
 * 定义与User聚合根交互的所有方法
 */
export interface IUserRepository {
  /**
   * 保存用户
   * @param user 用户聚合根
   */
  save(user: User): Promise<void>;

  /**
   * 通过ID查找用户
   * @param id 用户ID
   */
  findById(id: UserId): Promise<User | null>;

  /**
   * 通过邮箱查找用户
   * @param email 邮箱
   */
  findByEmail(email: string | Email): Promise<User | null>;

  /**
   * 通过会话ID查找用户
   * @param sessionId 会话ID
   */
  findBySessionId(sessionId: SessionId): Promise<User | null>;

  /**
   * 通过身份ID查找用户
   * @param identityId 身份ID
   */
  findByIdentityId(identityId: IdentityId): Promise<User | null>;

  /**
   * 通过第三方身份信息查找用户
   * @param providerId 提供商ID
   * @param providerUserId 提供商用户ID
   */
  findByProviderIdentity(providerId: string, providerUserId: string): Promise<User | null>;

  /**
   * 加载用户的所有身份
   * @param user 用户实体
   */
  loadIdentities(user: User): Promise<User>;

  /**
   * 加载用户的所有会话
   * @param user 用户实体
   */
  loadSessions(user: User): Promise<User>;

  /**
   * 判断邮箱是否已存在
   * @param email 邮箱
   * @param excludeUserId 需要排除的用户ID
   */
  emailExists(email: string | Email, excludeUserId?: UserId): Promise<boolean>;

  /**
   * 查找匹配条件的用户并分页
   * @param filter 过滤条件
   * @param page 页码
   * @param pageSize 每页数量
   */
  findAll(
    filter?: {
      isActive?: boolean;
      isEmailVerified?: boolean;
      role?: string;
      search?: string;
    },
    page?: number,
    pageSize?: number,
  ): Promise<{
    users: User[];
    total: number;
    page: number;
    pageSize: number;
  }>;

  /**
   * 获取用户总数
   * @param filter 过滤条件
   */
  count(filter?: { isActive?: boolean; isEmailVerified?: boolean; role?: string }): Promise<number>;
}
