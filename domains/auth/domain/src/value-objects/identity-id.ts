import { UUID } from '@finda-co/core';

/**
 * 身份ID值对象
 */
export class IdentityId extends UUID {
  public readonly type: string = 'IdentityId';

  public static generate() {
    return new IdentityId();
  }

  public static from(id: string) {
    return new IdentityId(id);
  }
}
