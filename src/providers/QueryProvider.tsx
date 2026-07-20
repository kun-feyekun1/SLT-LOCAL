// src/providers/QueryProvider.tsx
import React, { type ReactNode } from "react";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import { queryClient, queryPersister } from "@/services/api";

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: queryPersister,
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};