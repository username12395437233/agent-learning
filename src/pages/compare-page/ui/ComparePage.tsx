import { useCoinsQuery } from '@/entities/coin';
import { useCompareSelection } from '@/features/compare';
import { CompareCoinsTable } from '@/widgets/coin-compare';
import { CoinsTableSkeleton } from '@/widgets/coins-table';
import { CompareBoard } from '@/widgets/compare-board';
import { CompareChartsGrid } from '@/widgets/compare-charts';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

export function ComparePage() {
  const { data: coins = [], isLoading, isError, error } = useCoinsQuery();
  const { selectedCoins, canCompare, clearSelection } = useCompareSelection(coins);

  if (isLoading) {
    return <CoinsTableSkeleton />;
  }

  if (isError) {
    return (
      <Card className="border-white/70 bg-white/85">
        <CardHeader>
          <CardTitle>Compare unavailable</CardTitle>
          <CardDescription>{error.message}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <CompareBoard
      canCompare={canCompare}
      charts={<CompareChartsGrid coins={selectedCoins} />}
      comparisonTable={<CompareCoinsTable coins={selectedCoins} />}
      hasSelection={selectedCoins.length > 0}
      onClearSelection={clearSelection}
      selectedCount={selectedCoins.length}
    />
  );
}
