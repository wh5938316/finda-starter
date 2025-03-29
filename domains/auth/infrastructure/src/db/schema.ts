import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  check,
  index,
  inet,
  pgSchema,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { identityProviderValues, userRoleValues } from '@finda-co/domain-auth-core';

import { lower } from './sql.helpers';

export const authSchema = pgSchema('auth');

export const userRole = authSchema.enum('user_role', userRoleValues);

export const identityProvider = authSchema.enum('identity_provider', identityProviderValues);

export const user = authSchema.table(
  'user',
  {
    id: uuid('id').primaryKey(),
    name: varchar('name'),
    email: varchar('email', { length: 320 }).unique().notNull(),
    emailVerified: boolean('email_verified').notNull().default(false),
    image: varchar('image'),
    isAnonymous: boolean('is_anonymous').notNull().default(false),
    role: userRole('role').notNull().default('user'),
    banned: boolean('banned').notNull().default(false),
    banReason: varchar('ban_reason'),
    banExpires: timestamp('ban_expires'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
  },
  (t) => [
    // If the user is not anonymous, then the email is required
    check('email_required_if_not_anonymous', sql`${t.isAnonymous} = true OR email IS NOT NULL`),
    uniqueIndex('email_unique_index').on(lower(t.email)),
  ],
);

export const userRelations = relations(user, ({ one, many }) => ({
  sessions: many(session, { relationName: 'owner' }),
  impersonations: many(session, { relationName: 'impersonator' }),
  identities: many(identity),
}));

export const session = authSchema.table(
  'session',
  {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    token: varchar('token'),
    ipAddress: inet('ip_address'),
    userAgent: varchar('user_agent'),
    impersonatedBy: uuid('impersonated_by').references(() => user.id, { onDelete: 'cascade' }),
    fingerprint: uuid('fingerprint'),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
  },
  (t) => [index('session_user_id_index').on(t.userId)],
);

export const sessionRelations = relations(session, ({ one, many }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
    relationName: 'owner',
  }),
  impersonatedBy: one(user, {
    fields: [session.impersonatedBy],
    references: [user.id],
    relationName: 'impersonator',
  }),
}));

export const identity = authSchema.table(
  'identity',
  {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    identityId: varchar('identity_id').notNull(),
    provider: identityProvider('provider'),
    accessToken: varchar('access_token'),
    refreshToken: varchar('refresh_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: varchar('scope').array(),
    idToken: varchar('id_token'),
    password: varchar('password'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
  },
  (t) => [index('identity_user_id_index').on(t.userId)],
);

export const identityRelations = relations(identity, ({ one, many }) => ({
  user: one(user, {
    fields: [identity.userId],
    references: [user.id],
  }),
}));

export const verification = authSchema.table('verification', {
  id: uuid('id').primaryKey(),
  identifier: varchar('identifier'),
  value: varchar('value'),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const jwks = authSchema.table('jwks', {
  id: uuid('id').primaryKey(),
  publicKey: varchar('public_key'),
  privateKey: varchar('private_key'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
