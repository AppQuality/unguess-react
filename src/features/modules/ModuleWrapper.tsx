import { Formik, FormikHelpers, useFormikContext } from 'formik';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { components } from 'src/common/schema';
import { FormBody } from './types';
import { useParams } from 'react-router-dom';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { da } from 'date-fns/locale';

const ModuleWrapper = ({ children }: { children: ReactNode }) => {
  const { planId } = useParams();
  const { activeWorkspace } = useActiveWorkspace();

  const [initialValues, setInitialValues] = useState<FormBody>({
    status: 'draft',
    modules: [],
  });

  useEffect(() => {
    if (!activeWorkspace) return;
    if (!planId) return;
    fetch(
      `http://localhost:3000/api/workspaces/${activeWorkspace?.id}/plans/${planId}`,
      {
        method: 'GET',
        headers: {},
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('modules: ', 'setting initial VAlues');
        setInitialValues({
          status: data.status,
          modules: data.config.modules,
        });
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, [activeWorkspace, planId]);

  const handleSubmit = useCallback(
    (values: FormBody, helpers: FormikHelpers<FormBody>) => {
      helpers.setSubmitting(true);
      fetch(
        `http://localhost:3000/api/workspaces/${activeWorkspace?.id}/plans/${planId}`,
        {
          method: 'PATCH',
          // add body, a json of values
          body: JSON.stringify(values),
          headers: {},
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log(error))
        .finally(() => helpers.setSubmitting(false));
    },
    [activeWorkspace, planId]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
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
