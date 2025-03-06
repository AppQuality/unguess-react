import { useState } from 'react';
import { components } from 'src/common/schema';
import { useErrorContext } from './FormProvider';
import { useModule } from './useModule';

export const useValidation = <
  T extends components['schemas']['Module']['type']
>({
  type,
  validate,
}: {
  type: T;
  validate: (
    value: components['schemas']['Module'] & { type: T }
  ) => true | string | Record<string, string>;
}) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { errors, setErrors } = useErrorContext();
  const { value } = useModule(type);
  const validationHandler = () => {
    if (!value) return;

    const validation = validate(value);

    if (validation === true) {
      setIsValid(true);
      setError(null);
      const newErrors = errors ? { ...errors } : {};
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`${type}.`) || key === type) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
      return;
    }

    setIsValid(false);

    if (typeof validation === 'string') {
      setError(validation);
      const newErrors = errors ? { ...errors } : {};
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`${type}.`) || key === type) {
          delete newErrors[`${key}`];
        }
      });
      setErrors({ ...newErrors, [type]: validation });
    } else {
      const validationMap = Object.entries(validation).map(([k, v]) => ({
        key: `${type}.${k}`,
        value: v,
      }));
      const newErrors = errors ? { ...errors } : {};
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`${type}.`) || key === type) {
          delete newErrors[`${key}`];
        }
      });
      const errorObject = Object.fromEntries(
        validationMap.map((e) => [e.key, e.value])
      );
      setErrors({ ...newErrors, ...errorObject });
      setError(JSON.stringify(errorObject));
    }
  };

  let errorValue;
  try {
    errorValue = JSON.parse(error || '');
  } catch (e) {
    errorValue = error;
  }

  return { validate: validationHandler, isValid, error: errorValue };
};
