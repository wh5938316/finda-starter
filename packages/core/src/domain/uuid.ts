import { v7 as uuid, validate as uuidValidate } from 'uuid';

import { InvalidIdException } from './exceptions/id-errors';

/**
 * UUID基类
 * 用于表示基于UUID的标识符
 */
export abstract class UUID {
  private readonly _id: string;

  protected constructor(id?: string) {
    if (!id) {
      this._id = uuid();
      return;
    }

    if (!uuidValidate(id)) {
      throw InvalidIdException.becauseWrongFormat(id);
    }

    this._id = id;
  }

  /**
   * 获取UUID值
   */
  public get value(): string {
    return this._id;
  }

  /**
   * 将UUID转换为字符串
   * @returns UUID字符串
   */
  public toString(): string {
    return this._id;
  }

  /**
   * 比较两个UUID是否相等
   * @param other 要比较的UUID或字符串
   * @returns 是否相等
   */
  public equals(other: UUID | string): boolean {
    if (other instanceof UUID) {
      return this._id === other.value;
    }

    return this._id === other;
  }
}
