"use client";
import { Module } from "@/modules/module";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LunchModule from "@/modules/lunch/lunch-module";

const LunchModuleLayout: Module = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <LunchModule />
        </QueryClientProvider>
    );
};

export default LunchModuleLayout;
