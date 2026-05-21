import { Link } from 'react-router-dom';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import type { Coin } from '@/entities/coin';
import { CoinChangeBadge } from '@/entities/coin';
import { formatCurrency } from '@/shared/lib/formatters';

interface WatchlistOverviewProps {
  coins: Coin[];
}

export function WatchlistOverview({ coins }: WatchlistOverviewProps) {
  return (
    <Card className="border-white/70 bg-white/85">
      <CardHeader>
        <CardTitle>Watchlist snapshot</CardTitle>
        <CardDescription>Local-first watchlist stored in browser localStorage.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {coins.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-5 text-sm text-muted-foreground">
            No coins pinned yet. Add names from Coins or Coin Details.
          </div>
        ) : (
          coins.slice(0, 4).map((coin) => (
            <div key={coin.id} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">{coin.name}</p>
                <p className="text-xs text-muted-foreground">
                  {coin.symbol} · {formatCurrency(coin.price)}
                </p>
              </div>
              <CoinChangeBadge change24h={coin.change24h} />
            </div>
          ))
        )}

        <Button asChild className="w-full">
          <Link to="/watchlist">Open watchlist</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
