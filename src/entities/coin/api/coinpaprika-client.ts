const COINPAPRIKA_API_URL = 'https://api.coinpaprika.com/v1';

export interface CoinPaprikaQuoteUsd {
  price: number;
  volume_24h: number;
  market_cap: number;
  percent_change_24h: number;
  percent_change_7d?: number;
}

export interface CoinPaprikaTicker {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  max_supply: number | null;
  beta_value?: number | null;
  last_updated?: string;
  quotes: {
    USD: CoinPaprikaQuoteUsd;
  };
}

async function requestCoinPaprika<T>(path: string): Promise<T> {
  const response = await fetch(`${COINPAPRIKA_API_URL}${path}`);

  if (!response.ok) {
    throw new Error(`CoinPaprika request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export function getCoinPaprikaTickers() {
  return requestCoinPaprika<CoinPaprikaTicker[]>('/tickers?quotes=USD');
}

export function getCoinPaprikaTicker(coinId: string) {
  return requestCoinPaprika<CoinPaprikaTicker>(`/tickers/${coinId}?quotes=USD`);
}
