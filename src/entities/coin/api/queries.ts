import { useQuery } from '@tanstack/react-query';

import { fetchCoinById, fetchCoins } from '@/entities/coin/api/coin-service';

export function useCoinsQuery() {
  return useQuery({
    queryKey: ['coins'],
    queryFn: fetchCoins,
  });
}

export function useCoinQuery(coinId: string | undefined) {
  return useQuery({
    queryKey: ['coins', coinId],
    queryFn: () => fetchCoinById(coinId as string),
    enabled: Boolean(coinId),
  });
}
