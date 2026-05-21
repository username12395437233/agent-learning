import type { Coin } from '../model/types';

import type { CoinPaprikaTicker } from './coinpaprika-client';

function inferCategory(ticker: CoinPaprikaTicker): Coin['category'] {
  const upperSymbol = ticker.symbol.toUpperCase();

  if (['USDT', 'USDC', 'DAI'].includes(upperSymbol)) {
    return 'Stablecoin';
  }

  const marketCap = ticker.quotes.USD.market_cap;

  if (marketCap >= 100_000_000_000) {
    return 'Large Cap';
  }

  if (marketCap >= 10_000_000_000) {
    return 'Mid Cap';
  }

  if (marketCap >= 1_000_000_000) {
    return 'Small Cap';
  }

  return 'Micro Cap';
}

function inferRisk(ticker: CoinPaprikaTicker): Coin['risk'] {
  if (ticker.rank <= 20) {
    return 'Low';
  }

  if (ticker.rank <= 100) {
    return 'Medium';
  }

  return 'High';
}

function createDescription(ticker: CoinPaprikaTicker, category: Coin['category']) {
  return `${ticker.name} (${ticker.symbol}) market snapshot from CoinPaprika. Ranked #${ticker.rank} in current ${category.toLowerCase()} bucket.`;
}

function createThesis(ticker: CoinPaprikaTicker, category: Coin['category']) {
  return `${ticker.name} tracked as ${category.toLowerCase()} asset. Use live price, market cap, and 24h move as quick radar inputs before deeper research.`;
}

function createTags(ticker: CoinPaprikaTicker, category: Coin['category']) {
  return [
    ticker.symbol.toLowerCase(),
    category.toLowerCase().replace(/\s+/g, '-'),
    `rank-${ticker.rank}`,
  ];
}

export function mapCoinPaprikaTickerToCoin(ticker: CoinPaprikaTicker): Coin {
  const category = inferCategory(ticker);

  return {
    id: ticker.id,
    rank: ticker.rank,
    name: ticker.name,
    symbol: ticker.symbol,
    price: ticker.quotes.USD.price,
    change24h: ticker.quotes.USD.percent_change_24h,
    change7d: ticker.quotes.USD.percent_change_7d,
    marketCap: ticker.quotes.USD.market_cap,
    volume24h: ticker.quotes.USD.volume_24h,
    circulatingSupply: ticker.circulating_supply,
    maxSupply: ticker.max_supply ?? undefined,
    category,
    risk: inferRisk(ticker),
    description: createDescription(ticker, category),
    website: `https://coinpaprika.com/coin/${ticker.id}/`,
    thesis: createThesis(ticker, category),
    tags: createTags(ticker, category),
  };
}
