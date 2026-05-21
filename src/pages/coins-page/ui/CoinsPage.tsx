import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCoinsQuery } from '@/entities/coin/model/queries';
import { AdvancedCoinsTable } from '@/widgets/coins-table/ui/AdvancedCoinsTable';
import { CoinsTableSkeleton } from '@/widgets/coins-table/ui/CoinsTableSkeleton';

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
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">Coins</h2>
        <p className="text-muted-foreground">
          Advanced market table with TanStack Table sorting, filters, search, and watchlist-aware
          views.
        </p>
      </div>

      <Card className="border-white/70 bg-white/85">
        <CardHeader>
          <CardTitle>Market table</CardTitle>
          <CardDescription>
            Live CoinPaprika data with sortable columns, right-side filters, and optional column
            visibility.
          </CardDescription>
        </CardHeader>
        <div className="px-6 pb-6">
          <AdvancedCoinsTable coins={coins} />
        </div>
      </Card>
    </div>
  );
}
