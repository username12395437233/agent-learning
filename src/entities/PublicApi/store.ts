import { create } from 'zustand';
import type { PublicApi, IntegrationCandidate } from '@/shared/types';
import { MOCK_PUBLIC_APIS } from '@/shared/api/mockData';
import { calculateApiMetrics } from '@/shared/api/metricsCalculator';

interface ApiStore {
  apis: IntegrationCandidate[];
  selectedApiIds: string[];
  filterCategory: string | null;
  searchQuery: string;

  // Actions
  loadApis: () => void;
  toggleApiSelection: (apiId: string) => void;
  clearSelection: () => void;
  setFilterCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  getFilteredApis: () => IntegrationCandidate[];
  getSelectedApis: () => IntegrationCandidate[];
}

const createApiCandidates = (apis: PublicApi[]): IntegrationCandidate[] => {
  return apis.map((api) => ({
    ...api,
    metrics: calculateApiMetrics(api),
    evaluatedAt: new Date(),
    evaluatedBy: 'System',
  }));
};

export const useApiStore = create<ApiStore>((set, get) => ({
  apis: [],
  selectedApiIds: [],
  filterCategory: null,
  searchQuery: '',

  loadApis: () => {
    const candidates = createApiCandidates(MOCK_PUBLIC_APIS);
    set({ apis: candidates });
  },

  toggleApiSelection: (apiId: string) => {
    set((state) => {
      const isSelected = state.selectedApiIds.includes(apiId);
      return {
        selectedApiIds: isSelected
          ? state.selectedApiIds.filter((id) => id !== apiId)
          : [...state.selectedApiIds, apiId],
      };
    });
  },

  clearSelection: () => {
    set({ selectedApiIds: [] });
  },

  setFilterCategory: (category: string | null) => {
    set({ filterCategory: category });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  getFilteredApis: () => {
    const state = get();
    return state.apis.filter((api) => {
      const matchesSearch =
        api.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        api.description.toLowerCase().includes(state.searchQuery.toLowerCase());

      const matchesCategory = !state.filterCategory || api.category === state.filterCategory;

      return matchesSearch && matchesCategory;
    });
  },

  getSelectedApis: () => {
    const state = get();
    return state.apis.filter((api) => state.selectedApiIds.includes(api.id));
  },
}));
