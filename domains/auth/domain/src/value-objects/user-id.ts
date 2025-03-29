import { UUID } from '../core/uuid';
import { InvalidIdException } from '../errors/id-errors';

export class UserId extends UUID {
  public readonly type: string = 'UserId';

  constructor(id?: string) {
    super(id);
  }

  public static generate(): UserId {
    return new UserId();
  }

  public static from(id: string): UserId {
    if (!id) {
      throw InvalidIdException.becauseEmpty();
    }
    return new UserId(id);
  }
}
