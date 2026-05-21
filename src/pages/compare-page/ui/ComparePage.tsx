import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCoinsQuery } from '@/entities/coin/model/queries';
import { useCompareSelection } from '@/features/compare/model/useCompareSelection';
import { CompareSelectionPanel } from '@/widgets/coin-compare/ui/CompareSelectionPanel';
import { CoinsTableSkeleton } from '@/widgets/coins-table/ui/CoinsTableSkeleton';
import { CompareChartsGrid } from '@/widgets/compare-charts/ui/CompareChartsGrid';
import { CompareCoinsTable } from '@/widgets/coin-compare/ui/CompareCoinsTable';

export function ComparePage() {
  const { data: coins = [], isLoading, isError, error } = useCoinsQuery();
  const { selectedIds, selectedCoins, canCompare, maxReached, toggleCoin, clearSelection } =
    useCompareSelection(coins);

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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">Compare</h2>
          <p className="text-muted-foreground">
            Persisted compare board for 2-4 coins with direct metric and chart comparison.
          </p>
        </div>
        {selectedCoins.length > 0 ? (
          <Button variant="outline" onClick={clearSelection}>
            Clear compare list
          </Button>
        ) : null}
      </div>

      <CompareSelectionPanel
        coins={coins}
        selectedIds={selectedIds}
        maxReached={maxReached}
        onToggleCoin={toggleCoin}
        onClearSelection={clearSelection}
      />

      {selectedCoins.length === 0 ? (
        <Card className="border-white/70 bg-white/85">
          <CardHeader>
            <CardTitle>No comparison selected</CardTitle>
            <CardDescription>
              Add two or more coins from the compare candidates below to unlock side-by-side
              analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/coins">Browse coins</Link>
            </Button>
          </CardContent>
        </Card>
      ) : canCompare ? (
        <>
          <Card className="border-white/70 bg-white/85">
            <CardHeader>
              <CardTitle>Comparison table</CardTitle>
              <CardDescription>Core market fields across selected coins.</CardDescription>
            </CardHeader>
            <CardContent>
              <CompareCoinsTable coins={selectedCoins} />
            </CardContent>
          </Card>

          <CompareChartsGrid coins={selectedCoins} />
        </>
      ) : (
        <Card className="border-white/70 bg-white/85">
          <CardHeader>
            <CardTitle>One more coin needed</CardTitle>
            <CardDescription>
              Select at least two coins to render table and chart comparisons.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
