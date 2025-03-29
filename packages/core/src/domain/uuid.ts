import { v7 as uuid, validate } from 'uuid';

import { InvalidIdException } from './exceptions/id-errors';
import { Id } from './id';

export class UUID extends Id {
  public readonly type: string = 'UUID';

  protected constructor(id = uuid()) {
    if (!validate(id)) {
      throw InvalidIdException.becauseWrongFormat(id);
    }
    super(id);
  }

  public static generate(): UUID {
    return new UUID();
  }

  public static from(id: string): UUID {
    return new UUID(id);
  }

  get time(): number {
    const parts = this.value.split('-');
    const highBitsHex = parts[0] + parts[1].slice(0, 4);
    const timestampInMilliseconds = parseInt(highBitsHex, 16);

    return timestampInMilliseconds;
  }

  get date(): Date {
    const date = new Date(this.time);

    return date;
  }

  get yearMonth(): string {
    return this.date.toISOString().substring(0, 7);
  }

  get value(): string {
    return this.props.value;
  }
}
