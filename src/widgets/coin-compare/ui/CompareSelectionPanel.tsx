import { useDeferredValue, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Coin } from '@/entities/coin/model/types';
import { CoinChangeBadge } from '@/entities/coin/ui/CoinChangeBadge';
import { formatCurrency } from '@/shared/lib/formatters';

interface CompareSelectionPanelProps {
  coins: Coin[];
  selectedIds: string[];
  maxReached: boolean;
  onToggleCoin: (coinId: string) => void;
  onClearSelection: () => void;
}

export function CompareSelectionPanel({
  coins,
  selectedIds,
  maxReached,
  onToggleCoin,
  onClearSelection,
}: CompareSelectionPanelProps) {
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);

  const filteredCoins = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    return coins.filter(
      (coin) =>
        normalizedSearch.length === 0 ||
        coin.name.toLowerCase().includes(normalizedSearch) ||
        coin.symbol.toLowerCase().includes(normalizedSearch),
    );
  }, [coins, deferredSearch]);

  return (
    <Card className="border-white/70 bg-white/85">
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <CardTitle>Compare candidates</CardTitle>
            <CardDescription>Select 2-4 coins. Selection persists in localStorage.</CardDescription>
          </div>
          {selectedIds.length > 0 ? (
            <Button variant="outline" onClick={onClearSelection}>
              Clear compare list
            </Button>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search compare candidates..."
            className="max-w-md"
          />
          <div className="flex flex-wrap items-center gap-2">
            {selectedIds.length > 0 ? (
              selectedIds.map((coinId) => (
                <Badge key={coinId} className="bg-slate-950 text-slate-50">
                  {coins.find((coin) => coin.id === coinId)?.symbol ?? coinId}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No coins selected yet.</span>
            )}
          </div>
          {maxReached ? (
            <p className="text-sm text-amber-700">Max four selected. Remove one to add another.</p>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredCoins.map((coin) => {
            const selected = selectedIds.includes(coin.id);

            return (
              <Card
                key={coin.id}
                className={selected ? 'border-sky-500 bg-sky-50' : 'border-white/70 bg-slate-50'}
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <CardTitle className="text-base">
                        <Link to={`/coins/${coin.id}`} className="hover:underline">
                          {coin.name}
                        </Link>
                      </CardTitle>
                      <CardDescription>
                        {coin.symbol} · #{coin.rank}
                      </CardDescription>
                    </div>
                    <CoinChangeBadge change24h={coin.change24h} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{coin.category}</Badge>
                    <Badge variant="outline">{formatCurrency(coin.price)}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{coin.thesis}</p>
                  <Button
                    className="w-full"
                    variant={selected ? 'default' : 'outline'}
                    onClick={() => onToggleCoin(coin.id)}
                  >
                    {selected ? 'Remove from compare' : 'Add to compare'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
