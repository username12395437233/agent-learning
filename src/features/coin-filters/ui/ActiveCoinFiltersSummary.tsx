import { Badge } from '@/shared/ui/badge';

interface ActiveCoinFiltersSummaryProps {
  activeFilters: string[];
  totalResults: number;
}

export function ActiveCoinFiltersSummary({
  activeFilters,
  totalResults,
}: ActiveCoinFiltersSummaryProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        {activeFilters.length > 0 ? (
          activeFilters.map((filterLabel) => (
            <Badge key={filterLabel} variant="outline">
              {filterLabel}
            </Badge>
          ))
        ) : (
          <Badge variant="outline">No active filters</Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{totalResults} coins matched</p>
    </div>
  );
}
