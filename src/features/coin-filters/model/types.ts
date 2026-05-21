export type ChangeDirectionFilter = 'all' | 'positive' | 'negative';

export type MarketCapRangeFilter = 'all' | 'large' | 'mid' | 'low';

export type PriceRangeFilter = 'all' | 'under-1' | '1-to-100' | 'over-100';

export interface CoinTableFilters {
  search: string;
  changeDirection: ChangeDirectionFilter;
  marketCapRange: MarketCapRangeFilter;
  priceRange: PriceRangeFilter;
  watchlistOnly: boolean;
}
