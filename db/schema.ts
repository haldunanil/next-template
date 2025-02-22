import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const flowsTable = pgTable("flows", {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  name: varchar({ length: 255 }).notNull(),
});
