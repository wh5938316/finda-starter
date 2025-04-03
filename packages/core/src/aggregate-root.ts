/* eslint-disable @typescript-eslint/no-unused-vars */
import { Type } from '@nestjs/common';

import { IEvent, IEventHandler } from './interfaces';

const INTERNAL_EVENTS = Symbol();
const IS_AUTO_COMMIT_ENABLED = Symbol();
const CHILDREN_ENTITIES = Symbol();

/**
 * 表示变更跟踪接口
 * @template T 实体数据类型
 */
export interface IChangeTracked<T extends Record<string, any>> {
  /** 是否为新创建的实体 */
  isNew: boolean;

  /** 将实体标记为已保存状态 */
  setSaved(): void;

  /** 标记某个字段发生了变化 */
  markChanged(field: keyof T | (keyof T)[]): void;

  /** 清除已记录的变化，通常在持久化后调用 */
  clearChanges(): void;

  /** 获取已发生变化的字段列表 */
  changedFields: (keyof T)[];

  /** 获取已发生变化的数据 */
  changedData: Partial<T>;

  /** 是否发生了变化 */
  isChanged: boolean;
}

/**
 * 实体基类，实现变更跟踪功能
 * @template T 实体数据类型
 */
export class Entity<T extends Record<string, any>> implements IChangeTracked<T> {
  private _isNew: boolean;
  protected _changedFields: (keyof T)[] = [];
  protected [CHILDREN_ENTITIES]: Entity<any>[] = [];

  constructor(isNew: boolean = true) {
    this._isNew = isNew;
  }

  /**
   * 更新实体数据并自动标记变更的字段
   * @param data 要更新的数据
   */
  protected update(data: Partial<T>) {
    if (Object.keys(data).length === 0) {
      return;
    }

    const changedFields: (keyof T)[] = [];

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof T];
      if (value === undefined) {
        return;
      }

      const currentVal = (this as any)[key];
      // 只有值真正变化时才记录变更
      if (currentVal !== value) {
        (this as any)[key] = value;
        changedFields.push(key as keyof T);
      }
    });

    if (changedFields.length > 0) {
      this.markChanged(changedFields);
    }
  }

  /**
   * 添加子实体到当前实体
   * @param entity 要添加的子实体
   */
  protected addChildEntity(entity: Entity<any>) {
    if (!this[CHILDREN_ENTITIES].includes(entity)) {
      this[CHILDREN_ENTITIES].push(entity);
    }
  }

  /**
   * 移除子实体
   * @param entity 要移除的子实体
   */
  protected removeChildEntity(entity: Entity<any>) {
    const index = this[CHILDREN_ENTITIES].indexOf(entity);
    if (index !== -1) {
      this[CHILDREN_ENTITIES].splice(index, 1);
    }
  }

  /**
   * 获取所有子实体
   */
  public getChildEntities(): Entity<any>[] {
    return [...this[CHILDREN_ENTITIES]];
  }

  /**
   * 递归获取所有子实体（包括子实体的子实体）
   */
  public getAllChildEntities(): Entity<any>[] {
    const result: Entity<any>[] = [];

    const collectChildren = (entities: Entity<any>[]) => {
      for (const entity of entities) {
        result.push(entity);
        collectChildren(entity.getChildEntities());
      }
    };

    collectChildren(this[CHILDREN_ENTITIES]);
    return result;
  }

  /**
   * 实体是否为新创建的
   */
  public get isNew(): boolean {
    return this._isNew;
  }

  /**
   * 将实体标记为已保存状态
   */
  public setSaved(): void {
    this._isNew = false;
    this.clearChanges();

    // 同时处理子实体
    for (const child of this[CHILDREN_ENTITIES]) {
      child.setSaved();
    }
  }

  /**
   * 标记字段已变更
   * @param fields 变更的字段
   */
  public markChanged(fields: keyof T | (keyof T)[]): void {
    if (Array.isArray(fields)) {
      for (const field of fields) {
        if (!this._changedFields.includes(field)) {
          this._changedFields.push(field);
        }
      }
    } else if (!this._changedFields.includes(fields)) {
      this._changedFields.push(fields);
    }
  }

  /**
   * 清除变更记录
   */
  public clearChanges(): void {
    this._changedFields = [];
  }

  /**
   * 获取变更的字段列表
   */
  public get changedFields(): (keyof T)[] {
    return [...this._changedFields];
  }

  /**
   * 获取变更的数据
   */
  public get changedData(): Partial<T> {
    return this._changedFields.reduce((acc, key) => {
      return {
        ...acc,
        [key]: (this as unknown as T)[key],
      };
    }, {} as Partial<T>);
  }

  /**
   * 是否有变更
   */
  public get isChanged(): boolean {
    // 检查自身是否有变更
    if (this._changedFields.length > 0) {
      return true;
    }

    // 检查子实体是否有变更
    for (const child of this[CHILDREN_ENTITIES]) {
      if (child.isNew || child.isChanged) {
        return true;
      }
    }

    return false;
  }
}

/**
 * 聚合根基类，继承Entity并添加事件处理功能
 * @template T 聚合根数据类型
 * @template EventBase 事件基类类型
 */
export abstract class AggregateRoot<
  T extends Record<string, any> = Record<string, any>,
  EventBase extends IEvent = IEvent,
> extends Entity<T> {
  public [IS_AUTO_COMMIT_ENABLED] = false;
  private readonly [INTERNAL_EVENTS]: EventBase[] = [];

  constructor(isNew: boolean = true) {
    super(isNew);
  }

  /**
   * 设置是否自动提交事件
   */
  set autoCommit(value: boolean) {
    this[IS_AUTO_COMMIT_ENABLED] = value;
  }

  /**
   * 获取是否自动提交事件
   */
  get autoCommit(): boolean {
    return this[IS_AUTO_COMMIT_ENABLED];
  }

  /**
   * 发布事件。必须与发布者上下文合并才能工作。
   * @param event 要发布的事件
   */
  publish<T extends EventBase = EventBase>(event: T) {}

  /**
   * 发布多个事件。必须与发布者上下文合并才能工作。
   * @param events 要发布的事件数组
   */
  publishAll<T extends EventBase = EventBase>(events: T[]) {}

  /**
   * 提交所有未提交的事件
   */
  commit() {
    this.publishAll(this[INTERNAL_EVENTS]);
    this[INTERNAL_EVENTS].length = 0;
  }

  /**
   * 取消所有事件
   */
  uncommit() {
    this[INTERNAL_EVENTS].length = 0;
  }

  /**
   * 返回所有未提交的事件
   */
  getUncommittedEvents(): EventBase[] {
    return [...this[INTERNAL_EVENTS]];
  }

  /**
   * 从历史事件加载
   * @param history 历史事件数组
   */
  loadFromHistory(history: EventBase[]) {
    history.forEach((event) => this.apply(event, { fromHistory: true }));
  }

  /**
   * 应用事件
   * 如果启用了自动提交，则事件将立即发布（注意：必须与发布者上下文合并才能工作）。
   * 否则，事件将存储在内部事件数组中，并在调用commit方法时发布。
   * 此外，还将调用相应的事件处理程序（如果存在）。
   * 例如，如果事件名为UserCreatedEvent，则将调用"onUserCreatedEvent"方法。
   *
   * @param event 要应用的事件
   * @param isFromHistory 事件是否来自历史记录
   */
  apply<T extends EventBase = EventBase>(event: T, isFromHistory?: boolean): void;

  /**
   * 应用事件
   * 如果启用了自动提交，则事件将立即发布（注意：必须与发布者上下文合并才能工作）。
   * 否则，事件将存储在内部事件数组中，并在调用commit方法时发布。
   * 此外，还将调用相应的事件处理程序（如果存在）。
   * 例如，如果事件名为UserCreatedEvent，则将调用"onUserCreatedEvent"方法。
   *
   * @param event 要应用的事件
   * @param options 选项
   */
  apply<T extends EventBase = EventBase>(
    event: T,
    options?: { fromHistory?: boolean; skipHandler?: boolean },
  ): void;

  apply<T extends EventBase = EventBase>(
    event: T,
    optionsOrIsFromHistory: boolean | { fromHistory?: boolean; skipHandler?: boolean } = {},
  ): void {
    const isFromHistory =
      (typeof optionsOrIsFromHistory === 'boolean'
        ? optionsOrIsFromHistory
        : optionsOrIsFromHistory.fromHistory) ?? false;
    const skipHandler =
      typeof optionsOrIsFromHistory === 'boolean' ? false : optionsOrIsFromHistory.skipHandler;

    if (!isFromHistory && !this.autoCommit) {
      this[INTERNAL_EVENTS].push(event);
    }
    this.autoCommit && this.publish(event);

    if (!skipHandler) {
      const handler = this.getEventHandler(event);
      handler && handler.call(this, event);
    }
  }

  /**
   * 获取事件处理程序
   * @param event 事件
   */
  protected getEventHandler<T extends EventBase = EventBase>(
    event: T,
  ): Type<IEventHandler> | undefined {
    const handler = `on${this.getEventName(event)}`;
    return this[handler as keyof this] as Type<IEventHandler> | undefined;
  }

  /**
   * 获取事件名称
   * @param event 事件
   */
  protected getEventName(event: any): string {
    const { constructor } = Object.getPrototypeOf(event);
    return constructor.name as string;
  }
}
