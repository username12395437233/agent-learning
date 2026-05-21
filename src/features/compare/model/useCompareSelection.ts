import { useEffect, useMemo, useState } from 'react';

import type { Coin } from '@/entities/coin/model/types';
import { readLocalStorage, writeLocalStorage } from '@/shared/lib/local-storage';

const COMPARE_STORAGE_KEY = 'crypto-market-radar/compare';
const MAX_COMPARE_ITEMS = 4;
const MIN_COMPARE_ITEMS = 2;
const defaultSelection: string[] = [];

function readCompareSelection() {
  return readLocalStorage<string[]>(COMPARE_STORAGE_KEY, defaultSelection);
}

export function useCompareSelection(coins: Coin[]) {
  const [selectedIds, setSelectedIds] = useState<string[]>(readCompareSelection);

  useEffect(() => {
    writeLocalStorage(COMPARE_STORAGE_KEY, selectedIds);
  }, [selectedIds]);

  const availableSelectedIds = useMemo(
    () => selectedIds.filter((selectedId) => coins.some((coin) => coin.id === selectedId)),
    [coins, selectedIds],
  );

  const selectedCoins = useMemo(
    () => coins.filter((coin) => availableSelectedIds.includes(coin.id)),
    [availableSelectedIds, coins],
  );

  function addCoin(coinId: string) {
    setSelectedIds((currentSelectedIds) => {
      if (currentSelectedIds.includes(coinId) || currentSelectedIds.length >= MAX_COMPARE_ITEMS) {
        return currentSelectedIds;
      }

      return [...currentSelectedIds, coinId];
    });
  }

  function removeCoin(coinId: string) {
    setSelectedIds((currentSelectedIds) =>
      currentSelectedIds.filter((currentCoinId) => currentCoinId !== coinId),
    );
  }

  function toggleCoin(coinId: string) {
    if (availableSelectedIds.includes(coinId)) {
      removeCoin(coinId);
      return;
    }

    addCoin(coinId);
  }

  return {
    selectedIds: availableSelectedIds,
    selectedCoins,
    canCompare: selectedCoins.length >= MIN_COMPARE_ITEMS,
    maxReached: availableSelectedIds.length >= MAX_COMPARE_ITEMS,
    toggleCoin,
    addCoin,
    removeCoin,
    clearSelection: () => setSelectedIds([]),
  };
}
