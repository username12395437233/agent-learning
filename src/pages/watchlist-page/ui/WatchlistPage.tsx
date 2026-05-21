import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCoinsQuery } from '@/entities/coin/model/queries';
import { useWatchlist } from '@/features/watchlist/model/watchlist-context';
import { CoinsTable } from '@/widgets/coins-table/ui/CoinsTable';
import { CoinsTableSkeleton } from '@/widgets/coins-table/ui/CoinsTableSkeleton';

export function WatchlistPage() {
  const { data: coins = [], isLoading, isError, error } = useCoinsQuery();
  const { watchlist, clearWatchlist } = useWatchlist();

  if (isLoading) {
    return <CoinsTableSkeleton />;
  }

  if (isError) {
    return (
      <Card className="border-white/70 bg-white/85">
        <CardHeader>
          <CardTitle>Watchlist unavailable</CardTitle>
          <CardDescription>{error.message}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const watchlistCoins = coins.filter((coin) => watchlist.includes(coin.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">Watchlist</h2>
          <p className="text-muted-foreground">
            Stored in localStorage. Shared across pages through watchlist provider.
          </p>
        </div>
        {watchlistCoins.length > 0 ? (
          <Button variant="outline" onClick={clearWatchlist}>
            Clear watchlist
          </Button>
        ) : null}
      </div>

      {watchlistCoins.length === 0 ? (
        <Card className="border-white/70 bg-white/85">
          <CardHeader>
            <CardTitle>Nothing pinned yet</CardTitle>
            <CardDescription>
              Add coins from list or details page to start tracking them.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/coins">Browse coins</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-white/70 bg-white/85">
          <CardHeader>
            <CardTitle>Saved names</CardTitle>
            <CardDescription>
              {watchlistCoins.length} coins in current browser watchlist.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CoinsTable coins={watchlistCoins} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
