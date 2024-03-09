import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
  json,
  boolean,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `modlands_${name}`);

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).unique().notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp("createdAt", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  image: varchar("image", { length: 255 }),
  password: varchar("password", { length: 255 })
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  mods: many(mods),
}));

export const mods = createTable("mod", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  summary: text("summary").notNull(),
  icon: varchar("image", { length: 255 }),
  description: json("description"),
  draft: boolean("draft").default(true).notNull(),
  approved: boolean("approved").default(false).notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  downloads: integer("downloads").default(0).notNull(),
  ownerId: varchar("ownerId", { length: 255 }),
});

export const modRelations = relations(mods, ({ one }) => ({
  owner: one(users, {
    fields: [mods.ownerId],
    references: [users.id],
  }),
  modExternalResources: one(modExternalResources)
}));

export const modExternalResources = createTable("modExternalResources", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  issues: varchar("issues", { length: 255 }),
  source: varchar("source", { length: 255 }),
  wiki: varchar("wiki", { length: 255 }),
  discord: varchar("disord", { length: 255 }),
  modId: varchar("modId", { length: 255}).notNull().unique()
});

export const modExternalResourcesRelations = relations(modExternalResources, ({ one }) => ({
  mod: one(mods, {
    fields: [modExternalResources.modId],
    references: [mods.id]
  })
}));