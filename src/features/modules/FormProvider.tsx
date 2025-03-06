import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { FormBody } from './types';

interface ErrorContextType {
  errors?: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
}

export const ErrorContext = createContext<ErrorContextType>({
  setErrors: () => {},
});

export const useErrorContext = () => useContext(ErrorContext);

const ErrorContextProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ErrorContextValues = useMemo(() => ({ errors, setErrors }), [errors]);

  return (
    <ErrorContext.Provider value={ErrorContextValues}>
      {children}
    </ErrorContext.Provider>
  );
};

const FormProvider = ({
  initialValues,
  children,
  onSubmit,
}: {
  initialValues?: FormBody;
  children: ReactNode;
  onSubmit: (values: FormBody, helpers: FormikHelpers<FormBody>) => void;
}) => (
  <ErrorContextProvider>
    <Formik
      initialValues={
        initialValues || {
          status: 'draft',
          modules: [],
        }
      }
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form>{children}</Form>
    </Formik>
  </ErrorContextProvider>
);

const Debugger = () => {
  const { values } = useFormikContext<FormBody>();

  return <pre>{JSON.stringify(values, null, 2)}</pre>;
};

FormProvider.Debugger = Debugger;

export { FormProvider };
