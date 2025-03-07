import { useFormikContext } from 'formik';
import { FormBody } from './types';

export const useSave = () => {
  const { errors, submitForm, isSubmitting, values, setFieldValue } =
    useFormikContext<FormBody>();

  const isValid = Object.keys(errors).length === 0;

  const setPlanStatus = (status: string) => {
    setFieldValue('status', status);
  };
  const getPlanStatus = () => values.status;
  return {
    isValid,
    errors,
    submitForm,
    isSubmitting,
    setPlanStatus,
    getPlanStatus,
  };
};
