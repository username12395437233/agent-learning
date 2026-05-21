import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApiStore } from '@/entities/PublicApi/store';
import { useIntegrationStore } from '@/entities/IntegrationRequest/store';
import type { IntegrationStatus } from '@/shared/types';
import { Trash2, CheckCircle, Clock, XCircle } from 'lucide-react';

export function IntegrationRequests() {
  const { loadApis } = useApiStore();
  const { requests, updateRequestStatus, deleteRequest } = useIntegrationStore();

  useEffect(() => {
    loadApis();
  }, [loadApis]);

  const getStatusIcon = (status: IntegrationStatus) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'in_review':
      case 'requested':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const groupedRequests = {
    requested: requests.filter((r) => r.status === 'requested'),
    in_review: requests.filter((r) => r.status === 'in_review'),
    approved: requests.filter((r) => r.status === 'approved'),
    rejected: requests.filter((r) => r.status === 'rejected'),
    integrated: requests.filter((r) => r.status === 'integrated'),
    deprecated: requests.filter((r) => r.status === 'deprecated'),
  };

  const RequestsSection = ({ title, status }: { title: string; status: IntegrationStatus }) => {
    const items = groupedRequests[status];

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            {getStatusIcon(status)} {title}
          </CardTitle>
          <CardDescription>{items.length} request(s)</CardDescription>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No requests in this status</p>
          ) : (
            <div className="space-y-3">
              {items.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{request.apiName}</p>
                    <p className="text-xs text-muted-foreground">
                      Requested by {request.requestedBy} on{' '}
                      {new Date(request.requestedAt).toLocaleDateString()}
                    </p>
                    {request.reviewedAt && (
                      <p className="text-xs text-muted-foreground">
                        Reviewed by {request.reviewedBy} on{' '}
                        {new Date(request.reviewedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {status === 'requested' && (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateRequestStatus(request.id, 'approved')}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateRequestStatus(request.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </div>
                    )}

                    {(status === 'in_review' || status === 'requested') && (
                      <Button size="sm" variant="ghost" onClick={() => deleteRequest(request.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Integration Requests</h1>
        <p className="text-muted-foreground mt-2">Manage and track all API integration requests</p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{requests.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{groupedRequests['requested'].length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {groupedRequests['approved'].length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Request Sections */}
      <div className="space-y-6">
        <RequestsSection title="Pending Review" status="requested" />
        <RequestsSection title="In Review" status="in_review" />
        <RequestsSection title="Approved" status="approved" />
        <RequestsSection title="Rejected" status="rejected" />
        <RequestsSection title="Integrated" status="integrated" />
        <RequestsSection title="Deprecated" status="deprecated" />
      </div>
    </div>
  );
}
