import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  type VisibilityState,
  useReactTable,
} from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Coin } from '@/entities/coin/model/types';
import { ActiveCoinFiltersSummary } from '@/features/coin-filters/ui/ActiveCoinFiltersSummary';
import { CoinFiltersSheet } from '@/features/coin-filters/ui/CoinFiltersSheet';
import { CoinSearchInput } from '@/features/coin-search/ui/CoinSearchInput';
import { useCoinTableFilters } from '@/features/coin-filters/model/useCoinTableFilters';
import { useWatchlist } from '@/features/watchlist/model/watchlist-context';
import { createCoinTableColumns } from '@/widgets/coins-table/model/coinTableColumns';

interface AdvancedCoinsTableProps {
  coins: Coin[];
}

export function AdvancedCoinsTable({ coins }: AdvancedCoinsTableProps) {
  const { watchlist } = useWatchlist();
  const [sorting, setSorting] = useState<SortingState>([{ id: 'marketCap', desc: true }]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    category: false,
  });
  const { filters, filteredCoins, activeFilters, hasActiveFilters, updateFilter, resetFilters } =
    useCoinTableFilters(coins, watchlist);

  const columns = useMemo(() => createCoinTableColumns(sorting), [sorting]);

  const table = useReactTable({
    data: filteredCoins,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <CoinSearchInput
          value={filters.search}
          onChange={(value) => updateFilter('search', value)}
        />

        <div className="flex flex-wrap gap-3">
          <CoinFiltersSheet
            filters={filters}
            activeFiltersCount={activeFilters.length}
            onChangeSearch={(value) => updateFilter('search', value)}
            onChangeWatchlistOnly={(value) => updateFilter('watchlistOnly', value)}
            onChangeMarketCapRange={(value) => updateFilter('marketCapRange', value)}
            onChangePriceRange={(value) => updateFilter('priceRange', value)}
            onChangeDirection={(value) => updateFilter('changeDirection', value)}
            onReset={resetFilters}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Eye className="size-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(Boolean(value))}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {hasActiveFilters ? (
            <Button variant="outline" onClick={resetFilters}>
              Reset filters
            </Button>
          ) : null}
        </div>
      </div>

      <ActiveCoinFiltersSummary activeFilters={activeFilters} totalResults={filteredCoins.length} />

      <div className="rounded-2xl border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="h-32 text-center">
                  <div className="space-y-2">
                    <p className="font-medium">No coins match current filters.</p>
                    <p className="text-sm text-muted-foreground">
                      Adjust search, sheet filters, or reset everything.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
