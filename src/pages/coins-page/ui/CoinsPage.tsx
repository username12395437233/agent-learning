import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCoinsQuery } from '@/entities/coin/api/queries';
import { useCoinFilters } from '@/features/coin-filters/model/useCoinFilters';
import { CoinsTable } from '@/widgets/coins-table/ui/CoinsTable';
import { CoinsTableSkeleton } from '@/widgets/coins-table/ui/CoinsTableSkeleton';

export function CoinsPage() {
  const { data: coins = [], isLoading } = useCoinsQuery();
  const { search, setSearch, category, setCategory, sortBy, setSortBy, categories, filteredCoins } =
    useCoinFilters(coins);

  if (isLoading) {
    return <CoinsTableSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">Coins</h2>
        <p className="text-muted-foreground">
          Search by name, symbol, or tag. Sort by cap, price, move, or rank.
        </p>
      </div>

      <Card className="border-white/70 bg-white/85">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Client-side controls on top of TanStack Query mock data.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search BTC, ETH, rwa, meme..."
          />

          <Select value={category} onValueChange={(value) => setCategory(value as typeof category)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((currentCategory) => (
                <SelectItem key={currentCategory} value={currentCategory}>
                  {currentCategory}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="marketCap">Sort by market cap</SelectItem>
              <SelectItem value="price">Sort by price</SelectItem>
              <SelectItem value="change24h">Sort by 24h move</SelectItem>
              <SelectItem value="rank">Sort by rank</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="border-white/70 bg-white/85">
        <CardHeader>
          <CardTitle>Coin list</CardTitle>
          <CardDescription>{filteredCoins.length} assets matched current filters.</CardDescription>
        </CardHeader>
        <CardContent>
          <CoinsTable coins={filteredCoins} />
        </CardContent>
      </Card>
    </div>
  );
}
