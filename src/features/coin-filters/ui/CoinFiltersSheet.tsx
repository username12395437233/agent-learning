import { SlidersHorizontal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CoinSearchInput } from '@/features/coin-search/ui/CoinSearchInput';
import type { CoinTableFilters } from '@/features/coin-filters/model/types';

interface CoinFiltersSheetProps {
  filters: CoinTableFilters;
  activeFiltersCount: number;
  onChangeSearch: (value: string) => void;
  onChangeWatchlistOnly: (value: boolean) => void;
  onChangeMarketCapRange: (value: CoinTableFilters['marketCapRange']) => void;
  onChangePriceRange: (value: CoinTableFilters['priceRange']) => void;
  onChangeDirection: (value: CoinTableFilters['changeDirection']) => void;
  onReset: () => void;
}

export function CoinFiltersSheet({
  filters,
  activeFiltersCount,
  onChangeSearch,
  onChangeWatchlistOnly,
  onChangeMarketCapRange,
  onChangePriceRange,
  onChangeDirection,
  onReset,
}: CoinFiltersSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal className="size-4" />
          Filters
          {activeFiltersCount > 0 ? <Badge className="ml-1">{activeFiltersCount}</Badge> : null}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xl overflow-y-auto p-0 sm:max-w-xl">
        <SheetHeader className="border-b">
          <SheetTitle>Coins filters</SheetTitle>
          <SheetDescription>
            Narrow market list by search, watchlist, price, market cap, and 24h performance.
          </SheetDescription>
        </SheetHeader>

        <div className="p-4">
          <Tabs defaultValue="general" className="gap-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="market">Market</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">Search</p>
                <CoinSearchInput value={filters.search} onChange={onChangeSearch} />
              </div>

              <div className="flex items-center gap-3 rounded-2xl border p-4">
                <Checkbox
                  id="watchlist-only-filter"
                  checked={filters.watchlistOnly}
                  onCheckedChange={(checked) => onChangeWatchlistOnly(Boolean(checked))}
                />
                <label htmlFor="watchlist-only-filter" className="cursor-pointer">
                  <p className="text-sm font-medium">Watchlist only</p>
                  <p className="text-xs text-muted-foreground">
                    Show only coins already pinned to watchlist.
                  </p>
                </label>
              </div>
            </TabsContent>

            <TabsContent value="market" className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">Market cap range</p>
                <Select value={filters.marketCapRange} onValueChange={onChangeMarketCapRange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select market cap range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All market caps</SelectItem>
                    <SelectItem value="large">Large cap</SelectItem>
                    <SelectItem value="mid">Mid cap</SelectItem>
                    <SelectItem value="low">Low cap</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Price range</p>
                <Select value={filters.priceRange} onValueChange={onChangePriceRange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All prices</SelectItem>
                    <SelectItem value="under-1">Under $1</SelectItem>
                    <SelectItem value="1-to-100">$1-$100</SelectItem>
                    <SelectItem value="over-100">Over $100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">24h change</p>
                <Select value={filters.changeDirection} onValueChange={onChangeDirection}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select performance filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All changes</SelectItem>
                    <SelectItem value="positive">Positive only</SelectItem>
                    <SelectItem value="negative">Negative only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <SheetFooter className="border-t">
          <Button variant="outline" onClick={onReset}>
            Reset filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
