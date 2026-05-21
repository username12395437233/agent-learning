import { ArrowUpRight, Layers3, Star, Wallet } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Coin } from '@/entities/coin/model/types';
import { formatCompactCurrency, formatPercent } from '@/shared/lib/formatters';

interface MarketOverviewProps {
  coins: Coin[];
  watchlistCount: number;
}

export function MarketOverview({ coins, watchlistCount }: MarketOverviewProps) {
  const totalMarketCap = coins.reduce((sum, coin) => sum + coin.marketCap, 0);
  const totalVolume = coins.reduce((sum, coin) => sum + coin.volume24h, 0);
  const averageMove =
    coins.reduce((sum, coin) => sum + coin.change24h, 0) / Math.max(coins.length, 1);

  const stats = [
    {
      label: 'Tracked market cap',
      value: formatCompactCurrency(totalMarketCap),
      icon: Wallet,
    },
    {
      label: '24h volume',
      value: formatCompactCurrency(totalVolume),
      icon: ArrowUpRight,
    },
    {
      label: 'Average move',
      value: `${averageMove >= 0 ? '+' : ''}${formatPercent(averageMove)}`,
      icon: Layers3,
    },
    {
      label: 'Watchlist size',
      value: String(watchlistCount),
      icon: Star,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label} className="border-white/70 bg-white/85">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
            <Icon className="size-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tracking-tight">{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
