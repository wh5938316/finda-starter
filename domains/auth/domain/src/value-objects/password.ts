import { DomainError } from '../core/domain-error';
import {
  PasswordTooLongError,
  PasswordTooShortError,
  PasswordTooWeakError,
} from '../errors/user-errors';
import { hashPassword, verifyPassword } from '../utils/password';

export class Password {
  private readonly _value: string;
  private readonly _hashedValue?: string;

  // 密码策略配置
  private static readonly MIN_LENGTH = 8;
  private static readonly MAX_LENGTH = 100;
  private static readonly STRONG_PASSWORD_PATTERN =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

  private constructor(value: string, hashedValue?: string) {
    this._value = value;
    this._hashedValue = hashedValue;
  }

  /**
   * 创建一个明文密码对象
   * @param password 明文密码
   * @param validateStrength 是否验证密码强度
   * @returns Password对象
   */
  public static create(password: string, validateStrength: boolean = true): Password {
    Password.validate(password, validateStrength);
    return new Password(password);
  }

  /**
   * 从哈希值创建密码对象
   * @param hashedPassword 哈希后的密码
   * @returns Password对象
   */
  public static fromHashed(hashedPassword: string): Password {
    return new Password('', hashedPassword);
  }

  /**
   * 验证密码是否符合安全策略
   * @param password 密码
   * @param validateStrength 是否验证密码强度
   */
  private static validate(password: string, validateStrength: boolean): void {
    if (password.length < Password.MIN_LENGTH) {
      throw new PasswordTooShortError(Password.MIN_LENGTH);
    }

    if (password.length > Password.MAX_LENGTH) {
      throw new PasswordTooLongError(Password.MAX_LENGTH);
    }

    if (validateStrength && !Password.STRONG_PASSWORD_PATTERN.test(password)) {
      throw new PasswordTooWeakError();
    }
  }

  /**
   * 获取密码的哈希值
   * @returns 哈希后的密码
   */
  public async getHashedValue(): Promise<string> {
    if (this._hashedValue) {
      return this._hashedValue;
    }

    if (!this._value) {
      throw new Error('无法哈希空密码');
    }

    return await hashPassword(this._value);
  }

  /**
   * 验证密码是否匹配
   * @param plainTextPassword 明文密码
   * @returns 是否匹配
   */
  public async verify(plainTextPassword: string): Promise<boolean> {
    if (!this._hashedValue) {
      throw new Error('无法验证未哈希的密码');
    }

    return await verifyPassword({
      hash: this._hashedValue,
      password: plainTextPassword,
    });
  }
}
