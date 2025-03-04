import { useFormikContext } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { FormBody } from './types';
import { useSave } from './useSave';

export const REQUIRED_MODULES = ['title', 'dates', 'tasks'] as const;
export const useRequestQuotation = () => {
  const [error, setError] = useState<string | null>(null);
  const { values } = useFormikContext<FormBody>();
  const {
    isSubmitting,
    submitForm,
    setPlanStatus,
    getPlanStatus,
    errors,
    isValid,
  } = useSave();
  const { planId } = useParams();
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();
  const missingModules = REQUIRED_MODULES.filter(
    (module) => !values.modules.find((m) => m.type === module)
  );

  const handleQuoteRequest = async () => {
    // check if all required modules are present
    if (missingModules.length > 0) {
      setError(
        `${t('__PLAN_MISSING_MODULES_ERROR')}: ${missingModules.join(', ')}`
      );
      return;
    }
    // triggerValidationforAllFields()
    // check if the form is valid
    if (!isValid) {
      // todo error handling
      console.log('Please fill in all required fields');
      return;
    }
    // save an updated version of the plan
    try {
      await submitForm();
    } catch (err) {
      alert(err);
      return;
    }
    console.log('submitted');
    // if the save is successful, change the status of the plan
    fetch(`/api/workspaces/${activeWorkspace?.id}/plans/${planId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'pending_review' }),
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        // update the status in the state
        setPlanStatus(data.status);
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
