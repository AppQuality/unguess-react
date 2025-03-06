import { useFormikContext } from 'formik';
import { useValidationContext } from './FormProvider';
import { FormBody } from './types';

export const useModuleConfiguration = () => {
  const { submitForm, isSubmitting, values, setFieldValue } =
    useFormikContext<FormBody>();
  const { errors } = useValidationContext();

  const isValid = !errors || Object.keys(errors).length === 0;

  const setPlanStatus = (status: string) => {
    setFieldValue('status', status);
  };
  const getPlanStatus = () => values.status;
  const getModules = () => values.modules;

  return {
    isValid,
    getModules,
    errors,
    submitModuleConfiguration: submitForm,
    isSubmitting,
    setPlanStatus,
    getPlanStatus,
  };
};
