import type { ReactNode } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

interface MarketBoardProps {
  gainers: ReactNode;
  volumeLeaders: ReactNode;
  watchlist: ReactNode;
}

export function MarketBoard({ gainers, volumeLeaders, watchlist }: MarketBoardProps) {
  return (
    <Card className="border-white/70 bg-white/85">
      <CardHeader>
        <CardTitle>Market board</CardTitle>
        <CardDescription>Flip between gainers, liquidity, and your pinned names.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gainers" className="gap-4">
          <TabsList>
            <TabsTrigger value="gainers">Top gainers</TabsTrigger>
            <TabsTrigger value="volume">Volume leaders</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          </TabsList>
          <TabsContent value="gainers">{gainers}</TabsContent>
          <TabsContent value="volume">{volumeLeaders}</TabsContent>
          <TabsContent value="watchlist">{watchlist}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
