import { useDeferredValue, useMemo, useState } from 'react';

import type { Coin } from '@/entities/coin/model/types';
import type {
  ChangeDirectionFilter,
  CoinTableFilters,
  MarketCapRangeFilter,
  PriceRangeFilter,
} from '@/features/coin-filters/model/types';

const defaultFilters: CoinTableFilters = {
  search: '',
  changeDirection: 'all',
  marketCapRange: 'all',
  priceRange: 'all',
  watchlistOnly: false,
};

function matchesMarketCapRange(coin: Coin, marketCapRange: MarketCapRangeFilter) {
  switch (marketCapRange) {
    case 'large':
      return coin.marketCap >= 10_000_000_000;
    case 'mid':
      return coin.marketCap >= 1_000_000_000 && coin.marketCap < 10_000_000_000;
    case 'low':
      return coin.marketCap < 1_000_000_000;
    case 'all':
    default:
      return true;
  }
}

function matchesPriceRange(coin: Coin, priceRange: PriceRangeFilter) {
  switch (priceRange) {
    case 'under-1':
      return coin.price < 1;
    case '1-to-100':
      return coin.price >= 1 && coin.price <= 100;
    case 'over-100':
      return coin.price > 100;
    case 'all':
    default:
      return true;
  }
}

function matchesChangeDirection(coin: Coin, changeDirection: ChangeDirectionFilter) {
  switch (changeDirection) {
    case 'positive':
      return coin.change24h > 0;
    case 'negative':
      return coin.change24h < 0;
    case 'all':
    default:
      return true;
  }
}

export function useCoinTableFilters(coins: Coin[], watchlistCoinIds: string[]) {
  const [filters, setFilters] = useState<CoinTableFilters>(defaultFilters);
  const deferredSearch = useDeferredValue(filters.search);

  const filteredCoins = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    return coins.filter((coin) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        coin.name.toLowerCase().includes(normalizedSearch) ||
        coin.symbol.toLowerCase().includes(normalizedSearch);

      const matchesWatchlist = !filters.watchlistOnly || watchlistCoinIds.includes(coin.id);

      return (
        matchesSearch &&
        matchesWatchlist &&
        matchesChangeDirection(coin, filters.changeDirection) &&
        matchesMarketCapRange(coin, filters.marketCapRange) &&
        matchesPriceRange(coin, filters.priceRange)
      );
    });
  }, [coins, deferredSearch, filters, watchlistCoinIds]);

  const activeFilters = useMemo(() => {
    const values: string[] = [];

    if (filters.search.trim().length > 0) {
      values.push(`Search: ${filters.search.trim()}`);
    }

    if (filters.changeDirection !== 'all') {
      values.push(filters.changeDirection === 'positive' ? '24h: Positive' : '24h: Negative');
    }

    if (filters.marketCapRange !== 'all') {
      const labelMap: Record<MarketCapRangeFilter, string> = {
        all: 'All',
        large: 'Large cap',
        mid: 'Mid cap',
        low: 'Low cap',
      };
      values.push(`Market cap: ${labelMap[filters.marketCapRange]}`);
    }

    if (filters.priceRange !== 'all') {
      const labelMap: Record<PriceRangeFilter, string> = {
        all: 'All',
        'under-1': 'Under $1',
        '1-to-100': '$1-$100',
        'over-100': 'Over $100',
      };
      values.push(`Price: ${labelMap[filters.priceRange]}`);
    }

    if (filters.watchlistOnly) {
      values.push('Watchlist only');
    }

    return values;
  }, [filters]);

  function updateFilter<Key extends keyof CoinTableFilters>(
    key: Key,
    value: CoinTableFilters[Key],
  ) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  }

  return {
    filters,
    filteredCoins,
    activeFilters,
    hasActiveFilters: activeFilters.length > 0,
    updateFilter,
    resetFilters: () => setFilters(defaultFilters),
  };
}
