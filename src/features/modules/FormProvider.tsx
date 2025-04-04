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
  const { errors, records } = useAppSelector((state) => state.planModules);
  const { validateForm } = useValidateForm();

  return (
    <pre>
      <button type="button" onClick={validateForm}>
        Validate
      </button>
      <hr />
      {JSON.stringify(records, null, 2)}
      <hr />
      {JSON.stringify(errors, null, 2)}
    </pre>
  );
};

FormProvider.Debugger = Debugger;

export { FormProvider };
