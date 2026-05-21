import { useCoinsQuery } from '@/entities/coin';
import { AdvancedCoinsTable, CoinsTableSkeleton } from '@/widgets/coins-table';
import { CoinsCatalog } from '@/widgets/coins-catalog';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

export function CoinsPage() {
  const { data: coins = [], isLoading, isError, error } = useCoinsQuery();

  if (isLoading) {
    return <CoinsTableSkeleton />;
  }

  if (isError) {
    return (
      <Card className="border-white/70 bg-white/85">
        <CardHeader>
          <CardTitle>Coins unavailable</CardTitle>
          <CardDescription>{error.message}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <CoinsCatalog>
      <AdvancedCoinsTable coins={coins} />
    </CoinsCatalog>
  );
}
