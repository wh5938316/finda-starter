import { AggregateRoot, Entity } from '../aggregate-root';
import { IRepository } from './repository.interface';

/**
 * 抽象存储库基类
 * 提供聚合根及其子实体的基础存储和检索功能
 *
 * @template T 实体类型
 * @template ID ID类型
 */
export abstract class AbstractRepository<T extends Entity<any>, ID = string>
  implements IRepository<T, ID>
{
  /**
   * 抽象方法：查找所有实体
   * 具体存储实现需要重写此方法
   */
  abstract findAll(): Promise<T[]>;

  /**
   * 抽象方法：根据ID查找单个实体
   * 具体存储实现需要重写此方法
   *
   * @param id 实体ID
   */
  abstract findById(id: ID): Promise<T | null>;

  /**
   * 抽象方法：执行实体创建操作
   * 具体存储实现需要重写此方法
   *
   * @param entity 要创建的实体
   */
  protected abstract doCreate(entity: T): Promise<T>;

  /**
   * 抽象方法：执行实体更新操作
   * 具体存储实现需要重写此方法
   *
   * @param entity 要更新的实体
   * @param changedData 变更的数据
   */
  protected abstract doUpdate(entity: T, changedData: Partial<any>): Promise<T>;

  /**
   * 抽象方法：执行实体删除操作
   * 具体存储实现需要重写此方法
   *
   * @param entityOrId 要删除的实体或ID
   */
  protected abstract doRemove(entityOrId: T | ID): Promise<void>;

  /**
   * 保存单个实体
   * 自动处理新建和更新场景，并递归保存子实体
   *
   * @param entity 要保存的实体
   */
  async save(entity: T): Promise<T> {
    // 首先保存子实体
    await this.saveChildEntities(entity);

    // 然后保存主体实体
    if (entity.isNew) {
      const result = await this.doCreate(entity);
      this.clearEntityState(result);
      return result;
    } else if (entity.isChanged) {
      const result = await this.doUpdate(entity, entity.changedData);
      this.clearEntityState(result);
      return result;
    }

    return entity;
  }

  /**
   * 保存多个实体
   *
   * @param entities 要保存的实体
   */
  async saveMany(entities: T[]): Promise<T[]> {
    const results: T[] = [];

    for (const entity of entities) {
      results.push(await this.save(entity));
    }

    return results;
  }

  /**
   * 移除实体
   *
   * @param entityOrId 要移除的实体或ID
   */
  async remove(entityOrId: T | ID): Promise<void> {
    await this.doRemove(entityOrId);
  }

  /**
   * 递归保存子实体
   *
   * @param entity 包含子实体的父实体
   */
  protected async saveChildEntities(entity: T): Promise<void> {
    const childEntities = entity.getAllChildEntities();

    // 优先保存新创建的实体
    const newEntities = childEntities.filter((child) => child.isNew);
    for (const child of newEntities) {
      if (child instanceof AggregateRoot) {
        // 如果子实体是聚合根，则递归保存
        await this.handleChildAggregateRoot(child);
      } else {
        // 否则直接保存子实体
        await this.handleChildEntity(child);
      }
    }

    // 然后保存已变更的实体
    const changedEntities = childEntities.filter((child) => !child.isNew && child.isChanged);
    for (const child of changedEntities) {
      if (child instanceof AggregateRoot) {
        // 如果子实体是聚合根，则递归保存
        await this.handleChildAggregateRoot(child);
      } else {
        // 否则直接保存子实体
        await this.handleChildEntity(child);
      }
    }
  }

  /**
   * 处理子聚合根的保存
   * 子类可覆盖此方法以提供更具体的实现
   *
   * @param aggregateRoot 子聚合根
   */
  protected async handleChildAggregateRoot(aggregateRoot: AggregateRoot<any>): Promise<void> {
    // 默认实现是不做任何处理
    // 具体实现可能需要创建相应的仓库来处理不同类型的聚合根
    console.warn(
      'Child aggregate root handling not implemented. Override this method in your repository implementation.',
    );
  }

  /**
   * 处理子实体的保存
   * 子类可覆盖此方法以提供更具体的实现
   *
   * @param entity 子实体
   */
  protected async handleChildEntity(entity: Entity<any>): Promise<void> {
    // 默认实现是不做任何处理
    // 具体实现可能需要创建相应的仓库来处理不同类型的实体
    console.warn(
      'Child entity handling not implemented. Override this method in your repository implementation.',
    );
  }

  /**
   * 清除实体的变更跟踪状态
   *
   * @param entity 要清除状态的实体
   */
  clearEntityState(entity: T): void {
    entity.setSaved();
  }
}
