import { useFormikContext } from 'formik';
import { useMemo, useCallback } from 'react';
import { components } from 'src/common/schema';
import { FormBody } from './types';

export const useModule = <T extends components['schemas']['Module']['type']>(
  moduleName: T
) => {
  type ModType = components['schemas']['Module'] & { type: T };
  const { values, setFieldValue, setErrors, errors } =
    useFormikContext<FormBody>();

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
  }, [moduleName, setFieldValue, values.modules]);

  return useMemo(
    () => ({ value: module, set, remove, setOutput, setVariant }),
    [module, set, remove]
  );
};
