import { mockCoins } from '@/entities/coin/model/mock-coins';
import type { Coin } from '@/entities/coin/model/types';

const MOCK_DELAY_MS = 250;

function wait(delayMs: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayMs);
  });
}

export async function fetchCoins(): Promise<Coin[]> {
  await wait(MOCK_DELAY_MS);
  return mockCoins;
}

export async function fetchCoinById(coinId: string): Promise<Coin> {
  await wait(MOCK_DELAY_MS);

  const coin = mockCoins.find(({ id }) => id === coinId);

  if (!coin) {
    throw new Error(`Coin "${coinId}" not found`);
  }

  return coin;
}
