import { ExternalLink } from 'lucide-react';

import { CoinChangeBadge, type Coin } from '@/entities/coin';
import { WatchlistToggleButton } from '@/features/watchlist';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

interface CoinDetailsHeroProps {
  coin: Coin;
}

export function CoinDetailsHero({ coin }: CoinDetailsHeroProps) {
  return (
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
  );
}
