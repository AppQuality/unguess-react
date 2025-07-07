import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { components } from 'src/common/schema';
import { getModuleBySlug } from 'src/pages/Plan/modules/Factory';
import { setModule } from '../planModules';

type ModuleByType<T extends components['schemas']['Module']['type']> = Extract<
  components['schemas']['Module'],
  { type: T }
>;
export const useModuleAdd = <T extends components['schemas']['Module']['type']>(
  moduleName: T
) => {
  const dispatch = useAppDispatch();
  const module = useAppSelector(
    (state) => state.planModules.records[`${moduleName}`]
  );

  const getConfig = (type: T): ModuleByType<T> =>
    ({
      type,
      variant: getModuleBySlug(type)?.defaultVariant,
      output: getModuleBySlug(type)?.defaultData,
    } as ModuleByType<T>);

  const add = () => {
    if (!getConfig(moduleName)) return;

    const newModule = getConfig(moduleName);
    if (!newModule) return;
    dispatch(setModule({ type: moduleName, module: newModule }));
  };

  return useMemo(() => ({ add }), [module, add]);
};
