import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { PLAN_MINIMUM_DATE } from 'src/constants';
import {
  useGetPlansByPidQuery,
  usePatchPlansByPidStatusMutation,
} from 'src/features/api';
import { FormProvider } from 'src/features/modules/FormProvider';
import { FormBody } from 'src/features/modules/types';
import { Page } from 'src/features/templates/Page';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { PlanProvider } from './context/planContext';
import { PlanPageContent } from './PlanPageContent';
import { formatModuleDate } from './utils/formatModuleDate';
import { useSetActiveWorkspace } from './utils/useSetActiveWorkspace';

const Plan = () => {
  const { activeWorkspace } = useActiveWorkspace();
  const navigate = useNavigate();
  const location = useLocation();
  const { planId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const isPaymentFailed = searchParams.get('payment') === 'failed' && !!planId;
  const [patchStatus, { isLoading }] = usePatchPlansByPidStatusMutation();
  const { t } = useTranslation();
  const { isError, data: plan } = useGetPlansByPidQuery(
    {
      pid: Number(planId).toString(),
    },
    {
      skip: !activeWorkspace || !planId,
    }
  );
  const notFoundRoute = useLocalizeRoute('oops');

  const [initialValues, setInitialValues] = useState<FormBody>({
    status: 'draft',
    modules: [],
  });

  useEffect(() => {
    if (isPaymentFailed) {
      patchStatus({
        pid: planId?.toString() ?? '',
        body: {
          status: 'draft',
        },
      })
        .unwrap()
        .then(() => {
          setSearchParams((prev) => {
            prev.delete('payment');
            return prev;
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
    }
  }, [patchStatus, planId, searchParams]);

  useSetActiveWorkspace(plan?.workspace_id);
  useEffect(() => {
    if (!plan) return;
    const initialDatesModule = plan.config.modules.find(
      (mod) => mod.type === 'dates'
    );
    const modules = [...plan.config.modules];

    if (!initialDatesModule) {
      modules.push({
        variant: 'default',
        type: 'dates',
        output: { start: formatModuleDate(PLAN_MINIMUM_DATE).output },
      });
    }

    setInitialValues({
      status: plan.status,
      modules,
    });
  }, [plan]);

  if (!planId || Number.isNaN(Number(planId))) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  if (isError) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  return (
    <Page
      title={t('__PLAN_PAGE_TITLE')}
      className="plan-page"
      route="plan"
      isMinimal
      excludeMarginTop
      excludeMarginBottom
    >
      {!isLoading && (
        <FormProvider initialValues={initialValues}>
          <PlanProvider>
            <PlanPageContent plan={plan} />
          </PlanProvider>
        </FormProvider>
      )}
    </Page>
  );
};

export default Plan;
