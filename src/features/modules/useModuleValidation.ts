import { useCallback, useEffect, useState } from 'react';
import { components } from 'src/common/schema';
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
  const { errors, setErrors, addValidationFunction } = useValidationContext();
  const { value } = useModule(type);
  const memoizedValidate = useCallback(validate, []);
  const validationHandler = () => {
    if (!value) return;

    const validation = memoizedValidate(value);

    const newErrors = errors ? { ...errors } : {};
    Object.keys(newErrors).forEach((key) => {
      if (key.startsWith(`${type}.`) || key === type) {
        delete newErrors[`${key}`];
      }
    });

    if (validation === true) {
      setIsValid(true);
      setErrors(newErrors);
      return;
    }

    setIsValid(false);

    if (typeof validation === 'string') {
      setErrors({ ...newErrors, [type]: validation });
    } else {
      const errorObject = flattenObject(validation, type);
      setErrors({ ...newErrors, ...errorObject });
    }
  };

  useEffect(() => {
    addValidationFunction(type, validationHandler);
  }, [value, memoizedValidate]);

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

  return {
    validate: validationHandler,
    isValid,
    error: getErrorInThisModule(),
  };
};
