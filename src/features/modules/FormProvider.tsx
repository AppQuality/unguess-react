import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useModuleOutputs, useSetModules, useSetStatus } from '../planModules';
import { FormBody } from './types';

interface ValidationContextType {
  errors?: { [x: string]: string };
  setErrors: Dispatch<React.SetStateAction<Record<string, string>>>;
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
  const { t } = useTranslation();

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
        const allErrors: Record<string, string> = {};
        await Promise.all(
          Object.entries(validationFunctions).map(
            async ([moduleType, validate]) => {
              try {
                await validate();
              } catch (error) {
                if (error instanceof Error) {
                  allErrors[`${moduleType}`] = error.message;
                }
              }
            }
          )
        );
        if (Object.keys(allErrors).length > 0) {
          const errorMessage = Object.entries(allErrors)
            .map(([moduleType]) => moduleType)
            .join(', ');
          return Promise.reject(
            new Error(
              `${t('__MODULES_VALIDATION_ERROR_MESSAGE')} ${errorMessage}`
            )
          );
        }
        return Promise.resolve();
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
}: {
  initialValues?: FormBody;
  children: ReactNode;
}) => {
  const setModules = useSetModules();
  const setStatus = useSetStatus();
  useEffect(() => {
    setModules(initialValues?.modules ?? []);
    if (initialValues?.status) {
      setStatus(initialValues.status);
    }
  }, [initialValues]);

  return (
    <div>
      <ValidationContextProvider>{children}</ValidationContextProvider>
    </div>
  );
};

const Debugger = () => {
  const { values } = useModuleOutputs();

  return <pre>{JSON.stringify(values, null, 2)}</pre>;
};

FormProvider.Debugger = Debugger;

export { FormProvider };
