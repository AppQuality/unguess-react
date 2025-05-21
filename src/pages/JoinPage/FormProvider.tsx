import { Formik, FormikHelpers, Form } from 'formik';
import { useMemo } from 'react';
import { useValidationSchema } from './validationSchema';
import { useJoinSubmit } from './useJoinSubmit';
import { JoinFormValues } from './valuesType';

interface FormProviderProps {
  children: React.ReactNode;
  email?: string;
  name?: string;
  surname?: string;
  workspace?: string;
  profile?: string;
  token?: string;
}

export const FormProvider = ({
  children,
  email,
  name,
  surname,
  workspace,
  profile,
  token,
}: FormProviderProps) => {
  const initialValues: JoinFormValues = {
    step: 1,
    email: email || '',
    password: '',
    name: name || '',
    surname: surname || '',
    roleId: 0,
    workspace: workspace || '',
  };

  // logic to check if the user is invited
  // for the time being we are checking if the mail is not empty
  const isInvited = useMemo(() => !!email, [email]);
  const validationSchema = useValidationSchema();
  const { onSubmit } = useJoinSubmit();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      initialStatus={{
        isInvited,
      }}
      onSubmit={onSubmit}
    >
      <Form>{children}</Form>
    </Formik>
  );
};
