import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCoinsQuery } from '@/entities/coin/model/queries';
import { useWatchlist } from '@/features/watchlist/model/watchlist-context';
import { CoinsTable } from '@/widgets/coins-table/ui/CoinsTable';
import { CoinsTableSkeleton } from '@/widgets/coins-table/ui/CoinsTableSkeleton';
import { MarketOverview } from '@/widgets/market-overview/ui/MarketOverview';
import { WatchlistOverview } from '@/widgets/watchlist-overview/ui/WatchlistOverview';

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
      <section className="rounded-[32px] border border-white/70 bg-linear-to-br from-sky-100 via-white to-emerald-100 p-7 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-600">
              <TrendingUp className="size-3.5" />
              Crypto Market Radar MVP
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-semibold tracking-tight">Read market structure fast.</h2>
              <p className="text-base text-slate-600">
                Dashboard merges mock market data, local watchlist state, and compare-ready flows
                using TanStack Query and shadcn/ui primitives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <MarketOverview coins={coins} watchlistCount={watchlist.length} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.8fr)]">
        <Card className="border-white/70 bg-white/85">
          <CardHeader>
            <CardTitle>Market board</CardTitle>
            <CardDescription>
              Flip between gainers, liquidity, and your pinned names.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="gainers" className="gap-4">
              <TabsList>
                <TabsTrigger value="gainers">Top gainers</TabsTrigger>
                <TabsTrigger value="volume">Volume leaders</TabsTrigger>
                <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
              </TabsList>
              <TabsContent value="gainers">
                <CoinsTable coins={topGainers.slice(0, 5)} />
              </TabsContent>
              <TabsContent value="volume">
                <CoinsTable coins={volumeLeaders.slice(0, 5)} />
              </TabsContent>
              <TabsContent value="watchlist">
                <CoinsTable coins={watchlistCoins} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <WatchlistOverview coins={watchlistCoins} />
      </div>
    </div>
  );
}
