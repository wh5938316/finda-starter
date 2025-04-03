import {
  PasswordTooLongError,
  PasswordTooShortError,
  PasswordTooWeakError,
} from '../errors/user-errors';
import { hashPassword, verifyPassword } from '../utils/password';

export class Password {
  private readonly _value: string;

  // 密码策略配置
  private static readonly MIN_LENGTH = 8;
  private static readonly MAX_LENGTH = 100;
  private static readonly STRONG_PASSWORD_PATTERN =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

  private constructor(hashedValue: string) {
    this._value = hashedValue;
  }

  public get value(): string {
    return this._value;
  }

  /**
   * 创建一个明文密码对象
   * @param password 明文密码
   * @param validateStrength 是否验证密码强度
   * @returns Password对象
   */
  public static async create(
    password: string,
    validateStrength: boolean = true,
  ): Promise<Password> {
    Password.validate(password, validateStrength);
    const hashedValue = await hashPassword(password);
    return new Password(hashedValue);
  }

  /**
   * 从哈希值创建密码对象
   * @param hashedPassword 哈希后的密码
   * @returns Password对象
   */
  public static from(hashedPassword: string): Password {
    return new Password(hashedPassword);
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
   * 验证密码是否匹配
   * @param plainTextPassword 明文密码
   * @returns 是否匹配
   */
  public async verify(plainTextPassword: string): Promise<boolean> {
    return await verifyPassword({
      hash: await this._value,
      password: plainTextPassword,
    });
  }
}
