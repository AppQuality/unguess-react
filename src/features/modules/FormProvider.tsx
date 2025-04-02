import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { useSetModules, useSetStatus } from '../planModules';
import { FormBody } from './types';

interface ValidationContextType {
  validateForm: () => Promise<void>;
  addValidationFunction: (type: string, validate: () => Promise<void>) => void;
}

export const ValidationContext = createContext<ValidationContextType>({
  validateForm: () => Promise.resolve(),
  addValidationFunction: () => {},
});

export const useValidationContext = () => useContext(ValidationContext);

const ValidationContextProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();
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
    []
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
  const { errors, currentModules } = useAppSelector(
    (state) => state.planModules
  );

  return <pre>{JSON.stringify(currentModules, null, 2)}</pre>;
};

FormProvider.Debugger = Debugger;

export { FormProvider };
