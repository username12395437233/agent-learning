export type AuthType = 'none' | 'apiKey' | 'oauth2' | 'basic' | 'bearerToken' | 'custom';

export type ApiCategory =
  | 'Weather'
  | 'Finance'
  | 'Social Media'
  | 'Geolocation'
  | 'Blockchain'
  | 'Payment'
  | 'Email'
  | 'SMS'
  | 'Mapping'
  | 'Analytics'
  | 'CRM'
  | 'Translation'
  | 'NLP'
  | 'Image Recognition'
  | 'News'
  | 'Cryptocurrency'
  | 'Exchange Rates'
  | 'Sports'
  | 'Movies'
  | 'Music';

export interface PublicApi {
  id: string;
  name: string;
  description: string;
  category: ApiCategory;
  url: string;
  docs?: string;
  auth: AuthType[];
  https: boolean;
  cors: boolean;
  rateLimit?: string;
  freeTier: boolean;
}

export interface ApiMetrics {
  riskScore: number; // 0-100
  complexityScore: number; // 0-100
  requiresBackendProxy: boolean;
  canUseFromFrontend: boolean;
  recommendation: 'approved' | 'needs_review' | 'not_recommended';
  notes: string[];
}

export interface IntegrationCandidate extends PublicApi {
  metrics: ApiMetrics;
  evaluatedAt: Date;
  evaluatedBy: string;
}

export type IntegrationStatus =
  | 'requested'
  | 'in_review'
  | 'approved'
  | 'rejected'
  | 'integrated'
  | 'deprecated';

export interface IntegrationRequest {
  id: string;
  apiId: string;
  apiName: string;
  requestedAt: Date;
  requestedBy: string;
  status: IntegrationStatus;
  notes?: string;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export interface RiskPolicy {
  id: string;
  name: string;
  description: string;
  rules: {
    maxRiskScore: number;
    allowedAuthTypes: AuthType[];
    requireHttps: boolean;
    requireRateLimit: boolean;
  };
}
