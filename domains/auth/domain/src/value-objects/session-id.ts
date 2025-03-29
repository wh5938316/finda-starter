import { UUID } from '../core/uuid';
import { InvalidIdException } from '../errors/id-errors';

export class SessionId extends UUID {
  public readonly type: string = 'SessionId';

  constructor(id?: string) {
    super(id);
  }

  public static generate(): SessionId {
    return new SessionId();
  }

  public static from(id: string): SessionId {
    if (!id) {
      throw InvalidIdException.becauseEmpty();
    }
    return new SessionId(id);
  }
}
