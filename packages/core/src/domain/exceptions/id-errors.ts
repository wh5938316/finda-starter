import { DomainError } from '../domain-error';

/**
 * ID相关异常
 */
export class InvalidIdException extends DomainError {
  private constructor(message: string) {
    super(message);
  }

  /**
   * 当ID为空时创建异常
   */
  public static becauseEmpty(): InvalidIdException {
    return new InvalidIdException('ID不能为空');
  }

  /**
   * 当ID无效时创建异常
   * @param id 无效的ID
   */
  public static becauseInvalid(id: string): InvalidIdException {
    return new InvalidIdException(`提供的ID "${id}" 无效`);
  }

  /**
   * 当ID格式错误时创建异常
   * @param id 格式错误的ID
   */
  public static becauseWrongFormat(id: string): InvalidIdException {
    return new InvalidIdException(`ID "${id}" 格式错误，必须是有效的UUID`);
  }
}
