import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { components } from 'src/common/schema';
import { usePatchPlansByPidMutation } from 'src/features/api';
import {
  useModuleOutputs,
  usePlanModuleValues,
  useSetStatus,
} from '../planModules';
import { useValidationContext } from './FormProvider';

export const useSubmit = (planId: string) => {
  const { values } = usePlanModuleValues();
  const [patchPlan, { isLoading }] = usePatchPlansByPidMutation();

  const handleSubmit = useCallback(async () => {
    try {
      await patchPlan({
        pid: planId,
        body: {
          config: {
            modules: Object.entries(values.records).map(
              ([key, item]) =>
                ({
                  ...item,
                  type: key,
                } as components['schemas']['Module'])
            ),
          },
        },
      }).unwrap();
    } catch (e) {
      console.log(e);
    }
  }, [planId]);

  return { handleSubmit, isLoading };
};

export const useModuleConfiguration = () => {
  const { values } = useModuleOutputs();
  const { values: planValues } = usePlanModuleValues();
  const { planId } = useParams();
  const setStatus = useSetStatus();
  const { errors } = useValidationContext();
  const { handleSubmit: submitForm, isLoading } = useSubmit(planId || '');

  const isValid = !errors || Object.keys(errors).length === 0;

  const setPlanStatus = (status: string) => {
    setStatus(status);
  };
  const getPlanStatus = () => planValues.status;
  const getModules = () =>
    Object.entries(values).map(
      ([key, item]) =>
        ({
          ...item,
          type: key,
        } as components['schemas']['Module'])
    );

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
