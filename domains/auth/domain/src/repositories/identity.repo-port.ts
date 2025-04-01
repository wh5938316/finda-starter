import { Identity } from '../aggregates/identity.entity';
import { IdentityId } from '../value-objects/identity-id';
import { UserId } from '../value-objects/user-id';

/**
 * 身份仓库接口
 * 定义与Identity实体交互的所有方法
 */
export interface IIdentityRepository {
  /**
   * 保存身份
   * @param identity 身份实体
   */
  save(identity: Identity): Promise<void>;

  /**
   * 通过ID查找身份
   * @param id 身份ID
   */
  findById(id: IdentityId): Promise<Identity | null>;

  /**
   * 查找用户的所有身份
   * @param userId 用户ID
   */
  findByUserId(userId: UserId): Promise<Identity[]>;

  /**
   * 通过提供商信息查找身份
   * @param providerId 提供商ID
   * @param providerUserId 提供商用户ID
   */
  findByProvider(providerId: string, providerUserId: string): Promise<Identity | null>;

  /**
   * 通过用户ID和提供商ID查找身份
   * @param userId 用户ID
   * @param providerId 提供商ID
   */
  findByUserIdAndProvider(userId: UserId, providerId: string): Promise<Identity | null>;

  /**
   * 删除身份
   * @param identity 身份实体
   */
  delete(identity: Identity): Promise<void>;

  /**
   * 根据ID删除身份
   * @param id 身份ID
   */
  deleteById(id: IdentityId): Promise<void>;

  /**
   * 删除用户的所有身份
   * @param userId 用户ID
   */
  deleteAllByUserId(userId: UserId): Promise<number>;

  /**
   * 获取用户身份统计信息
   * @param userId 用户ID
   */
  getUserIdentityStats(userId: UserId): Promise<{
    totalIdentities: number;
    identityProviders: string[];
  }>;

  /**
   * 判断身份提供商是否已存在
   * @param providerId 提供商ID
   * @param providerUserId 提供商用户ID
   * @param excludeUserId 需要排除的用户ID
   */
  providerIdentityExists(
    providerId: string,
    providerUserId: string,
    excludeUserId?: UserId,
  ): Promise<boolean>;
}
