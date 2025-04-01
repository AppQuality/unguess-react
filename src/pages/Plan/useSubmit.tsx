import { useCallback } from 'react';
import { usePatchPlansByPidMutation } from 'src/features/api';
import {
  usePlanModuleValues,
  useSetSubmitting,
} from 'src/features/planModules';

export const useSubmit = (planId: string) => {
  const { values } = usePlanModuleValues();
  const setSubmitting = useSetSubmitting();
  const [patchPlan] = usePatchPlansByPidMutation();

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

  return handleSubmit;
};
