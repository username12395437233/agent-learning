import type { IntegrationCandidate } from '@/shared/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApiCardProps {
  api: IntegrationCandidate;
  onSelect?: (apiId: string) => void;
  isSelected?: boolean;
}

export function ApiCard({ api, onSelect, isSelected }: ApiCardProps) {
  const { riskScore, complexityScore, recommendation } = api.metrics;

  const getRiskColor = (score: number) => {
    if (score < 33) return 'text-green-600';
    if (score < 67) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRecommendationIcon = () => {
    switch (recommendation) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'needs_review':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'not_recommended':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:shadow-lg',
        isSelected && 'ring-2 ring-blue-500',
      )}
      onClick={() => onSelect?.(api.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-base">{api.name}</CardTitle>
            <CardDescription className="text-xs mt-1">{api.category}</CardDescription>
          </div>
          {getRecommendationIcon()}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{api.description}</p>

        <div className="flex gap-2 flex-wrap">
          {api.https && (
            <Badge variant="outline" className="text-xs">
              HTTPS
            </Badge>
          )}
          {api.cors && (
            <Badge variant="outline" className="text-xs">
              CORS
            </Badge>
          )}
          {api.freeTier && (
            <Badge variant="outline" className="text-xs">
              Free
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-muted-foreground">Risk</p>
            <p className={cn('font-semibold', getRiskColor(riskScore))}>{riskScore.toFixed(0)}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Complexity</p>
            <p className={cn('font-semibold', getRiskColor(complexityScore))}>
              {complexityScore.toFixed(0)}%
            </p>
          </div>
        </div>

        {onSelect && (
          <Button
            size="sm"
            variant={isSelected ? 'default' : 'outline'}
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(api.id);
            }}
          >
            {isSelected ? 'Selected' : 'Select'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
