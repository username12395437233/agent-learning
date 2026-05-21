import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApiStore } from '@/entities/PublicApi/store';
import { useIntegrationStore } from '@/entities/IntegrationRequest/store';
import { ExternalLink, CheckCircle } from 'lucide-react';

export function ApprovedIntegrations() {
  const navigate = useNavigate();
  const { apis, loadApis } = useApiStore();
  const { requests } = useIntegrationStore();

  useEffect(() => {
    loadApis();
  }, [loadApis]);

  const approvedRequests = requests.filter((r) => r.status === 'approved');
  const approvedApiIds = new Set(approvedRequests.map((r) => r.apiId));
  const approvedApis = apis.filter((api) => approvedApiIds.has(api.id));

  const recommendedApis = apis.filter(
    (api) => api.metrics.recommendation === 'approved' && !approvedApiIds.has(api.id),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Approved Integrations</h1>
        <p className="text-muted-foreground mt-2">
          APIs that have been evaluated and approved for integration
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{approvedApis.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total APIs Evaluated</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{apis.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Adoption Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {apis.length > 0 ? ((approvedApis.length / apis.length) * 100).toFixed(0) : 0}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Currently Approved Integrations */}
      {approvedApis.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>✅ Currently Approved</CardTitle>
            <CardDescription>APIs ready for use in production</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {approvedApis.map((api) => {
                const request = approvedRequests.find((r) => r.apiId === api.id);
                return (
                  <div
                    key={api.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <h3 className="font-semibold">{api.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{api.description}</p>
                      <div className="flex gap-2 flex-wrap mb-2">
                        <Badge className="text-xs">{api.category}</Badge>
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
                      </div>
                      {request && (
                        <p className="text-xs text-muted-foreground">
                          Approved on{' '}
                          {new Date(request.reviewedAt || request.requestedAt).toLocaleDateString()}{' '}
                          by {request.reviewedBy}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/api/${api.id}`)}
                      >
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={api.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommended for Approval */}
      {recommendedApis.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>💡 Recommended for Approval</CardTitle>
            <CardDescription>Low risk APIs that are ready to be integrated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendedApis.slice(0, 5).map((api) => (
                <div
                  key={api.id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{api.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{api.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className="text-xs">{api.category}</Badge>
                      <Badge className="text-xs bg-green-100 text-green-900">
                        Risk: {api.metrics.riskScore.toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => navigate(`/api/${api.id}`)}>
                    Review & Request
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {approvedApis.length === 0 && (
        <Card>
          <CardContent className="pt-12 text-center">
            <p className="text-muted-foreground mb-4">
              No APIs have been approved yet. Start by exploring and requesting APIs.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate('/discovery')}>Browse APIs</Button>
              <Button variant="outline" onClick={() => navigate('/integration-requests')}>
                View Requests
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
