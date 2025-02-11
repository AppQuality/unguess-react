import { Formik, useFormikContext } from 'formik';
import { ReactNode } from 'react';
import { FormBody } from './types';

const ModuleWrapper = ({ children }: { children: ReactNode }) => {
  const initialValues: FormBody = { modules: [] };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log('Submitted values:', values);
      }}
    >
      {() => children}
    </Formik>
  );
};

const Debugger = () => {
  const { values } = useFormikContext<FormBody>();

  return <pre>{JSON.stringify(values, null, 2)}</pre>;
};

ModuleWrapper.Debugger = Debugger;

export { ModuleWrapper };
