import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

export const db = drizzle({
  schema,
  casing: "snake_case",
  connection: {
    connectionString: process.env.DATABASE_URL!,
  },
});
