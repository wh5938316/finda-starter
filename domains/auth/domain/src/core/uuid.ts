import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';

import { InvalidIdException } from '../errors/id-errors';

export abstract class UUID {
  private readonly _id: string;

  protected constructor(id?: string) {
    if (!id) {
      this._id = uuidv4();
      return;
    }

    if (!uuidValidate(id)) {
      throw InvalidIdException.becauseWrongFormat(id);
    }

    this._id = id;
  }

  public get value(): string {
    return this._id;
  }

  public toString(): string {
    return this._id;
  }

  public equals(other: UUID | string): boolean {
    if (other instanceof UUID) {
      return this._id === other.value;
    }

    return this._id === other;
  }
}
