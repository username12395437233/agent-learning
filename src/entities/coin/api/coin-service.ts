import type { Coin } from '../model/types';

import { getCoinPaprikaTicker, getCoinPaprikaTickers } from './coinpaprika-client';
import { mapCoinPaprikaTickerToCoin } from './coinpaprika-mapper';

export async function getCoins(): Promise<Coin[]> {
  const tickers = await getCoinPaprikaTickers();

  return tickers.map(mapCoinPaprikaTickerToCoin);
}

export async function getCoinById(coinId: string): Promise<Coin> {
  try {
    const ticker = await getCoinPaprikaTicker(coinId);

    return mapCoinPaprikaTickerToCoin(ticker);
  } catch {
    const coins = await getCoins();
    const coin = coins.find((currentCoin) => currentCoin.id === coinId);

    if (!coin) {
      throw new Error(`Coin "${coinId}" not found`);
    }

    return coin;
  }
}
