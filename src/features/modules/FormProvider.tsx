import { ReactNode, useEffect } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { useSetModules, useSetStatus, useValidateForm } from '../planModules';
import { FormBody } from './types';

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

  return <div>{children}</div>;
};

const Debugger = () => {
  const { errors, currentModules } = useAppSelector(
    (state) => state.planModules
  );
  const { validateForm } = useValidateForm();

  return (
    <pre>
      <button onClick={() => validateForm()}>validate</button>
      {JSON.stringify(errors, null, 2)}
    </pre>
  );
};

FormProvider.Debugger = Debugger;

export { FormProvider };
