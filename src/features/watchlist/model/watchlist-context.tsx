import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { readLocalStorage, writeLocalStorage } from '@/shared/lib/local-storage';

const WATCHLIST_STORAGE_KEY = 'crypto-market-radar/watchlist';

interface WatchlistContextValue {
  watchlist: string[];
  count: number;
  isInWatchlist: (coinId: string) => boolean;
  toggleWatchlist: (coinId: string) => void;
  clearWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

function readWatchlist() {
  return readLocalStorage<string[]>(WATCHLIST_STORAGE_KEY, []);
}

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<string[]>(readWatchlist);

  useEffect(() => {
    writeLocalStorage(WATCHLIST_STORAGE_KEY, watchlist);
  }, [watchlist]);

  const value = useMemo<WatchlistContextValue>(
    () => ({
      watchlist,
      count: watchlist.length,
      isInWatchlist: (coinId) => watchlist.includes(coinId),
      toggleWatchlist: (coinId) => {
        setWatchlist((currentWatchlist) =>
          currentWatchlist.includes(coinId)
            ? currentWatchlist.filter((currentCoinId) => currentCoinId !== coinId)
            : [...currentWatchlist, coinId],
        );
      },
      clearWatchlist: () => {
        setWatchlist([]);
      },
    }),
    [watchlist],
  );

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error('useWatchlist must be used inside WatchlistProvider');
  }

  return context;
}
