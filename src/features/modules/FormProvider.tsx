import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { FormBody } from './types';

interface ValidationContextType {
  errors?: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  validateForm: () => Promise<void>;
  addValidationFunction: (type: string, validate: () => Promise<void>) => void;
}

export const ValidationContext = createContext<ValidationContextType>({
  setErrors: () => {},
  validateForm: () => Promise.resolve(),
  addValidationFunction: () => {},
});

export const useValidationContext = () => useContext(ValidationContext);

const ValidationContextProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validationFunctions, setValidationFunctions] = useState<
    Record<string, () => Promise<void>>
  >({});

  const addValidationFunction = (
    type: string,
    validate: () => Promise<void>
  ) => {
    setValidationFunctions((prev) => ({ ...prev, [type]: validate }));
  };

  const ValidationContextValues = useMemo(
    () => ({
      errors,
      setErrors,
      validateForm: async () => {
        await Promise.all(
          Object.entries(validationFunctions).map(([_, validate]) => validate())
        );
      },
      addValidationFunction,
    }),
    [errors, validationFunctions]
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
  onSubmit: (
    values: FormBody,
    helpers: FormikHelpers<FormBody>
  ) => Promise<void>;
}) => (
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
    <ValidationContextProvider>
      <Form>{children}</Form>
    </ValidationContextProvider>
  </Formik>
);

const Debugger = () => {
  const { values } = useFormikContext<FormBody>();

  return <pre>{JSON.stringify(values, null, 2)}</pre>;
};

FormProvider.Debugger = Debugger;

export { FormProvider };
