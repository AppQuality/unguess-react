import { Formik, useFormikContext } from 'formik';
import { ReactNode } from 'react';
import { components } from 'src/common/schema';
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

const useModuleContext = <T extends components['schemas']['Module']['type']>(
  moduleName: T
) => {
  type ModType = components['schemas']['Module'] & { type: T };
  const { values, setFieldValue } = useFormikContext<FormBody>();

  const module: ModType | undefined = values.modules.find(
    (m): m is ModType => m.type === moduleName
  );

  return {
    value: module,
    set: (value: Omit<ModType, 'type' | 'variant'>) => {
      if (module) {
        setFieldValue(
          'modules',
          values.modules.map((m) =>
            m.type === moduleName ? { ...m, ...value } : m
          )
        );
      } else {
        setFieldValue('modules', [
          ...values.modules,
          { ...value, type: moduleName },
        ]);
      }
    },
    remove: () => {
      setFieldValue(
        'modules',
        values.modules.filter((m) => m.type !== moduleName)
      );
    },
  };
};

export { ModuleWrapper, useModuleContext };
