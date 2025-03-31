import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as authSchema from '@finda-co/domain-auth-infra/schema';

const schema = {
  ...authSchema,
};

export type NodePgDrizzle = NodePgDatabase<typeof schema>;

export { schema };
