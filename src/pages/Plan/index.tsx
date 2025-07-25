import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { PLAN_MINIMUM_DATE } from 'src/constants';
import {
  GetPlansByPidApiResponse,
  useGetPlansByPidQuery,
  useGetWorkspacesByWidQuery,
} from 'src/features/api';
import { FormProvider } from 'src/features/modules/FormProvider';
import { FormBody } from 'src/features/modules/types';
import { setWorkspace } from 'src/features/navigation/navigationSlice';
import { Page } from 'src/features/templates/Page';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { PlanProvider, usePlanContext } from './context/planContext';
import PlanPageHeader from './navigation/header/Header';
import { PlanBody } from './PlanBody';
import { formatModuleDate } from './utils/formatModuleDate';

const PlanPage = ({ plan }: { plan: GetPlansByPidApiResponse | undefined }) => {
  const { t } = useTranslation();
  const { activeTab, setActiveTab } = usePlanContext();

  useEffect(() => {
    if (!plan) return;

    if (activeTab !== 'summary' && plan.status !== 'draft') {
      setActiveTab('summary');
    }
  }, [plan]);

  return (
    <Page
      title={t('__PLAN_PAGE_TITLE')}
      className="plan-page"
      route="plan"
      isMinimal
      excludeMarginTop
      excludeMarginBottom
    >
      <PlanPageHeader />
      <PlanBody />
    </Page>
  );
};

const useSetActiveWorkspace = (workspaceId?: number) => {
  const dispatch = useAppDispatch();
  const { data: workspace } = useGetWorkspacesByWidQuery(
    {
      wid: (workspaceId || 0).toString(),
    },
    {
      skip: !workspaceId,
    }
  );

  useEffect(() => {
    if (workspace) {
      dispatch(setWorkspace(workspace));
    }
  }, [workspace, dispatch]);
};

const Plan = () => {
  const { activeWorkspace } = useActiveWorkspace();
  const navigate = useNavigate();
  const location = useLocation();
  const { planId } = useParams();
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
    <FormProvider initialValues={initialValues}>
      <PlanProvider>
        <PlanPage plan={plan} />
      </PlanProvider>
    </FormProvider>
  );
};

export default Plan;
