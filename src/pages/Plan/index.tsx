import { FormikHelpers } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  GetWorkspacesByWidPlansAndPidApiResponse,
  useGetWorkspacesByWidPlansAndPidQuery,
  usePatchWorkspacesByWidPlansAndPidMutation,
} from 'src/features/api';
import { FormProvider } from 'src/features/modules/FormProvider';
import { FormBody } from 'src/features/modules/types';
import { Page } from 'src/features/templates/Page';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { PLAN_MINIMUM_DATE } from 'src/constants';
import { PlanProvider, usePlanTab } from './context/planContext';
import PlanPageHeader from './navigation/header/Header';
import { PlanBody } from './PlanBody';
import { formatModuleDate } from './utils/formatModuleDate';

const PlanPage = ({
  plan,
}: {
  plan: GetWorkspacesByWidPlansAndPidApiResponse | undefined;
}) => {
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
    >
      <PlanBody />
    </Page>
  );
};

const Plan = () => {
  const { activeWorkspace } = useActiveWorkspace();
  const { planId } = useParams();
  const [patchPlan] = usePatchWorkspacesByWidPlansAndPidMutation();
  const { data: plan } = useGetWorkspacesByWidPlansAndPidQuery(
    {
      wid: Number(activeWorkspace?.id).toString(),
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

  const handleSubmit = useCallback(
    async (values: FormBody, helpers: FormikHelpers<FormBody>) => {
      helpers.setSubmitting(true);
      try {
        await patchPlan({
          wid: activeWorkspace?.id.toString() ?? '',
          pid: planId?.toString() ?? '',
          body: {
            config: {
              modules: values.modules,
            },
          },
        }).unwrap();
        helpers.setSubmitting(false);
      } catch (e) {
        console.log(e);
      }
    },
    [activeWorkspace, planId, plan]
  );

  return (
    <FormProvider onSubmit={handleSubmit} initialValues={initialValues}>
      <PlanProvider>
        <PlanPage plan={plan} />
      </PlanProvider>
    </FormProvider>
  );
};

export default Plan;
