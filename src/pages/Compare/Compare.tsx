import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApiStore } from '@/entities/PublicApi/store';
import { ApiCard } from '@/features/ApiComparison/ApiCard';
import { Check, X } from 'lucide-react';

export function Compare() {
  const navigate = useNavigate();
  const { apis, loadApis, toggleApiSelection, getSelectedApis, selectedApiIds, clearSelection } =
    useApiStore();

  useEffect(() => {
    if (apis.length === 0) {
      loadApis();
    }
  }, [apis.length, loadApis]);

  const selectedApis = getSelectedApis();

  if (selectedApis.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Comparison</h1>
          <p className="text-muted-foreground mt-2">
            Select APIs to compare their characteristics and metrics
          </p>
        </div>

        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="text-muted-foreground mb-4">
            Select at least 2 APIs to compare them side-by-side
          </p>
          <Button onClick={() => navigate('/discovery')}>Browse APIs</Button>
        </div>

        {/* Selection Grid */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Available APIs</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {apis.slice(0, 12).map((api) => (
              <ApiCard
                key={api.id}
                api={api}
                onSelect={toggleApiSelection}
                isSelected={selectedApiIds.includes(api.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Comparison</h1>
          <p className="text-muted-foreground mt-2">
            Comparing {selectedApis.length} API{selectedApis.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button variant="outline" onClick={clearSelection}>
          Clear Selection
        </Button>
      </div>

      {/* Comparison Table */}
      <Card className="overflow-x-auto">
        <CardContent className="pt-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4 font-semibold">Attribute</th>
                {selectedApis.map((api) => (
                  <th key={api.id} className="text-left py-2 px-4 font-semibold">
                    {api.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Name */}
              <tr className="border-b hover:bg-muted/50">
                <td className="py-3 px-4 font-medium">Category</td>
                {selectedApis.map((api) => (
                  <td key={api.id} className="py-3 px-4">
                    {api.category}
                  </td>
                ))}
              </tr>

              {/* HTTPS */}
              <tr className="border-b hover:bg-muted/50">
                <td className="py-3 px-4 font-medium">HTTPS</td>
                {selectedApis.map((api) => (
                  <td key={api.id} className="py-3 px-4">
                    {api.https ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </td>
                ))}
              </tr>

              {/* CORS */}
              <tr className="border-b hover:bg-muted/50">
                <td className="py-3 px-4 font-medium">CORS</td>
                {selectedApis.map((api) => (
                  <td key={api.id} className="py-3 px-4">
                    {api.cors ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </td>
                ))}
              </tr>

              {/* Free Tier */}
              <tr className="border-b hover:bg-muted/50">
                <td className="py-3 px-4 font-medium">Free Tier</td>
                {selectedApis.map((api) => (
                  <td key={api.id} className="py-3 px-4">
                    {api.freeTier ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </td>
                ))}
              </tr>

              {/* Risk Score */}
              <tr className="border-b hover:bg-muted/50">
                <td className="py-3 px-4 font-medium">Risk Score</td>
                {selectedApis.map((api) => (
                  <td key={api.id} className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        api.metrics.riskScore < 33
                          ? 'bg-green-100 text-green-900'
                          : api.metrics.riskScore < 67
                            ? 'bg-yellow-100 text-yellow-900'
                            : 'bg-red-100 text-red-900'
                      }`}
                    >
                      {api.metrics.riskScore.toFixed(0)}%
                    </span>
                  </td>
                ))}
              </tr>

              {/* Complexity Score */}
              <tr className="border-b hover:bg-muted/50">
                <td className="py-3 px-4 font-medium">Complexity Score</td>
                {selectedApis.map((api) => (
                  <td key={api.id} className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        api.metrics.complexityScore < 33
                          ? 'bg-blue-100 text-blue-900'
                          : api.metrics.complexityScore < 67
                            ? 'bg-purple-100 text-purple-900'
                            : 'bg-pink-100 text-pink-900'
                      }`}
                    >
                      {api.metrics.complexityScore.toFixed(0)}%
                    </span>
                  </td>
                ))}
              </tr>

              {/* Backend Proxy */}
              <tr className="border-b hover:bg-muted/50">
                <td className="py-3 px-4 font-medium">Requires Backend</td>
                {selectedApis.map((api) => (
                  <td key={api.id} className="py-3 px-4">
                    {api.metrics.requiresBackendProxy ? (
                      <span className="text-xs bg-yellow-100 text-yellow-900 px-2 py-1 rounded">
                        Required
                      </span>
                    ) : (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                  </td>
                ))}
              </tr>

              {/* Frontend Compatible */}
              <tr className="hover:bg-muted/50">
                <td className="py-3 px-4 font-medium">Frontend Compatible</td>
                {selectedApis.map((api) => (
                  <td key={api.id} className="py-3 px-4">
                    {api.metrics.canUseFromFrontend ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </td>
                ))}
              </tr>

              {/* Recommendation */}
              <tr className="hover:bg-muted/50">
                <td className="py-3 px-4 font-medium">Recommendation</td>
                {selectedApis.map((api) => (
                  <td key={api.id} className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        api.metrics.recommendation === 'approved'
                          ? 'bg-green-100 text-green-900'
                          : api.metrics.recommendation === 'needs_review'
                            ? 'bg-yellow-100 text-yellow-900'
                            : 'bg-red-100 text-red-900'
                      }`}
                    >
                      {api.metrics.recommendation.replace('_', ' ')}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Selection Grid for modification */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Modify Selection</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {apis.map((api) => (
            <ApiCard
              key={api.id}
              api={api}
              onSelect={toggleApiSelection}
              isSelected={selectedApiIds.includes(api.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
