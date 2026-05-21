import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApiStore } from '@/entities/PublicApi/store';
import { useIntegrationStore } from '@/entities/IntegrationRequest/store';
import { TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const { apis, loadApis } = useApiStore();
  const { requests, getApprovedApisCount } = useIntegrationStore();

  useEffect(() => {
    loadApis();
  }, [loadApis]);

  const approvedCount = getApprovedApisCount();
  const pendingRequests = requests.filter((r) => r.status === 'requested').length;

  const topRiskyApis = [...apis]
    .sort((a, b) => b.metrics.riskScore - a.metrics.riskScore)
    .slice(0, 5);

  const topApprovedApis = [...apis]
    .filter((api) => api.metrics.recommendation === 'approved')
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">IntegrationHub Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage, evaluate, and integrate external APIs for your platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total APIs</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apis.length}</div>
            <p className="text-xs text-muted-foreground">Available in catalog</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">Ready to integrate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Pending evaluation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Integration Requests</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.length}</div>
            <p className="text-xs text-muted-foreground">Total requests</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Approved APIs */}
        <Card>
          <CardHeader>
            <CardTitle>✅ Recommended APIs</CardTitle>
            <CardDescription>Low risk, ready for integration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topApprovedApis.length > 0 ? (
                topApprovedApis.map((api) => (
                  <div
                    key={api.id}
                    className="flex items-between justify-between pb-4 border-b last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-sm">{api.name}</p>
                      <p className="text-xs text-muted-foreground">{api.category}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {api.metrics.riskScore.toFixed(0)}% risk
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No approved APIs yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* High Risk APIs */}
        <Card>
          <CardHeader>
            <CardTitle>⚠️ High Risk APIs</CardTitle>
            <CardDescription>Require careful review before integration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRiskyApis.length > 0 ? (
                topRiskyApis.map((api) => (
                  <div
                    key={api.id}
                    className="flex items-between justify-between pb-4 border-b last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-sm">{api.name}</p>
                      <p className="text-xs text-muted-foreground">{api.category}</p>
                    </div>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      {api.metrics.riskScore.toFixed(0)}% risk
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No high risk APIs</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 flex-wrap">
          <Button onClick={() => navigate('/discovery')}>🔍 Explore APIs</Button>
          <Button variant="outline" onClick={() => navigate('/integration-requests')}>
            📋 View Requests
          </Button>
          <Button variant="outline" onClick={() => navigate('/approved-integrations')}>
            ✅ Approved Integrations
          </Button>
          <Button variant="outline" onClick={() => navigate('/compare')}>
            ⚖️ Compare APIs
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
