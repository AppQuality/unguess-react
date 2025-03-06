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
  const [error, setError] = useState<string | null>(null);
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
      setError(null);
      setErrors(newErrors);
      return;
    }

    setIsValid(false);

    if (typeof validation === 'string') {
      setError(validation);
      setErrors({ ...newErrors, [type]: validation });
    } else {
      const errorObject = flattenObject(validation, type);
      setErrors({ ...newErrors, ...errorObject });
      setError(JSON.stringify(errorObject));
    }
  };

  useEffect(() => {
    addValidationFunction(type, validationHandler);
  }, [value, memoizedValidate]);

  let errorValue;
  try {
    errorValue = JSON.parse(error || '');
  } catch (e) {
    errorValue = error;
  }

  return { validate: validationHandler, isValid, error: errorValue };
};
