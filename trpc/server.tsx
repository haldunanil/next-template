import "server-only"; // <-- ensure this file cannot be imported from the client

import { cache } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  createTRPCOptionsProxy,
  ResolverDef,
  TRPCQueryOptions,
} from "@trpc/tanstack-react-query";

import { createTRPCContext } from "./context";
import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers";

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

// For fetching data in the server component
export const caller = appRouter.createCaller(createTRPCContext);

/**
 * For hydrating data after a server component has been rendered with
 * a pre-fetched or fetched query
 *
 * @param props - The children to hydrate
 * @returns The hydrated children
 */
export const HydrateClient = (props: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
};

/**
 * Prefetch a query
 *
 * @param queryOptions - The query options to prefetch
 */
export const prefetch = <
  TDef extends ResolverDef,
  T extends ReturnType<TRPCQueryOptions<TDef>>
>(
  queryOptions: T
) => {
  const queryClient = getQueryClient();
  if (queryOptions.queryKey[1]?.type === "infinite") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    void queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    void queryClient.prefetchQuery(queryOptions);
  }
};
