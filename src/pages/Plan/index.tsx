import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
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
import { PlanProvider, usePlanTab } from './context/planContext';
import PlanPageHeader from './navigation/header/Header';
import { PlanBody } from './PlanBody';
import { formatModuleDate } from './utils/formatModuleDate';

const PlanPage = ({ plan }: { plan: GetPlansByPidApiResponse | undefined }) => {
  const { t } = useTranslation();
  const { activeTab, setActiveTab } = usePlanTab();

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
      pageHeader={<PlanPageHeader />}
      route="plan"
      isMinimal
      excludeMarginTop
      excludeMarginBottom
    >
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
  const { planId } = useParams();
  const { data: plan } = useGetPlansByPidQuery(
    {
      pid: Number(planId).toString(),
    },
    {
      skip: !activeWorkspace || !planId,
    }
  );

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

  return (
    <FormProvider initialValues={initialValues}>
      <PlanProvider>
        <PlanPage plan={plan} />
      </PlanProvider>
    </FormProvider>
  );
};

export default Plan;
