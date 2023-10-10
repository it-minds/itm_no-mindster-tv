import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
export const getQueryClientWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                cacheTime: Infinity,
            },
        },
        logger: {
            log: console.log,
            warn: console.warn,
            error: () => {},
        },
    });

    const queryClientWrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );

    return queryClientWrapper;
};
