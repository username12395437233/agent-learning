import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';
import { useCoinsQuery } from '@/entities/coin';

import { CoinDetailsHero } from './CoinDetailsHero';
import { CoinDetailsMetrics } from './CoinDetailsMetrics';
import { CoinResearchTabs } from './CoinResearchTabs';

interface CoinDetailsProps {
  coinId: string | undefined;
}

export function CoinDetails({ coinId }: CoinDetailsProps) {
  const { data: coins = [], isLoading, isError, error } = useCoinsQuery();

  if (isLoading) {
    return <Skeleton className="h-72 w-full rounded-[32px]" />;
  }

  const coin = coins.find((currentCoin) => currentCoin.id === coinId);

  if (isError || !coin) {
    return (
      <Card className="border-white/70 bg-white/85">
        <CardContent className="space-y-4 pt-6">
          <p className="text-lg font-medium">Coin details unavailable.</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : 'Coin not found.'}
          </p>
          <Button asChild variant="outline">
            <Link to="/coins">Back to Coins</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="outline">
        <Link to="/coins">
          <ArrowLeft className="size-4" />
          Back to Coins
        </Link>
      </Button>

      <CoinDetailsHero coin={coin} />
      <CoinDetailsMetrics coin={coin} />
      <CoinResearchTabs coin={coin} />
    </div>
  );
}
