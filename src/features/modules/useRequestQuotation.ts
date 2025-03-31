import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { usePatchPlansByPidStatusMutation } from '../api';
import { useModuleConfiguration } from './useModuleConfiguration';

export const REQUIRED_MODULES = ['title', 'dates', 'tasks'] as const;
export const useRequestQuotation = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    isSubmitting,
    getModules,
    submitModuleConfiguration,
    setPlanStatus,
    getPlanStatus,
    isValid,
  } = useModuleConfiguration();
  const { planId } = useParams();
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();
  const [patchStatus] = usePatchPlansByPidStatusMutation();
  const missingModules = REQUIRED_MODULES.filter(
    (module) => !getModules().find((m) => m.type === module)
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
