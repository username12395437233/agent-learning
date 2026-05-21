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
  selectionPanel: ReactNode;
}

export function CompareBoard({
  canCompare,
  charts,
  comparisonTable,
  hasSelection,
  onClearSelection,
  selectionPanel,
}: CompareBoardProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">Compare</h2>
          <p className="text-muted-foreground">
            Persisted compare board for 2-4 coins with direct metric and chart comparison.
          </p>
        </div>
        {hasSelection ? (
          <Button variant="outline" onClick={onClearSelection}>
            Clear compare list
          </Button>
        ) : null}
      </div>

      {selectionPanel}

      {!hasSelection ? (
        <Card className="border-white/70 bg-white/85">
          <CardHeader>
            <CardTitle>No comparison selected</CardTitle>
            <CardDescription>
              Add two or more coins from the compare candidates below to unlock side-by-side
              analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/coins">Browse coins</Link>
            </Button>
          </CardContent>
        </Card>
      ) : canCompare ? (
        <>
          <Card className="border-white/70 bg-white/85">
            <CardHeader>
              <CardTitle>Comparison table</CardTitle>
              <CardDescription>Core market fields across selected coins.</CardDescription>
            </CardHeader>
            <CardContent>{comparisonTable}</CardContent>
          </Card>

          {charts}
        </>
      ) : (
        <Card className="border-white/70 bg-white/85">
          <CardHeader>
            <CardTitle>One more coin needed</CardTitle>
            <CardDescription>
              Select at least two coins to render table and chart comparisons.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
