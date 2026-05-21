import type { Coin } from '@/entities/coin';
import { formatCompactCurrency, formatCurrency } from '@/shared/lib/formatters';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

interface CoinDetailsMetricsProps {
  coin: Coin;
}

export function CoinDetailsMetrics({ coin }: CoinDetailsMetricsProps) {
  return (
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
  );
}
