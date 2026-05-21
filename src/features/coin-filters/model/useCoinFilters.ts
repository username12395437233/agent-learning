import { useDeferredValue, useMemo, useState } from 'react';

import type { Coin, CoinCategory } from '@/entities/coin/model/types';

export type CoinSortKey = 'rank' | 'marketCap' | 'price' | 'change24h';

export function useCoinFilters(coins: Coin[]) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CoinCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<CoinSortKey>('marketCap');
  const deferredSearch = useDeferredValue(search);

  const categories = useMemo(
    () => Array.from(new Set(coins.map((coin) => coin.category))),
    [coins],
  );

  const filteredCoins = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    return [...coins]
      .filter((coin) => {
        const matchesSearch =
          normalizedSearch.length === 0 ||
          coin.name.toLowerCase().includes(normalizedSearch) ||
          coin.symbol.toLowerCase().includes(normalizedSearch) ||
          coin.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

        const matchesCategory = category === 'all' || coin.category === category;

        return matchesSearch && matchesCategory;
      })
      .sort((leftCoin, rightCoin) => {
        switch (sortBy) {
          case 'rank':
            return leftCoin.rank - rightCoin.rank;
          case 'price':
            return rightCoin.price - leftCoin.price;
          case 'change24h':
            return rightCoin.change24h - leftCoin.change24h;
          case 'marketCap':
          default:
            return rightCoin.marketCap - leftCoin.marketCap;
        }
      });
  }, [category, coins, deferredSearch, sortBy]);

  return {
    search,
    setSearch,
    category,
    setCategory,
    sortBy,
    setSortBy,
    categories,
    filteredCoins,
  };
}
