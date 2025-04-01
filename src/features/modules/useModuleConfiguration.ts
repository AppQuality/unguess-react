import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { usePatchPlansByPidMutation } from 'src/features/api';
import {
  usePlanModuleValues,
  useSetStatus,
  useSetSubmitting,
} from '../planModules';
import { useValidationContext } from './FormProvider';

export const useSubmit = (planId: string) => {
  const { values } = usePlanModuleValues();
  const setSubmitting = useSetSubmitting();
  const [patchPlan, { isLoading }] = usePatchPlansByPidMutation();

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    try {
      await patchPlan({
        pid: planId,
        body: {
          config: {
            modules: values.modules,
          },
        },
      }).unwrap();
      setSubmitting(false);
    } catch (e) {
      console.log(e);
    }
  }, [planId, values.modules]);

  return { handleSubmit, isLoading };
};

export const useModuleConfiguration = () => {
  const { values } = usePlanModuleValues();
  const { planId } = useParams();
  const setStatus = useSetStatus();
  const { errors } = useValidationContext();
  const { handleSubmit: submitForm, isLoading } = useSubmit(planId || '');

  const isValid = !errors || Object.keys(errors).length === 0;

  const setPlanStatus = (status: string) => {
    setStatus(status);
  };
  const getPlanStatus = () => values.status;
  const getModules = () => values.modules;

  return {
    isValid,
    getModules,
    errors,
    submitModuleConfiguration: submitForm,
    isSubmitting: isLoading,
    setPlanStatus,
    getPlanStatus,
  };
};
