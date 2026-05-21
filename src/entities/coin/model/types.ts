export type CoinCategory = 'Large Cap' | 'Mid Cap' | 'Small Cap' | 'Micro Cap' | 'Stablecoin';

export type CoinRisk = 'Low' | 'Medium' | 'High';

export interface Coin {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  change7d?: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply?: number;
  category: CoinCategory;
  risk: CoinRisk;
  description: string;
  website: string;
  thesis: string;
  tags: string[];
}
