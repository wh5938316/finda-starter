import { type NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from './schema';

export type NodePgDrizzle = NodePgDatabase<typeof schema>;
