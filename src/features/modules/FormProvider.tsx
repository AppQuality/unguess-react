import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { FormBody } from './types';

interface ValidationContextType {
  errors?: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
}

export const ValidationContext = createContext<ValidationContextType>({
  setErrors: () => {},
});

export const useValidationContext = () => useContext(ValidationContext);

const ValidationContextProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ValidationContextValues = useMemo(
    () => ({ errors, setErrors }),
    [errors]
  );

  return (
    <ValidationContext.Provider value={ValidationContextValues}>
      {children}
    </ValidationContext.Provider>
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
  <ValidationContextProvider>
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
  </ValidationContextProvider>
);

const Debugger = () => {
  const { values } = useFormikContext<FormBody>();

  return <pre>{JSON.stringify(values, null, 2)}</pre>;
};

FormProvider.Debugger = Debugger;

export { FormProvider };
