import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { components } from 'src/common/schema';
import {
  removeModule,
  setModule,
  setOutput as setOutputAction,
  setVariant as setVariantAction,
} from '../planModules';
import { getConfig } from './getConfig';

export const useModule = <T extends components['schemas']['Module']['type']>(
  moduleName: T
) => {
  type ModType = components['schemas']['Module'] & { type: T };
  const dispatch = useAppDispatch();
  const module = useAppSelector(
    (state) => state.planModules.records[`${moduleName}`]
  );

  const setVariant = useCallback(
    (variant: ModType['variant']) => {
      dispatch(setVariantAction({ type: moduleName, variant }));
    },
    [moduleName]
  );

  const setOutput = useCallback(
    (output: ModType['output']) => {
      dispatch(setOutputAction({ type: moduleName, output }));
    },
    [moduleName]
  );

  const set = useCallback(
    (value: ModType) => {
      dispatch(setModule({ type: moduleName, module: value }));
    },
    [module, moduleName]
  );

  const remove = useCallback(() => {
    dispatch(removeModule(moduleName));
  }, [moduleName]);

  const add = () => {
    if (!getConfig(moduleName)) return;

    const newModule = getConfig(moduleName);
    if (!newModule) return;
    dispatch(setModule({ type: moduleName, module: newModule }));
  };

  return useMemo(
    () => ({ value: module, set, remove, setOutput, setVariant, add }),
    [module, set, remove, add]
  );
};
