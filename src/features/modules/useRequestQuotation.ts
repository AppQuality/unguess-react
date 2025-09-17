import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { usePlan } from 'src/pages/Plan/hooks/usePlan';
import { usePatchPlansByPidStatusMutation } from '../api';
import { useModuleConfiguration, useSubmit } from './useModuleConfiguration';

const REQUIRED_MODULES = ['title', 'dates', 'tasks'] as const;

export const useRequestQuotation = () => {
  const [error, setError] = useState<string | null>(null);
  const { planId } = useParams();
  const { handleSubmit: submitModuleConfiguration, isLoading: isSubmitting } =
    useSubmit(planId || '');
  const { errors } = useAppSelector((state) => state.planModules);
  const isValid = !errors || Object.keys(errors).length === 0;

  const { currentModules } = useAppSelector((state) => state.planModules);
  const { setPlanStatus, getPlanStatus } = useModuleConfiguration();
  const { t } = useTranslation();
  const [patchStatus, { isLoading }] = usePatchPlansByPidStatusMutation({
    fixedCacheKey: 'shared-update-plan-status',
  });
  const missingModules = REQUIRED_MODULES.filter(
    (module) => !currentModules.find((m) => m === module)
  );

  const handleQuoteRequest = async () => {
    // check if all required modules are present
    if (missingModules.length > 0) {
      setError(
        `${t('__PLAN_MISSING_MODULES_ERROR')}: ${missingModules.join(', ')}`
      );
      throw new Error(
        `${t('__PLAN_MISSING_MODULES_ERROR')}: ${missingModules.join(', ')}`
      );
    }
    // check if the form is valid
    if (!isValid) {
      return;
    }
    try {
      // save an updated version of the plan
      await submitModuleConfiguration();
      // if the save is successful, change the status of the plan
      await patchStatus({
        pid: planId?.toString() ?? '',
        body: {
          status: 'pending_review',
        },
      });
      setPlanStatus('pending_review');
    } catch (err) {
      throw new Error(
        `${t('__PLAN_PAGE_MODAL_SEND_REQUEST_TOAST_ERROR')}: ${
          err instanceof Error ? err.message : ''
        }`
      );
    }
  };

  const isRequestingQuote = () => isSubmitting || isLoading;

  const isRequestQuoteCTADisabled = () => {
    // if the plan is already pending review, return true
    if (getPlanStatus() === 'pending_review') {
      return true;
    }

    // if the user is already submitting, return true
    if (isSubmitting || isLoading) {
      return true;
    }
    return false;
  };

  return {
    isRequestQuoteCTADisabled,
    isRequestingQuote,
    missingModules,
    handleQuoteRequest,
    error,
    setError,
  };
};
