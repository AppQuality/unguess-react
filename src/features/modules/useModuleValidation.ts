import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { components } from 'src/common/schema';
import { setError } from '../planModules';
import { useValidationContext } from './FormProvider';
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
  const { addValidationFunction } = useValidationContext();
  const { errors } = useAppSelector((state) => state.planModules);

  const dispatch = useAppDispatch();
  const { value } = useModule(type);
  const memoizedValidate = useCallback(validate, []);

  const updateErrors = (newErrors: Record<string, string>) => {
    dispatch(setError({ type, error: newErrors }));
  };

  const validationHandler = (): boolean => {
    if (!value) return false;

    const validation = memoizedValidate(value);

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
    const errorInThisModule = { ...errors };
    Object.keys(errorInThisModule).forEach((key) => {
      if (!key.startsWith(`${type}.`) && key !== type) {
        delete errorInThisModule[`${key}`];
      }
    });

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
    addValidationFunction(
      type,
      async () =>
        new Promise<void>((resolve, reject) => {
          const isOk = validationHandler();

          if (isOk) {
            resolve();
          } else {
            reject(new Error(`There is an error in the module ${type}`));
          }
        })
    );
  }, [memoizedValidate]);

  return {
    validate: validationHandler,
    isValid,
    error: getErrorInThisModule(),
  };
};
