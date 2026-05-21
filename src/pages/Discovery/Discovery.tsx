import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApiStore } from '@/entities/PublicApi/store';
import { ApiCard } from '@/features/ApiComparison/ApiCard';
import { Search } from 'lucide-react';

export function Discovery() {
  const navigate = useNavigate();
  const {
    loadApis,
    apis,
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    getFilteredApis,
  } = useApiStore();

  useEffect(() => {
    loadApis();
  }, [loadApis]);

  const filteredApis = getFilteredApis();
  const categories = Array.from(new Set(apis.map((api) => api.category)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API Discovery</h1>
        <p className="text-muted-foreground mt-2">Browse, search, and evaluate available APIs</p>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search APIs by name or description..."
              className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div>
            <p className="text-sm font-medium mb-2">Categories</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filterCategory === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterCategory(null)}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filterCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Results */}
      <div>
        <p className="text-sm text-muted-foreground mb-3">
          Found {filteredApis.length} API{filteredApis.length !== 1 ? 's' : ''}
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredApis.map((api) => (
            <div key={api.id} onClick={() => navigate(`/api/${api.id}`)} className="cursor-pointer">
              <ApiCard api={api} />
            </div>
          ))}
        </div>

        {filteredApis.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No APIs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
