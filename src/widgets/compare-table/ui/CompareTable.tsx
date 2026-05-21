import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Coin } from '@/entities/coin/model/types';
import { CoinChangeBadge } from '@/entities/coin/ui/CoinChangeBadge';
import { formatCompactCurrency, formatCurrency } from '@/shared/lib/formatters';

interface CompareTableProps {
  coins: Coin[];
}

export function CompareTable({ coins }: CompareTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Metric</TableHead>
          {coins.map((coin) => (
            <TableHead key={coin.id}>{coin.name}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Price</TableCell>
          {coins.map((coin) => (
            <TableCell key={`${coin.id}-price`}>{formatCurrency(coin.price)}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>24h move</TableCell>
          {coins.map((coin) => (
            <TableCell key={`${coin.id}-move`}>
              <CoinChangeBadge change24h={coin.change24h} />
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Market cap</TableCell>
          {coins.map((coin) => (
            <TableCell key={`${coin.id}-market-cap`}>
              {formatCompactCurrency(coin.marketCap)}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>24h volume</TableCell>
          {coins.map((coin) => (
            <TableCell key={`${coin.id}-volume`}>{formatCompactCurrency(coin.volume24h)}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Category</TableCell>
          {coins.map((coin) => (
            <TableCell key={`${coin.id}-category`}>{coin.category}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Risk</TableCell>
          {coins.map((coin) => (
            <TableCell key={`${coin.id}-risk`}>{coin.risk}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Thesis</TableCell>
          {coins.map((coin) => (
            <TableCell
              key={`${coin.id}-thesis`}
              className="whitespace-normal text-muted-foreground"
            >
              {coin.thesis}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}
