import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { components } from 'src/common/schema';
import { setModule } from '../planModules';
import { getConfig } from './getConfig';

export const useModuleAdd = <T extends components['schemas']['Module']['type']>(
  moduleName: T
) => {
  const dispatch = useAppDispatch();
  const module = useAppSelector(
    (state) => state.planModules.records[`${moduleName}`]
  );

  const add = () => {
    if (!getConfig(moduleName)) return;

    const newModule = getConfig(moduleName);
    if (!newModule) return;
    dispatch(setModule({ type: moduleName, module: newModule }));
  };

  return useMemo(() => ({ add }), [module, add]);
};
