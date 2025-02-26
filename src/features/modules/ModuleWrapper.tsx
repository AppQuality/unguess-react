import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { components } from 'src/common/schema';
import { useParams } from 'react-router-dom';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { FormBody } from './types';
import {
  useGetWorkspacesByWidPlansAndPidQuery,
  useGetWorkspacesByWidProjectsAndPidCampaignsQuery,
  usePatchWorkspacesByWidPlansAndPidMutation,
} from '../api';

const ModuleWrapper = ({ children }: { children: ReactNode }) => {
  const { planId } = useParams();
  const { activeWorkspace } = useActiveWorkspace();

  const {
    data: planConf,
    isLoading,
    isError,
  } = useGetWorkspacesByWidPlansAndPidQuery(
    {
      wid: activeWorkspace?.id.toString() || '',
      pid: planId || '',
    },
    { skip: !activeWorkspace || !planId }
  );

  const [patchPlan, { isLoading: isPatching }] =
    usePatchWorkspacesByWidPlansAndPidMutation();

  const [initialValues, setInitialValues] = useState<FormBody>({
    status: 'draft',
    modules: [],
  });

  useEffect(() => {
    if (!activeWorkspace) return;
    if (!planId) return;

    if (planConf) {
      setInitialValues({
        status: planConf.status,
        modules: planConf.config.modules,
      });
    }
  }, [activeWorkspace, planId, planConf]);

  const handleSubmit = useCallback(
    (values: FormBody, helpers: FormikHelpers<FormBody>) => {
      helpers.setSubmitting(true);
      patchPlan({
        wid: activeWorkspace?.id.toString() || '',
        pid: planId || '',
        body: {
          config: {
            modules: values.modules,
          },
        },
      })
        .unwrap()
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error(error))
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
      <Form>{children}</Form>
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
