import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCompactCurrency, formatPercent } from '@/shared/lib/formatters';

interface CompareBarChartCardDatum {
  name: string;
  symbol: string;
  value: number;
}

interface CompareBarChartCardProps {
  title: string;
  description: string;
  data: CompareBarChartCardDatum[];
  valueType: 'currency' | 'percent' | 'number';
}

function formatValue(value: number, valueType: CompareBarChartCardProps['valueType']) {
  switch (valueType) {
    case 'percent':
      return formatPercent(value);
    case 'number':
      return value.toLocaleString();
    case 'currency':
    default:
      return formatCompactCurrency(value);
  }
}

export function CompareBarChartCard({
  title,
  description,
  data,
  valueType,
}: CompareBarChartCardProps) {
  return (
    <Card className="border-white/70 bg-white/85">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="symbol" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={80} />
            <Tooltip
              formatter={(value) => formatValue(Number(value ?? 0), valueType)}
              labelFormatter={(_, payload) => payload?.[0]?.payload?.name ?? ''}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="var(--color-chart-2)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
