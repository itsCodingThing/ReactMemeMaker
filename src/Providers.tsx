"use client";

import { type ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

export function QueryProvider(props: { children: ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 5 * 1000,
                    },
                },
            }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryStreamedHydration>{props.children}</ReactQueryStreamedHydration>
            {<ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
    );
}