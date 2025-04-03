import { Entity } from '../aggregate-root';

/**
 * 存储库接口
 * @template T 实体类型
 * @template ID ID类型
 */
export interface IRepository<T extends Entity<any>, ID = string> {
  /**
   * 查找所有实体
   */
  findAll(): Promise<T[]>;

  /**
   * 根据ID查找单个实体
   * @param id ID
   */
  findById(id: ID): Promise<T | null>;

  /**
   * 保存单个实体
   * 如果该实体是聚合根且包含子实体，将递归保存所有子实体
   * @param entity 要保存的实体
   */
  save(entity: T): Promise<T>;

  /**
   * 保存多个实体
   * @param entities 要保存的实体
   */
  saveMany(entities: T[]): Promise<T[]>;

  /**
   * 移除实体
   * @param entity 要移除的实体或ID
   */
  remove(entity: T | ID): Promise<void>;

  /**
   * 清除变更跟踪状态
   * 实体保存后自动调用此方法
   * @param entity 要清除状态的实体
   */
  clearEntityState(entity: T): void;
}
