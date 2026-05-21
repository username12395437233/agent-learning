import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Coin } from '@/entities/coin/model/types';
import { CoinChangeBadge } from '@/entities/coin/ui/CoinChangeBadge';
import { WatchlistToggleButton } from '@/features/watchlist/ui/WatchlistToggleButton';
import { formatCompactCurrency, formatCurrency } from '@/shared/lib/formatters';

function SortIcon({ direction }: { direction: false | 'asc' | 'desc' }) {
  if (direction === 'asc') {
    return <ArrowUp className="size-4" />;
  }

  if (direction === 'desc') {
    return <ArrowDown className="size-4" />;
  }

  return <ArrowUpDown className="size-4" />;
}

function SortableHeader({
  label,
  direction,
  onClick,
}: {
  label: string;
  direction: false | 'asc' | 'desc';
  onClick: () => void;
}) {
  return (
    <Button variant="ghost" className="-ml-3 h-8 px-3" onClick={onClick}>
      {label}
      <SortIcon direction={direction} />
    </Button>
  );
}

export function createCoinTableColumns(sorting: SortingState): ColumnDef<Coin>[] {
  const currentSort = sorting[0];

  return [
    {
      accessorKey: 'rank',
      header: ({ column }) => (
        <SortableHeader
          label="Rank"
          direction={currentSort?.id === 'rank' ? (currentSort.desc ? 'desc' : 'asc') : false}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      ),
      cell: ({ row }) => <span className="font-medium">#{row.original.rank}</span>,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <SortableHeader
          label="Name"
          direction={currentSort?.id === 'name' ? (currentSort.desc ? 'desc' : 'asc') : false}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      ),
      cell: ({ row }) => {
        const coin = row.original;

        return (
          <div className="min-w-[220px]">
            <Link to={`/coins/${coin.id}`} className="flex items-start justify-between gap-3">
              <div className="flex flex-col">
                <span className="font-medium">{coin.name}</span>
                <span className="text-xs text-muted-foreground">{coin.symbol}</span>
              </div>
              <ExternalLink className="mt-0.5 size-4 text-muted-foreground" />
            </Link>
          </div>
        );
      },
      enableHiding: false,
    },
    {
      accessorKey: 'price',
      header: ({ column }) => (
        <SortableHeader
          label="Price"
          direction={currentSort?.id === 'price' ? (currentSort.desc ? 'desc' : 'asc') : false}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      ),
      cell: ({ row }) => formatCurrency(row.original.price),
    },
    {
      accessorKey: 'marketCap',
      header: ({ column }) => (
        <SortableHeader
          label="Market cap"
          direction={currentSort?.id === 'marketCap' ? (currentSort.desc ? 'desc' : 'asc') : false}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      ),
      cell: ({ row }) => formatCompactCurrency(row.original.marketCap),
    },
    {
      accessorKey: 'volume24h',
      header: ({ column }) => (
        <SortableHeader
          label="Volume 24h"
          direction={currentSort?.id === 'volume24h' ? (currentSort.desc ? 'desc' : 'asc') : false}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      ),
      cell: ({ row }) => formatCompactCurrency(row.original.volume24h),
    },
    {
      accessorKey: 'change24h',
      header: ({ column }) => (
        <SortableHeader
          label="24h"
          direction={currentSort?.id === 'change24h' ? (currentSort.desc ? 'desc' : 'asc') : false}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      ),
      cell: ({ row }) => <CoinChangeBadge change24h={row.original.change24h} />,
    },
    {
      accessorKey: 'change7d',
      sortingFn: (leftRow, rightRow) => {
        const leftValue = leftRow.original.change7d ?? Number.NEGATIVE_INFINITY;
        const rightValue = rightRow.original.change7d ?? Number.NEGATIVE_INFINITY;

        return leftValue > rightValue ? 1 : leftValue < rightValue ? -1 : 0;
      },
      header: ({ column }) => (
        <SortableHeader
          label="7d"
          direction={currentSort?.id === 'change7d' ? (currentSort.desc ? 'desc' : 'asc') : false}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      ),
      cell: ({ row }) =>
        row.original.change7d !== undefined ? (
          <CoinChangeBadge change24h={row.original.change7d} />
        ) : (
          <span className="text-muted-foreground">-</span>
        ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => <Badge variant="outline">{row.original.category}</Badge>,
    },
    {
      id: 'watchlist',
      header: 'Watchlist',
      cell: ({ row }) => <WatchlistToggleButton coinId={row.original.id} />,
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
