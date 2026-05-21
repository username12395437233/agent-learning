import type { ReactNode } from 'react';

import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

interface CoinsCatalogProps {
  children: ReactNode;
}

export function CoinsCatalog({ children }: CoinsCatalogProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">Coins</h2>
        <p className="text-muted-foreground">
          Advanced market table with TanStack Table sorting, filters, search, and watchlist-aware
          views.
        </p>
      </div>

      <Card className="border-white/70 bg-white/85">
        <CardHeader>
          <CardTitle>Market table</CardTitle>
          <CardDescription>
            Live CoinPaprika data with sortable columns, right-side filters, and optional column
            visibility.
          </CardDescription>
        </CardHeader>
        <div className="px-6 pb-6">{children}</div>
      </Card>
    </div>
  );
}
