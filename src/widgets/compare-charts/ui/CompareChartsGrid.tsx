import type { Coin } from '@/entities/coin/model/types';
import { CompareBarChartCard } from '@/widgets/compare-charts/ui/CompareBarChartCard';

interface CompareChartsGridProps {
  coins: Coin[];
}

export function CompareChartsGrid({ coins }: CompareChartsGridProps) {
  const marketCapData = coins.map((coin) => ({
    name: coin.name,
    symbol: coin.symbol,
    value: coin.marketCap,
  }));

  const volumeData = coins.map((coin) => ({
    name: coin.name,
    symbol: coin.symbol,
    value: coin.volume24h,
  }));

  const change24hData = coins.map((coin) => ({
    name: coin.name,
    symbol: coin.symbol,
    value: coin.change24h,
  }));

  const change7dData = coins
    .filter((coin) => coin.change7d !== undefined)
    .map((coin) => ({
      name: coin.name,
      symbol: coin.symbol,
      value: coin.change7d as number,
    }));

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <CompareBarChartCard
        title="Market cap comparison"
        description="Current total value snapshot across selected coins."
        data={marketCapData}
        valueType="currency"
      />
      <CompareBarChartCard
        title="24h volume comparison"
        description="Liquidity snapshot based on last 24h exchange volume."
        data={volumeData}
        valueType="currency"
      />
      <CompareBarChartCard
        title="24h percent change"
        description="Short-term move comparison across current selection."
        data={change24hData}
        valueType="percent"
      />
      <CompareBarChartCard
        title="7d percent change"
        description="Weekly move comparison when current API response includes it."
        data={change7dData}
        valueType="percent"
      />
    </div>
  );
}
