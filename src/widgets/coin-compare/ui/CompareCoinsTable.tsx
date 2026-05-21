import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import type { Coin } from '@/entities/coin';
import { CoinChangeBadge } from '@/entities/coin';
import { formatCompactCurrency, formatCurrency } from '@/shared/lib/formatters';

interface CompareCoinsTableProps {
  coins: Coin[];
}

export function CompareCoinsTable({ coins }: CompareCoinsTableProps) {
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
          <TableCell>Rank</TableCell>
          {coins.map((coin) => (
            <TableCell key={`${coin.id}-rank`}>#{coin.rank}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Price</TableCell>
          {coins.map((coin) => (
            <TableCell key={`${coin.id}-price`}>{formatCurrency(coin.price)}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>24h change</TableCell>
          {coins.map((coin) => (
            <TableCell key={`${coin.id}-change-24h`}>
              <CoinChangeBadge change24h={coin.change24h} />
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>7d change</TableCell>
          {coins.map((coin) => (
            <TableCell key={`${coin.id}-change-7d`}>
              {coin.change7d !== undefined ? (
                <CoinChangeBadge change24h={coin.change7d} />
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
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
            <TableCell key={`${coin.id}-volume-24h`}>
              {formatCompactCurrency(coin.volume24h)}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Circulating supply</TableCell>
          {coins.map((coin) => (
            <TableCell key={`${coin.id}-supply`}>
              {coin.circulatingSupply.toLocaleString()}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}
