import { randomUUID } from 'crypto';

import { DomainError } from './domain-error';

/**
 * ID相关的错误
 */
export class InvalidIdError extends DomainError {
  constructor(id: string) {
    super(`无效的ID：${id}`);
  }
}

/**
 * ID值对象基类
 * 用于表示实体的标识符
 */
export abstract class Id {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  /**
   * 生成UUID
   * @returns UUID字符串
   */
  public static generateUUID(): string {
    return randomUUID();
  }

  /**
   * 获取ID值
   */
  public get value(): string {
    return this._value;
  }

  /**
   * 将ID转换为字符串
   * @returns ID字符串
   */
  public toString(): string {
    return this._value;
  }

  /**
   * 比较两个ID是否相等
   * @param other 要比较的ID或字符串
   * @returns 是否相等
   */
  public equals(other: Id | string): boolean {
    if (other instanceof Id) {
      return this._value === other.value;
    }
    return this._value === other;
  }
}
