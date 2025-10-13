import { Notification, useToast } from '@appquality/unguess-design-system';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
  const [patchStatus, { isLoading }] = usePatchPlansByPidStatusMutation();
  const { addToast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const run = () => {
      if (!isPaymentFailed) return;

      patchStatus({
        pid: String(planId ?? ''),
        body: { status: 'draft' },
      })
        .unwrap()
        .then(() => {
          setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.delete('payment');
            return next;
          });
          navigate(location.pathname, { replace: true });
          addToast(
            ({ close }) => (
              <Notification
                onClose={close}
                type="info"
                message={t('__PLAN_PAGE_PAYMENT_FAILED_TOAST_MESSAGE')}
                closeText={t('__TOAST_CLOSE_TEXT')}
                isPrimary
              />
            ),
            { placement: 'top' }
          );
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
