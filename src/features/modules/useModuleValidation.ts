import { useFormikContext } from 'formik';
import { useState } from 'react';
import { components } from 'src/common/schema';
import { FormBody } from './types';
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
  ) => true | string;
}) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setErrors, errors } = useFormikContext<FormBody>();
  const { value } = useModule(type);
  const validationHandler = () => {
    if (!value) return;

    const validation = validate(value);

    if (validation === true) {
      setIsValid(true);
      setError(null);
      const newErrors = errors ? { ...errors } : {};
      if (type in newErrors) {
        delete newErrors[type as keyof typeof newErrors];
      }
      setErrors(newErrors);
      return;
    }

    setIsValid(false);

    setError(validation);
    setErrors(
      errors ? { ...errors, [type]: validation } : { [type]: validation }
    );
  };

  return { validate: validationHandler, isValid, error };
};
