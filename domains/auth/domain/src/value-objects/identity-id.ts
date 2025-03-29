import { Id } from '../core/id';
import { InvalidIdException } from '../errors/id-errors';

/**
 * 身份ID值对象
 */
export class IdentityId extends Id {
  public readonly type: string = 'IdentityId';

  constructor(id: string) {
    super(id);
  }

  public static create(): IdentityId {
    return new IdentityId(Id.generateUUID());
  }

  public static from(id: string): IdentityId {
    if (!id) {
      throw InvalidIdException.becauseEmpty();
    }
    return new IdentityId(id);
  }
}
