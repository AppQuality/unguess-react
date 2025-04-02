import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { usePatchPlansByPidStatusMutation } from '../api';
import { useModuleConfiguration, useSubmit } from './useModuleConfiguration';

export const REQUIRED_MODULES = ['title', 'dates', 'tasks'] as const;
export const useRequestQuotation = () => {
  const [error, setError] = useState<string | null>(null);
  const { planId } = useParams();
  const { handleSubmit: submitModuleConfiguration } = useSubmit(planId || '');
  const { errors } = useAppSelector((state) => state.planModules);
  const isValid = !errors || Object.keys(errors).length === 0;

  const { currentModules } = useAppSelector((state) => state.planModules);
  const { setPlanStatus, getPlanStatus } = useModuleConfiguration();
  const { isLoading: isSubmitting } = useSubmit(planId || '');
  const { t } = useTranslation();
  const [patchStatus] = usePatchPlansByPidStatusMutation();
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
    // triggerValidationforAllFields()
    // check if the form is valid
    if (!isValid) {
      // todo error handling
      return;
    }
    // save an updated version of the plan
    try {
      await submitModuleConfiguration();
    } catch (err) {
      // todo error handling
      return;
    }

    // if the save is successful, change the status of the plan
    patchStatus({
      pid: planId?.toString() ?? '',
      body: {
        status: 'pending_review',
      },
    })
      .unwrap()
      .then(() => {
        // update the status in the state
        setPlanStatus('pending_review');
      })
      .catch((err) => console.log(err));
  };

  const isRequestQuoteCTADisabled = () => {
    // if the plan is already pending review, return true
    if (getPlanStatus() === 'pending_review') {
      return true;
    }
    // if the user is already submitting, return true
    if (isSubmitting) {
      return true;
    }
    return false;
  };

  return {
    isRequestQuoteCTADisabled,
    missingModules,
    handleQuoteRequest,
    error,
    setError,
  };
};
