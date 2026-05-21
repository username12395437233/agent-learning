import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import { WatchlistProvider } from '@/features/watchlist/model/watchlist-context';
import { appQueryClient } from '@/shared/lib/query-client';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={appQueryClient}>
      <WatchlistProvider>{children}</WatchlistProvider>
    </QueryClientProvider>
  );
}
