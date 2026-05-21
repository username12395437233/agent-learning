import { useMemo, useState } from 'react';

import type { Coin } from '@/entities/coin/model/types';

const MAX_COMPARE_ITEMS = 4;

export function useCompareSelection(coins: Coin[]) {
  const [selectedIds, setSelectedIds] = useState<string[]>(['bitcoin', 'ethereum']);

  const selectedCoins = useMemo(
    () => coins.filter((coin) => selectedIds.includes(coin.id)),
    [coins, selectedIds],
  );

  function toggleCoin(coinId: string) {
    setSelectedIds((currentSelectedIds) => {
      if (currentSelectedIds.includes(coinId)) {
        return currentSelectedIds.filter((currentCoinId) => currentCoinId !== coinId);
      }

      if (currentSelectedIds.length >= MAX_COMPARE_ITEMS) {
        return currentSelectedIds;
      }

      return [...currentSelectedIds, coinId];
    });
  }

  return {
    selectedIds,
    selectedCoins,
    maxReached: selectedIds.length >= MAX_COMPARE_ITEMS,
    toggleCoin,
    resetSelection: () => setSelectedIds([]),
  };
}
