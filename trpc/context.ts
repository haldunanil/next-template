import { cache } from "react";
import { auth } from "@clerk/nextjs/server";

export const createTRPCContext = cache(async () => {
  return { auth: await auth() };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
