import { useParams } from 'react-router-dom';

import { CoinDetails } from '@/widgets/coin-details';

export function CoinDetailsPage() {
  const { coinId } = useParams<{ coinId: string }>();

  return <CoinDetails coinId={coinId} />;
}
