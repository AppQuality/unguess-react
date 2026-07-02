import {
  Navigate,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import type { EntityPageTabId } from './EntityPageHeader';

/**
 * Redirects a retired standalone entity route (e.g. /campaigns/:id/videos or
 * /hubs/:id/insights) to the canonical entity route with the equivalent
 * `?tab=` query param, merging in any existing query params (filters, etc.)
 * instead of clobbering them. Works for both campaign and hub routes,
 * deriving the prefix from the current path (same pattern as
 * `parseIsHubRoute` in `EntityPageWrapper.tsx`).
 */
export const LegacyEntityTabRedirect = ({ tab }: { tab: EntityPageTabId }) => {
  const { entityId } = useParams<{ entityId: string }>();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const prefix = location.pathname.includes('/hubs/') ? 'hubs' : 'campaigns';
  const entityRoute = useLocalizeRoute(`${prefix}/${entityId}`);

  const nextSearchParams = new URLSearchParams(searchParams);
  nextSearchParams.set('tab', tab);

  return (
    <Navigate to={`${entityRoute}?${nextSearchParams.toString()}`} replace />
  );
};
