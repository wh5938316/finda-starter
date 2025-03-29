/**
 * 领域事件基类
 * 所有领域事件都应继承此类
 */
export abstract class DomainEvent {
  /**
   * 事件发生时间
   */
  public readonly occurredOn: Date;

  /**
   * 构造函数
   */
  constructor() {
    this.occurredOn = new Date();
  }
}
