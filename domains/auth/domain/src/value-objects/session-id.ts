import { UUID } from '@finda-co/core';

export class SessionId extends UUID {
  public readonly type: string = 'SessionId';

  public static generate() {
    return new SessionId();
  }

  public static from(id: string) {
    return new SessionId(id);
  }
}
