import { Inject, Injectable } from '@nestjs/common';
import { and, eq, ne, sql } from 'drizzle-orm';

import { type NodePgDrizzle } from '@finda-co/database';

@Injectable()
export class TestRepository {
  constructor(@Inject('App') private readonly drizzle: NodePgDrizzle) {}
}
