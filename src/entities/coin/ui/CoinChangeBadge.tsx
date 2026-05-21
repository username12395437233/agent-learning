import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatPercent } from '@/shared/lib/formatters';

interface CoinChangeBadgeProps {
  change24h: number;
}

export function CoinChangeBadge({ change24h }: CoinChangeBadgeProps) {
  const positive = change24h >= 0;

  return (
    <Badge
      className={cn(
        'border-transparent',
        positive ? 'bg-emerald-500/15 text-emerald-700' : 'bg-rose-500/15 text-rose-700',
      )}
    >
      {positive ? '+' : ''}
      {formatPercent(change24h)}
    </Badge>
  );
}
