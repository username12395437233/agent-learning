import { Link } from 'react-router-dom';

import { useCoinsQuery } from '@/entities/coin';
import { useWatchlist } from '@/features/watchlist';
import { DashboardHero } from '@/widgets/dashboard';
import { CoinsTable, CoinsTableSkeleton } from '@/widgets/coins-table';
import { MarketBoard } from '@/widgets/market-board';
import { MarketOverview } from '@/widgets/market-overview';
import { WatchlistOverview } from '@/widgets/watchlist-overview';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

export function DashboardPage() {
  const { data: coins = [], isLoading, isError, error } = useCoinsQuery();
  const { watchlist } = useWatchlist();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <CoinsTableSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-white/70 bg-white/85">
        <CardHeader>
          <CardTitle>Dashboard unavailable</CardTitle>
          <CardDescription>{error.message}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link to="/coins">Open Coins</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const watchlistCoins = coins.filter((coin) => watchlist.includes(coin.id));
  const topGainers = [...coins].sort(
    (leftCoin, rightCoin) => rightCoin.change24h - leftCoin.change24h,
  );
  const volumeLeaders = [...coins].sort(
    (leftCoin, rightCoin) => rightCoin.volume24h - leftCoin.volume24h,
  );

  return (
    <div className="space-y-6">
      <DashboardHero />
      <MarketOverview coins={coins} watchlistCount={watchlist.length} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.8fr)]">
        <MarketBoard
          gainers={<CoinsTable coins={topGainers.slice(0, 5)} />}
          volumeLeaders={<CoinsTable coins={volumeLeaders.slice(0, 5)} />}
          watchlist={<CoinsTable coins={watchlistCoins} />}
        />
        <WatchlistOverview coins={watchlistCoins} />
      </div>
    </div>
  );
}
