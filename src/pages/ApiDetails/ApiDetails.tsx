import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApiStore } from '@/entities/PublicApi/store';
import { useIntegrationStore } from '@/entities/IntegrationRequest/store';
import { CheckCircle, AlertTriangle, AlertCircle, ExternalLink, Plus } from 'lucide-react';

export function ApiDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { apis, loadApis } = useApiStore();
  const { addRequest } = useIntegrationStore();

  useEffect(() => {
    if (apis.length === 0) {
      loadApis();
    }
  }, [apis.length, loadApis]);

  const api = apis.find((a) => a.id === id);

  if (!api) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          ← Back
        </Button>
        <div className="text-center py-12">
          <p className="text-muted-foreground">API not found</p>
        </div>
      </div>
    );
  }

  const {
    riskScore,
    complexityScore,
    requiresBackendProxy,
    canUseFromFrontend,
    recommendation,
    notes,
  } = api.metrics;

  const getRecommendationIcon = () => {
    switch (recommendation) {
      case 'approved':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'needs_review':
        return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      case 'not_recommended':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 33) return 'bg-green-100 text-green-900';
    if (score < 67) return 'bg-yellow-100 text-yellow-900';
    return 'bg-red-100 text-red-900';
  };

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)}>
        ← Back to Discovery
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{api.name}</h1>
            {getRecommendationIcon()}
          </div>
          <p className="text-muted-foreground">{api.description}</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            <Badge>{api.category}</Badge>
            {api.https && <Badge variant="outline">HTTPS</Badge>}
            {api.cors && <Badge variant="outline">CORS</Badge>}
            {api.freeTier && <Badge variant="outline">Free Tier</Badge>}
          </div>
        </div>
        <Button
          size="lg"
          onClick={() => {
            addRequest(api.id, api.name);
            navigate('/integration-requests');
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Request Integration
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Metrics */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Integration Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Risk Score */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Risk Score</p>
                <p className={`text-2xl font-bold px-3 py-1 rounded ${getRiskColor(riskScore)}`}>
                  {riskScore.toFixed(0)}%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    riskScore < 33
                      ? 'bg-green-600'
                      : riskScore < 67
                        ? 'bg-yellow-600'
                        : 'bg-red-600'
                  }`}
                  style={{ width: `${riskScore}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {recommendation === 'approved'
                  ? 'Low risk - safe to integrate'
                  : recommendation === 'needs_review'
                    ? 'Medium risk - requires review'
                    : 'High risk - not recommended'}
              </p>
            </div>

            {/* Complexity Score */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Complexity Score</p>
                <p
                  className={`text-2xl font-bold px-3 py-1 rounded ${getRiskColor(complexityScore)}`}
                >
                  {complexityScore.toFixed(0)}%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    complexityScore < 33
                      ? 'bg-blue-600'
                      : complexityScore < 67
                        ? 'bg-purple-600'
                        : 'bg-pink-600'
                  }`}
                  style={{ width: `${complexityScore}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {complexityScore < 33
                  ? 'Simple integration'
                  : complexityScore < 67
                    ? 'Moderate integration effort'
                    : 'Complex integration required'}
              </p>
            </div>

            {/* Key Attributes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted rounded">
                <p className="text-xs text-muted-foreground">Backend Proxy</p>
                <p className="font-semibold">
                  {requiresBackendProxy ? '✅ Required' : '❌ Not Required'}
                </p>
              </div>
              <div className="p-3 bg-muted rounded">
                <p className="text-xs text-muted-foreground">Frontend Compatible</p>
                <p className="font-semibold">{canUseFromFrontend ? '✅ Yes' : '❌ No'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Info Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">API Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Endpoint</p>
              <a
                href={api.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                Visit API <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {api.docs && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Documentation</p>
                <a
                  href={api.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                  Read Docs <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            <div>
              <p className="text-xs text-muted-foreground mb-2">Authentication</p>
              <div className="space-y-1">
                {api.auth.map((auth) => (
                  <Badge key={auth} variant="secondary" className="text-xs">
                    {auth}
                  </Badge>
                ))}
              </div>
            </div>

            {api.rateLimit && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Rate Limit</p>
                <p className="text-sm font-mono bg-muted p-2 rounded">{api.rateLimit}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Notes */}
      {notes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Integration Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {notes.map((note, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-lg leading-none">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
