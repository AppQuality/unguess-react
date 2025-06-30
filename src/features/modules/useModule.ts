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

  const getConfig = (
    type: components['schemas']['Module']['type']
  ): components['schemas']['Module'] | null => {
    switch (type) {
      case 'dates':
        return {
          type,
          variant: 'default',
          output: {
            start: '',
          },
        };
      case 'goal':
        return {
          type,
          variant: 'default',
          output: '',
        };
      case 'out_of_scope':
        return {
          type,
          variant: 'default',
          output: '',
        };
      case 'title':
        return {
          type,
          variant: 'default',
          output: '',
        };
      case 'tasks':
        return {
          type,
          variant: 'default',
          output: [],
        };
      case 'age':
        return {
          type,
          variant: 'default',
          output: [
            {
              min: 16,
              max: 17,
              percentage: 0,
            },
            {
              min: 18,
              max: 24,
              percentage: 0,
            },
            {
              min: 25,
              max: 34,
              percentage: 0,
            },
            {
              min: 35,
              max: 54,
              percentage: 0,
            },
            {
              min: 55,
              max: 70,
              percentage: 0,
            },
          ],
        };
      case 'gender':
        return {
          type,
          variant: 'default',
          output: [
            { gender: 'male', percentage: 50 },
            { gender: 'female', percentage: 50 },
          ],
        };
      case 'literacy':
        return {
          type,
          variant: 'default',
          output: [
            { level: 'beginner', percentage: 33.33 },
            { level: 'intermediate', percentage: 33.33 },
            { level: 'expert', percentage: 33.33 },
          ],
        };
      case 'language':
        return {
          type,
          variant: 'default',
          output: 'en',
        };
      case 'locality':
        return {
          type,
          variant: 'default',
          output: [
            {
              type: 'country',
              values: ['IT'],
            },
          ],
        };
      case 'target':
        return {
          type,
          variant: 'default',
          output: 5,
        };
      case 'browser':
        return {
          type,
          variant: 'default',
          output: [
            { name: 'chrome', percentage: 25 },
            { name: 'firefox', percentage: 25 },
            { name: 'safari', percentage: 25 },
            { name: 'edge', percentage: 25 },
          ],
        };
      case 'setup_note':
        return {
          type,
          variant: 'default',
          output: '',
        };
      case 'target_note':
        return {
          type,
          variant: 'default',
          output: '',
        };
      case 'instruction_note':
        return {
          type,
          variant: 'default',
          output: '',
        };
      case 'touchpoints':
        return {
          type,
          variant: 'default',
          output: [],
        };
      case 'additional_target':
        return {
          type,
          variant: 'default',
          output: '',
        };
      case 'employment':
        return {
          type,
          variant: 'default',
          output: [],
        };
      case 'annual_income_range':
        return {
          type,
          variant: 'default',
          output: [
            {
              min: 0,
              max: 25000,
              percentage: 0,
            },
            {
              min: 25001,
              max: 50000,
              percentage: 0,
            },
            {
              min: 50001,
              max: 999999999,
              percentage: 0,
            },
          ],
        };
      case 'bank':
        return {
          type,
          variant: 'default',
          output: [],
        };
      case 'elettricity_supply':
        return {
          type,
          variant: 'default',
          output: [],
        };
      case 'gas_supply':
        return {
          type,
          variant: 'default',
          output: [],
        };
      case 'mobile_internet':
        return {
          type,
          variant: 'default',
          output: [],
        };
      case 'home_internet':
        return {
          type,
          variant: 'default',
          output: [],
        };
      default:
        return null;
    }
  };

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
