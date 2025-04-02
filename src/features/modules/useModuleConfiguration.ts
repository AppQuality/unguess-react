import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { components } from 'src/common/schema';
import { usePatchPlansByPidMutation } from 'src/features/api';
import { useModuleOutputs, useSetStatus } from '../planModules';

export const useSubmit = (planId: string) => {
  const { records } = useAppSelector((state) => state.planModules);
  const [patchPlan, { isLoading }] = usePatchPlansByPidMutation();

  const handleSubmit = async () => {
    try {
      const modules = Object.entries(records).map(
        ([key, item]) =>
          ({
            ...item,
            type: key,
          } as components['schemas']['Module'])
      );
      await patchPlan({
        pid: planId,
        body: {
          config: {
            modules,
          },
        },
      }).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  return { handleSubmit, isLoading };
};

export const useModuleConfiguration = () => {
  const { values } = useModuleOutputs();
  const { status, errors } = { status: 'draft', errors: {} };
  const { planId } = useParams();
  const setStatus = useSetStatus();
  const { handleSubmit: submitForm, isLoading } = useSubmit(planId || '');

  const isValid = !errors || Object.keys(errors).length === 0;

  const getPlanStatus = () => status;
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
    setPlanStatus: setStatus,
    getPlanStatus,
  };
};
