import { useCallback, useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { components } from 'src/common/schema';
import { addValidationFunction, setError } from '../planModules';
import { useModule } from './useModule';

function flattenObject(
  obj: Record<string, any>,
  prefix: string = ''
): Record<string, string> {
  const result: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    if (key in obj) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[`${key}`] === 'object' && obj[`${key}`] !== null) {
        Object.assign(result, flattenObject(obj[`${key}`], newKey));
      } else {
        result[`${newKey}`] = obj[`${key}`];
      }
    }
  });
  return result;
}

export const useValidation = <
  T extends components['schemas']['Module']['type']
>({
  type,
  validate,
}: {
  type: T;
  validate: (
    value: components['schemas']['Module'] & { type: T }
  ) => true | string | Record<string, any>;
}) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const errorInThisModule = useAppSelector(
    (state) =>
      Object.fromEntries(
        Object.entries(state.planModules.errors).filter(([key]) => {
          if (key.startsWith(`${type}.`) || key === type) {
            return true;
          }
          return false;
        })
      ) || {},
    shallowEqual
  );

  const dispatch = useAppDispatch();
  const { value } = useModule(type);
  const memoizedValidate = useCallback(validate, [value]);

  const updateErrors = (newErrors: Record<string, string>) => {
    dispatch(setError({ type, error: newErrors }));
  };

  const validationHandler = (): boolean => {
    if (!value) return false;

    const item = {
      ...value,
      type,
    } as components['schemas']['Module'] & { type: T };

    const validation = memoizedValidate(item);

    if (validation === true) {
      setIsValid(true);
      updateErrors({});
      return true;
    }

    setIsValid(false);

    if (typeof validation === 'string') {
      updateErrors({ [type]: validation });
    } else {
      const errorObject = flattenObject(validation, type);
      updateErrors(errorObject);
    }

    return false;
  };

  const getErrorInThisModule = () => {
    if (Object.keys(errorInThisModule).length === 0) {
      return undefined;
    }

    if (
      Object.keys(errorInThisModule).length === 1 &&
      errorInThisModule[`${type}`]
    ) {
      return errorInThisModule[`${type}`];
    }

    return errorInThisModule;
  };

  useEffect(() => {
    dispatch(
      addValidationFunction({
        type,
        fn: async () =>
          new Promise<void>((resolve, reject) => {
            const isOk = validationHandler();

            if (isOk) {
              resolve();
            } else {
              reject(new Error(`There is an error in the module ${type}`));
            }
          }),
      })
    );
  }, [memoizedValidate]);

  return {
    validate: validationHandler,
    isValid,
    error: getErrorInThisModule(),
  };
};
