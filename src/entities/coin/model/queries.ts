import { useQuery } from '@tanstack/react-query';

import { getCoinById, getCoins } from '@/entities/coin/api/coin-service';

export function useCoinsQuery() {
  return useQuery({
    queryKey: ['coins'],
    queryFn: getCoins,
  });
}

export function useCoinQuery(coinId: string | undefined) {
  return useQuery({
    queryKey: ['coins', coinId],
    queryFn: () => getCoinById(coinId as string),
    enabled: Boolean(coinId),
  });
}
