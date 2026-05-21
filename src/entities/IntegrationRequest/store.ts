import { create } from 'zustand';
import type { IntegrationRequest, IntegrationStatus } from '@/shared/types';
import { v4 as uuid } from 'uuid';

interface IntegrationStore {
  requests: IntegrationRequest[];
  approvedApis: string[];

  // Actions
  addRequest: (apiId: string, apiName: string) => void;
  updateRequestStatus: (requestId: string, status: IntegrationStatus, reviewedBy?: string) => void;
  deleteRequest: (requestId: string) => void;
  getRequestsByStatus: (status: IntegrationStatus) => IntegrationRequest[];
  getApprovedApisCount: () => number;
  getRequestsCount: () => number;
}

export const useIntegrationStore = create<IntegrationStore>((set, get) => ({
  requests: [],
  approvedApis: [],

  addRequest: (apiId: string, apiName: string) => {
    const newRequest: IntegrationRequest = {
      id: uuid(),
      apiId,
      apiName,
      requestedAt: new Date(),
      requestedBy: 'Current User',
      status: 'requested',
    };

    set((state) => ({
      requests: [...state.requests, newRequest],
    }));
  },

  updateRequestStatus: (requestId: string, status: IntegrationStatus, reviewedBy) => {
    set((state) => ({
      requests: state.requests.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status,
              reviewedAt: new Date(),
              reviewedBy: reviewedBy || 'System',
            }
          : req,
      ),
      approvedApis:
        status === 'approved'
          ? [
              ...state.approvedApis,
              state.requests.find((r) => r.id === requestId)?.apiId || '',
            ].filter(Boolean)
          : state.approvedApis,
    }));
  },

  deleteRequest: (requestId: string) => {
    set((state) => ({
      requests: state.requests.filter((req) => req.id !== requestId),
    }));
  },

  getRequestsByStatus: (status: IntegrationStatus) => {
    const state = get();
    return state.requests.filter((req) => req.status === status);
  },

  getApprovedApisCount: () => {
    const state = get();
    return state.requests.filter((req) => req.status === 'approved').length;
  },

  getRequestsCount: () => {
    const state = get();
    return state.requests.length;
  },
}));
