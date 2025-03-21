import { useFormikContext } from 'formik';
import { useCallback, useMemo } from 'react';
import { components } from 'src/common/schema';
import { useValidationContext } from './FormProvider';
import { FormBody } from './types';

export const useModule = <T extends components['schemas']['Module']['type']>(
  moduleName: T
) => {
  type ModType = components['schemas']['Module'] & { type: T };
  const { values, setFieldValue } = useFormikContext<FormBody>();
  const { validateForm } = useValidationContext();

  const module: ModType | undefined = useMemo(
    () => values.modules.find((m): m is ModType => m.type === moduleName),
    [values.modules, moduleName] // Dipendenze limitate
  );
  const setVariant = useCallback(
    (variant: ModType['variant']) => {
      setFieldValue(
        'modules',
        values.modules.map((m) =>
          m.type === moduleName ? { ...m, variant } : m
        )
      );
    },
    [moduleName, setFieldValue, values.modules]
  );

  const setOutput = useCallback(
    (output: ModType['output']) => {
      setFieldValue(
        'modules',
        values.modules.map((m) =>
          m.type === moduleName ? { ...m, output } : m
        )
      );
    },
    [moduleName, setFieldValue, values.modules]
  );

  const set = useCallback(
    (value: ModType) => {
      setFieldValue(
        'modules',
        module
          ? values.modules.map((m) =>
              m.type === moduleName ? { ...m, ...value } : m
            )
          : [...values.modules, { ...value }]
      );
    },
    [module, moduleName, setFieldValue, values.modules]
  );

  const remove = useCallback(() => {
    setFieldValue(
      'modules',
      values.modules.filter((m) => m.type !== moduleName)
    );
    validateForm();
  }, [moduleName, setFieldValue, values.modules]);

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
          output: [],
        };
      case 'gender':
        return {
          type,
          variant: 'default',
          output: [],
        };
      case 'literacy':
        return {
          type,
          variant: 'default',
          output: [],
        };
      case 'language':
        return {
          type,
          variant: 'default',
          output: '',
        };
      case 'target':
        return {
          type,
          variant: 'default',
          output: 0,
        };
      default:
        return null;
    }
  };

  const add = useCallback(() => {
    if (!getConfig(moduleName)) return;
    setFieldValue('modules', [...values.modules, getConfig(moduleName)]);
  }, [setFieldValue, values.modules]);

  return useMemo(
    () => ({ value: module, set, remove, setOutput, setVariant, add }),
    [module, set, remove, add]
  );
};
