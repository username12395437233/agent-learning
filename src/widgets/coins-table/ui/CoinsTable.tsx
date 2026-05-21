import { Link } from 'react-router-dom';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import type { Coin } from '@/entities/coin';
import { CoinChangeBadge } from '@/entities/coin';
import { WatchlistToggleButton } from '@/features/watchlist';
import { formatCompactCurrency, formatCurrency } from '@/shared/lib/formatters';

interface CoinsTableProps {
  coins: Coin[];
  showWatchlistAction?: boolean;
}

export function CoinsTable({ coins, showWatchlistAction = true }: CoinsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Coin</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>24h</TableHead>
          <TableHead>Market cap</TableHead>
          <TableHead>Volume</TableHead>
          <TableHead>Category</TableHead>
          {showWatchlistAction ? <TableHead className="text-right">Action</TableHead> : null}
        </TableRow>
      </TableHeader>
      <TableBody>
        {coins.map((coin) => (
          <TableRow key={coin.id}>
            <TableCell>
              <Link to={`/coins/${coin.id}`} className="flex flex-col">
                <span className="font-medium">{coin.name}</span>
                <span className="text-xs text-muted-foreground">
                  {coin.symbol} · #{coin.rank}
                </span>
              </Link>
            </TableCell>
            <TableCell>{formatCurrency(coin.price)}</TableCell>
            <TableCell>
              <CoinChangeBadge change24h={coin.change24h} />
            </TableCell>
            <TableCell>{formatCompactCurrency(coin.marketCap)}</TableCell>
            <TableCell>{formatCompactCurrency(coin.volume24h)}</TableCell>
            <TableCell>{coin.category}</TableCell>
            {showWatchlistAction ? (
              <TableCell className="text-right">
                <div className="flex justify-end">
                  <WatchlistToggleButton coinId={coin.id} />
                </div>
              </TableCell>
            ) : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
