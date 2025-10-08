import { useEffect, useMemo } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { usePatchPlansByPidStatusMutation } from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

export const useSetDraftOnFailed = () => {
  const { planId } = useParams();
  const [, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();
  const isPaymentFailed = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('payment') === 'failed' && !!planId;
  }, [location.search, planId]);
  const notFoundRoute = useLocalizeRoute('oops');
  const [patchStatus, { isLoading }] = usePatchPlansByPidStatusMutation({
    fixedCacheKey: 'shared-update-plan-status',
  });

  useEffect(() => {
    const run = () => {
      if (!isPaymentFailed) return;

      patchStatus({
        pid: String(planId ?? ''),
        body: { status: 'draft' },
      })
        .unwrap()
        .then(() => {
          // rimuovi il parametro senza mutare l'oggetto esistente
          setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.delete('payment');
            return next;
          });
          navigate(location.pathname, { replace: true });
        })
        .catch((err) => {
          console.error(
            'Error updating plan status after payment failure',
            err
          );
          navigate(notFoundRoute, { state: { from: location.pathname } });
        });
    };

    const onPageShow = () => {
      run();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') run();
    };

    window.addEventListener('pageshow', onPageShow);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('pageshow', onPageShow);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [isPaymentFailed, planId, location.pathname, navigate, setSearchParams]);

  return { isLoading };
};
