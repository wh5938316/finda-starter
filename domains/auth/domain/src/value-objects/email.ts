import { DomainError } from '@finda-co/core';

import { isEmail } from '@/utils';

export class InvalidEmailError extends DomainError {
  constructor(email: string) {
    super(`无效的电子邮箱格式: ${email}`);
  }
}

export class Email {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value.toLowerCase();
  }

  /**
   * 创建一个Email值对象
   * @param email 邮箱地址
   * @returns Email对象
   * @throws InvalidEmailError 如果邮箱格式无效
   */
  public static from(email: string): Email {
    if (!email) {
      throw new InvalidEmailError(email);
    }

    const trimmedEmail = email.trim().toLocaleLowerCase();
    if (!Email.isValid(trimmedEmail)) {
      throw new InvalidEmailError(trimmedEmail);
    }

    return new Email(trimmedEmail);
  }

  /**
   * 验证邮箱格式是否有效
   * @param email 邮箱地址
   * @returns 是否有效
   */
  public static isValid(email: string): boolean {
    return isEmail(email);
  }

  /**
   * 获取标准化后的邮箱地址
   */
  public get value(): string {
    return this._value;
  }

  /**
   * 将Email对象转换为字符串
   * @returns 邮箱地址
   */
  public toString(): string {
    return this._value;
  }

  /**
   * 比较两个Email对象是否相等
   * @param other 要比较的Email对象或邮箱地址
   * @returns 是否相等
   */
  public equals(other: Email | string): boolean {
    if (other instanceof Email) {
      return this._value === other.value;
    }
    return this._value === other.toLowerCase();
  }
}
