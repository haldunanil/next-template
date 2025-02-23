import { cache } from "react";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getAuth } from "@clerk/nextjs/server";

export const createTRPCContext = cache(
  async (opts: CreateNextContextOptions) => {
    return { auth: getAuth(opts.req) };
  }
);

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
