import { useCoinsQuery } from '@/entities/coin';
import { useWatchlist } from '@/features/watchlist';
import { CoinsTable, CoinsTableSkeleton } from '@/widgets/coins-table';
import { WatchlistBoard } from '@/widgets/watchlist-board';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

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
    <WatchlistBoard
      hasCoins={watchlistCoins.length > 0}
      onClearWatchlist={clearWatchlist}
      watchlistCount={watchlistCoins.length}
    >
      <CoinsTable coins={watchlistCoins} />
    </WatchlistBoard>
  );
}
