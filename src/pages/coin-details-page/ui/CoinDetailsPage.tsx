import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCoinsQuery } from '@/entities/coin/model/queries';
import { CoinChangeBadge } from '@/entities/coin/ui/CoinChangeBadge';
import { WatchlistToggleButton } from '@/features/watchlist/ui/WatchlistToggleButton';
import { formatCompactCurrency, formatCurrency, formatPercent } from '@/shared/lib/formatters';

export function CoinDetailsPage() {
  const { coinId } = useParams<{ coinId: string }>();
  const { data: coins = [], isLoading, isError, error } = useCoinsQuery();

  if (isLoading) {
    return <Skeleton className="h-72 w-full rounded-[32px]" />;
  }

  const coin = coins.find((currentCoin) => currentCoin.id === coinId);

  if (isError || !coin) {
    return (
      <Card className="border-white/70 bg-white/85">
        <CardContent className="space-y-4 pt-6">
          <p className="text-lg font-medium">Coin details unavailable.</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : 'Coin not found.'}
          </p>
          <Button asChild variant="outline">
            <Link to="/coins">Back to Coins</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const supplyProgress = coin.maxSupply
    ? Math.min((coin.circulatingSupply / coin.maxSupply) * 100, 100)
    : null;

  return (
    <div className="space-y-6">
      <Button asChild variant="outline">
        <Link to="/coins">
          <ArrowLeft className="size-4" />
          Back to Coins
        </Link>
      </Button>

      <section className="rounded-[32px] border border-white/70 bg-white/85 p-7 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-4xl font-semibold tracking-tight">{coin.name}</h2>
              <Badge variant="outline">{coin.symbol}</Badge>
              <Badge>{coin.category}</Badge>
              <CoinChangeBadge change24h={coin.change24h} />
            </div>
            <p className="max-w-3xl text-muted-foreground">{coin.description}</p>
            <div className="flex flex-wrap gap-2">
              {coin.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <WatchlistToggleButton coinId={coin.id} size="default" />
            <Button asChild variant="outline">
              <a href={coin.website} target="_blank" rel="noreferrer">
                Website
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-white/70 bg-white/85">
          <CardHeader>
            <CardDescription>Price</CardDescription>
            <CardTitle>{formatCurrency(coin.price)}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-white/70 bg-white/85">
          <CardHeader>
            <CardDescription>Market cap</CardDescription>
            <CardTitle>{formatCompactCurrency(coin.marketCap)}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-white/70 bg-white/85">
          <CardHeader>
            <CardDescription>24h volume</CardDescription>
            <CardTitle>{formatCompactCurrency(coin.volume24h)}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-white/70 bg-white/85">
          <CardHeader>
            <CardDescription>Risk profile</CardDescription>
            <CardTitle>{coin.risk}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="border-white/70 bg-white/85">
        <CardHeader>
          <CardTitle>Research tabs</CardTitle>
          <CardDescription>
            Simple MVP sections for thesis, market data, and supply read.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="gap-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="market">Market</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">{coin.thesis}</p>
              <div className="rounded-2xl bg-slate-950 p-4 text-slate-50">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-300">MVP note</p>
                <p className="mt-2 text-sm">
                  Data loaded live from CoinPaprika ticker endpoint and mapped into internal coin
                  model.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="market" className="grid gap-4 md:grid-cols-3">
              <Card className="border-white/70 bg-slate-50">
                <CardHeader>
                  <CardDescription>24h move</CardDescription>
                  <CardTitle>{formatPercent(coin.change24h)}</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-white/70 bg-slate-50">
                <CardHeader>
                  <CardDescription>Circulating supply</CardDescription>
                  <CardTitle>{coin.circulatingSupply.toLocaleString()}</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-white/70 bg-slate-50">
                <CardHeader>
                  <CardDescription>Max supply</CardDescription>
                  <CardTitle>{coin.maxSupply?.toLocaleString() ?? 'Uncapped'}</CardTitle>
                </CardHeader>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Supply in circulation</span>
                  <span className="font-medium">
                    {supplyProgress === null ? 'N/A' : `${supplyProgress.toFixed(0)}%`}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-sky-500"
                    style={{ width: `${supplyProgress ?? 35}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {coin.name} sits in {coin.category} bucket with {coin.risk.toLowerCase()} risk
                profile relative to rest of mock universe.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
