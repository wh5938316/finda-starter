import { UUID } from '@finda-co/core';

import { InvalidIdException } from '../errors/id-errors';

export class UserId extends UUID {
  public readonly type: string = 'UserId';

  public static generate() {
    return new UserId();
  }

  public static from(id: string) {
    return new UserId(id);
  }
}
