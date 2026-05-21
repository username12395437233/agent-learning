import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

interface CompareBoardProps {
  canCompare: boolean;
  charts: ReactNode;
  comparisonTable: ReactNode;
  hasSelection: boolean;
  onClearSelection: () => void;
  selectedCount: number;
}

export function CompareBoard({
  canCompare,
  charts,
  comparisonTable,
  hasSelection,
  onClearSelection,
  selectedCount,
}: CompareBoardProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">Compare</h2>
          <p className="text-muted-foreground">
            Stored in localStorage. Add coins from market table to compare them here.
          </p>
        </div>
        {hasSelection ? (
          <Button variant="outline" onClick={onClearSelection}>
            Clear compare list
          </Button>
        ) : null}
      </div>

      {!hasSelection ? (
        <Card className="border-white/70 bg-white/85">
          <CardHeader>
            <CardTitle>No comparison selected</CardTitle>
            <CardDescription>
              Add coins from the Coins page to start building a comparison list.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/coins">Browse coins</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="border-white/70 bg-white/85">
            <CardHeader>
              <CardTitle>Selected names</CardTitle>
              <CardDescription>
                {selectedCount} coins in current browser compare list.
              </CardDescription>
            </CardHeader>
            <CardContent>{comparisonTable}</CardContent>
          </Card>

          {canCompare ? (
            charts
          ) : (
            <Card className="border-white/70 bg-white/85">
              <CardHeader>
                <CardTitle>One more coin needed</CardTitle>
                <CardDescription>
                  Add another coin from the Coins page to render chart comparisons.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
