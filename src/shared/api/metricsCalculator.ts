import type { PublicApi, ApiMetrics, AuthType } from '@/shared/types';

export function calculateApiMetrics(api: PublicApi): ApiMetrics {
  const riskScore = calculateRiskScore(api);
  const complexityScore = calculateComplexityScore(api);
  const requiresBackendProxy = !api.cors;
  const canUseFromFrontend = api.cors && !hasComplexAuth(api.auth);
  const recommendation = determineRecommendation(riskScore, complexityScore, canUseFromFrontend);
  const notes = generateNotes(api, riskScore, complexityScore, requiresBackendProxy);

  return {
    riskScore,
    complexityScore,
    requiresBackendProxy,
    canUseFromFrontend,
    recommendation,
    notes,
  };
}

function calculateRiskScore(api: PublicApi): number {
  let score = 0;

  // CORS risk (40 points max)
  if (!api.cors) {
    score += 40;
  }

  // HTTPS requirement (20 points)
  if (!api.https) {
    score += 20;
  }

  // Auth complexity (25 points max)
  if (api.auth.includes('none')) {
    score += 0;
  } else if (api.auth.includes('apiKey') || api.auth.includes('basic')) {
    score += 10;
  } else if (api.auth.includes('oauth2') || api.auth.includes('bearerToken')) {
    score += 20;
  } else if (api.auth.includes('custom')) {
    score += 25;
  }

  // Rate limiting concern (15 points)
  if (api.rateLimit && isStrictRateLimit(api.rateLimit)) {
    score += 15;
  }

  return Math.min(score, 100);
}

function calculateComplexityScore(api: PublicApi): number {
  let score = 0;

  // Auth types variety (30 points max)
  score += Math.min(api.auth.length * 10, 30);

  // CORS support (15 points)
  if (!api.cors) {
    score += 15;
  }

  // Rate limiting complexity (25 points)
  if (api.rateLimit) {
    if (isStrictRateLimit(api.rateLimit)) {
      score += 25;
    } else if (api.rateLimit.includes('day') || api.rateLimit.includes('month')) {
      score += 15;
    } else if (api.rateLimit.includes('min') || api.rateLimit.includes('sec')) {
      score += 10;
    }
  }

  // Documentation complexity (10 points)
  if (!api.docs) {
    score += 10;
  }

  // Free tier availability (10 points reduction)
  if (api.freeTier) {
    score -= 10;
  }

  return Math.max(Math.min(score, 100), 0);
}

function hasComplexAuth(authTypes: AuthType[]): boolean {
  return authTypes.some((auth) => auth === 'custom' || auth === 'oauth2');
}

function isStrictRateLimit(rateLimit: string): boolean {
  const strictPatterns = [
    /\b[0-5]\s*(calls?|requests?|req)\/sec/i,
    /\b(1|2|3|4|5|10)\s*(calls?|requests?|req)\/min/i,
    /\d+\s*(calls?|requests?|req)\/hour/i,
  ];
  return strictPatterns.some((pattern) => pattern.test(rateLimit));
}

function determineRecommendation(
  riskScore: number,
  complexityScore: number,
  canUseFromFrontend: boolean,
): 'approved' | 'needs_review' | 'not_recommended' {
  if (riskScore > 70 || complexityScore > 75) {
    return 'not_recommended';
  }

  if (riskScore > 50 || complexityScore > 50) {
    return 'needs_review';
  }

  return 'approved';
}

function generateNotes(
  api: PublicApi,
  riskScore: number,
  complexityScore: number,
  requiresBackendProxy: boolean,
): string[] {
  const notes: string[] = [];

  if (!api.https) {
    notes.push('⚠️ Does not support HTTPS - security concern');
  }

  if (requiresBackendProxy) {
    notes.push('🔄 Requires backend proxy due to CORS restrictions');
  }

  if (api.auth.includes('oauth2')) {
    notes.push('🔐 Requires OAuth 2.0 authentication - complex setup');
  }

  if (isStrictRateLimit(api.rateLimit || '')) {
    notes.push('⏱️ Strict rate limits - may cause performance issues');
  }

  if (!api.freeTier) {
    notes.push('💰 No free tier available');
  }

  if (riskScore > 70) {
    notes.push('🚨 High risk - requires thorough security review');
  }

  if (complexityScore > 75) {
    notes.push('🔧 High complexity - significant development effort needed');
  }

  return notes;
}
