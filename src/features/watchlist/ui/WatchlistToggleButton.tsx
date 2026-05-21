import { Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useWatchlist } from '@/features/watchlist/model/watchlist-context';

interface WatchlistToggleButtonProps {
  coinId: string;
  size?: 'default' | 'sm';
}

export function WatchlistToggleButton({ coinId, size = 'sm' }: WatchlistToggleButtonProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const active = isInWatchlist(coinId);

  return (
    <Button
      type="button"
      variant={active ? 'default' : 'outline'}
      size={size}
      onClick={() => toggleWatchlist(coinId)}
      className={cn(active && 'bg-amber-500 text-slate-950 hover:bg-amber-400')}
    >
      <Star className={cn('size-4', active && 'fill-current')} />
      {active ? 'Watching' : 'Watchlist'}
    </Button>
  );
}
