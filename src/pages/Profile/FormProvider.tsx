import { Formik } from 'formik';
import { ProfileFormValues } from './valuesType';

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const initialValues: ProfileFormValues = {
    roleId: 0,
    name: '',
    surname: '',
  };
  const onSubmit = async (values: ProfileFormValues) =>
    console.log(`Submitted values: ${JSON.stringify(values, null, 2)}`);

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {children}
    </Formik>
  );
};
