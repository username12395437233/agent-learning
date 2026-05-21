import { useDeferredValue, useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCoinsQuery } from '@/entities/coin/api/queries';
import { useCompareSelection } from '@/features/compare/model/useCompareSelection';
import { WatchlistToggleButton } from '@/features/watchlist/ui/WatchlistToggleButton';
import { CompareTable } from '@/widgets/compare-table/ui/CompareTable';
import { CoinsTableSkeleton } from '@/widgets/coins-table/ui/CoinsTableSkeleton';

export function ComparePage() {
  const { data: coins = [], isLoading } = useCoinsQuery();
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const { selectedIds, selectedCoins, maxReached, toggleCoin, resetSelection } =
    useCompareSelection(coins);

  const filteredCoins = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    return coins.filter(
      (coin) =>
        normalizedSearch.length === 0 ||
        coin.name.toLowerCase().includes(normalizedSearch) ||
        coin.symbol.toLowerCase().includes(normalizedSearch),
    );
  }, [coins, deferredSearch]);

  if (isLoading) {
    return <CoinsTableSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">Compare</h2>
        <p className="text-muted-foreground">
          Pick up to four coins. Table below shows side-by-side market and thesis fields.
        </p>
      </div>

      <Card className="border-white/70 bg-white/85">
        <CardHeader>
          <CardTitle>Selection tray</CardTitle>
          <CardDescription>
            Current compare set lives in page state. Max four assets.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {selectedCoins.map((coin) => (
              <Badge key={coin.id} className="bg-slate-950 text-slate-50">
                {coin.symbol}
              </Badge>
            ))}
            {selectedCoins.length === 0 ? (
              <span className="text-sm text-muted-foreground">Select at least two coins.</span>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search compare candidates..."
              className="max-w-md"
            />
            <Button variant="outline" onClick={resetSelection}>
              Reset
            </Button>
          </div>
          {maxReached ? (
            <p className="text-sm text-amber-700">Max four selected. Remove one to add another.</p>
          ) : null}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredCoins.map((coin) => {
          const selected = selectedIds.includes(coin.id);

          return (
            <Card
              key={coin.id}
              className={selected ? 'border-sky-500 bg-sky-50' : 'border-white/70 bg-white/85'}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{coin.name}</CardTitle>
                    <CardDescription>
                      {coin.symbol} · {coin.category}
                    </CardDescription>
                  </div>
                  <WatchlistToggleButton coinId={coin.id} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{coin.thesis}</p>
                <Button
                  className="w-full"
                  variant={selected ? 'default' : 'outline'}
                  onClick={() => toggleCoin(coin.id)}
                >
                  {selected ? 'Remove from compare' : 'Add to compare'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-white/70 bg-white/85">
        <CardHeader>
          <CardTitle>Comparison table</CardTitle>
          <CardDescription>Shown when at least two coins are selected.</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedCoins.length >= 2 ? (
            <CompareTable coins={selectedCoins} />
          ) : (
            <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
              Select two or more coins to compare.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
