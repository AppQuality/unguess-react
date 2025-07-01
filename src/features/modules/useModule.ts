import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { components } from 'src/common/schema';
import {
  removeModule,
  setModule,
  setOutput as setOutputAction,
  setVariant as setVariantAction,
} from '../planModules';

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

  return useMemo(
    () => ({ value: module, set, remove, setOutput, setVariant }),
    [module, set, remove]
  );
};
