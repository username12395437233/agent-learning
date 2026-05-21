import type { Coin } from '@/entities/coin';
import { formatPercent } from '@/shared/lib/formatters';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

interface CoinResearchTabsProps {
  coin: Coin;
}

export function CoinResearchTabs({ coin }: CoinResearchTabsProps) {
  const supplyProgress = coin.maxSupply
    ? Math.min((coin.circulatingSupply / coin.maxSupply) * 100, 100)
    : null;

  return (
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
              {coin.name} sits in {coin.category} bucket with {coin.risk.toLowerCase()} risk profile
              relative to rest of mock universe.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
