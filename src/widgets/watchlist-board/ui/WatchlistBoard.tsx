import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

interface WatchlistBoardProps {
  children: ReactNode;
  hasCoins: boolean;
  onClearWatchlist: () => void;
  watchlistCount: number;
}

export function WatchlistBoard({
  children,
  hasCoins,
  onClearWatchlist,
  watchlistCount,
}: WatchlistBoardProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">Watchlist</h2>
          <p className="text-muted-foreground">
            Stored in localStorage. Shared across pages through watchlist provider.
          </p>
        </div>
        {hasCoins ? (
          <Button variant="outline" onClick={onClearWatchlist}>
            Clear watchlist
          </Button>
        ) : null}
      </div>

      {hasCoins ? (
        <Card className="border-white/70 bg-white/85">
          <CardHeader>
            <CardTitle>Saved names</CardTitle>
            <CardDescription>{watchlistCount} coins in current browser watchlist.</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      ) : (
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
      )}
    </div>
  );
}
