export type CoinCategory = 'Store of Value' | 'Layer 1' | 'DeFi' | 'Exchange' | 'Meme' | 'AI';

export type CoinRisk = 'Low' | 'Medium' | 'High';

export interface Coin {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
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
