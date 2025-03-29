import { DomainError } from '../core/domain-error';

export class InvalidIdException extends DomainError {
  private constructor(message: string) {
    super(message);
  }

  public static becauseEmpty(): InvalidIdException {
    return new InvalidIdException('ID不能为空');
  }

  public static becauseInvalid(id: string): InvalidIdException {
    return new InvalidIdException(`提供的ID "${id}" 无效`);
  }

  public static becauseWrongFormat(id: string): InvalidIdException {
    return new InvalidIdException(`ID "${id}" 格式错误，必须是有效的UUID`);
  }
}
