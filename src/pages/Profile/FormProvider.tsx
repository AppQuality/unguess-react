import { Formik } from 'formik';
import { useGetUsersMeQuery } from 'src/features/api';
import { ProfileFormValues } from './valuesType';

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useGetUsersMeQuery();
  const initialValues: ProfileFormValues = {
    roleId: 0,
    name: data?.first_name || '',
    surname: data?.last_name || '',
    email: data?.email || '',
  };
  const onSubmit = async (values: ProfileFormValues) =>
    console.log(`Submitted values: ${JSON.stringify(values, null, 2)}`);

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {children}
    </Formik>
  );
};
