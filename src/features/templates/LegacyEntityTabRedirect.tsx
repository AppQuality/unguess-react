import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import type { EntityPageTabId } from './EntityPageHeader';

/**
 * Redirects a retired standalone campaign route (e.g. /campaigns/:id/videos)
 * to the canonical entity route with the equivalent `?tab=` query param,
 * merging in any existing query params (filters, etc.) instead of clobbering
 * them. Campaign-only — hub routes still render their standalone pages
 * (UN-2897).
 */
export const LegacyEntityTabRedirect = ({ tab }: { tab: EntityPageTabId }) => {
  const { entityId } = useParams<{ entityId: string }>();
  const [searchParams] = useSearchParams();
  const entityRoute = useLocalizeRoute(`campaigns/${entityId}`);

  const nextSearchParams = new URLSearchParams(searchParams);
  nextSearchParams.set('tab', tab);

  return (
    <Navigate to={`${entityRoute}?${nextSearchParams.toString()}`} replace />
  );
};
