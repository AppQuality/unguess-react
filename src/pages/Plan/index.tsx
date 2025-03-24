import { FormikHelpers } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  useGetWorkspacesByWidPlansAndPidQuery,
  usePatchWorkspacesByWidPlansAndPidMutation,
} from 'src/features/api';
import { FormProvider } from 'src/features/modules/FormProvider';
import { FormBody } from 'src/features/modules/types';
import { Page } from 'src/features/templates/Page';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { GlobalAlert } from '@appquality/unguess-design-system';
import { PlanProvider } from './context/planContext';
import PlanPageHeader from './navigation/header/Header';
import { PlanBody } from './PlanBody';

const Plan = () => {
  const { t } = useTranslation();
  const { planId } = useParams();
  const { activeWorkspace } = useActiveWorkspace();
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

  const planStatus =
    plan?.status === 'pending_review' ? plan.quote.status : plan?.status;

  const getGlobalAlert = () => {
    switch (planStatus) {
      case 'pending':
        return (
          <GlobalAlert
            message={<>{t('PLAN_GLOBAL_ALERT_SUBMITTED_STATE_MESSAGE')}</>}
            title={t('PLAN_GLOBAL_ALERT_SUBMITTED_STATE_TITLE')}
            type="info"
          />
        );
      case 'proposed':
        return (
          <GlobalAlert
            message={<>{t('PLAN_GLOBAL_ALERT_AWATING_STATE_MESSAGE')}</>}
            title={t('PLAN_GLOBAL_ALERT_AWATING_STATE_TITLE')}
            type="accent"
          />
        );
      case 'approved':
        return (
          <GlobalAlert
            message={<>{t('PLAN_GLOBAL_ALERT_APPROVED_STATE_MESSAGE')}</>}
            title={t('PLAN_GLOBAL_ALERT_APPROVED_STATE_TITLE')}
            type="success"
          />
        );
      default:
        return null;
    }
  };

  const [initialValues, setInitialValues] = useState<FormBody>({
    status: 'draft',
    modules: [],
  });

  useEffect(() => {
    if (!plan) return;
    setInitialValues({
      status: plan.status,
      modules: plan.config.modules,
    });
  }, [plan]);

  const handleSubmit = useCallback(
    (values: FormBody, helpers: FormikHelpers<FormBody>) => {
      helpers.setSubmitting(true);
      patchPlan({
        wid: activeWorkspace?.id.toString() ?? '',
        pid: planId?.toString() ?? '',
        body: {
          config: {
            modules: values.modules,
          },
        },
      })
        .unwrap()
        .then(() => {
          helpers.setSubmitting(false);
        })
        .catch((e: any) => console.log(e));
    },
    [activeWorkspace, planId, plan]
  );

  return (
    <FormProvider onSubmit={handleSubmit} initialValues={initialValues}>
      <PlanProvider>
        <Page
          title={t('__PLAN_PAGE_TITLE')}
          className="plan-page"
          pageHeader={<PlanPageHeader />}
          route="plan"
          isMinimal
          excludeMarginTop
        >
          {getGlobalAlert()}
          <PlanBody />
        </Page>
      </PlanProvider>
    </FormProvider>
  );
};

export default Plan;
