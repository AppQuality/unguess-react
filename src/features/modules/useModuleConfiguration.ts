import { useAppSelector } from 'src/app/hooks';
import { components } from 'src/common/schema';
import { usePatchPlansByPidMutation } from 'src/features/api';
import { useSetStatus } from '../planModules';

export const useSubmit = (planId: string) => {
  const { records } = useAppSelector((state) => state.planModules);
  const [patchPlan, { isLoading }] = usePatchPlansByPidMutation({
    fixedCacheKey: 'shared-update-plan',
  });

  const handleSubmit = async () => {
    try {
      const modules = Object.entries(records).map(
        ([key, item]) =>
          ({
            ...item,
            type: key,
          } as components['schemas']['Module'])
      );
      return await patchPlan({
        pid: planId,
        body: {
          config: {
            modules,
          },
        },
      }).unwrap();
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  return { handleSubmit, isLoading };
};

export const useModuleConfiguration = () => {
  const status = useAppSelector((state) => state.planModules.status);
  const setStatus = useSetStatus();

  const getPlanStatus = () => status;

  return {
    setPlanStatus: setStatus,
    getPlanStatus,
  };
};
