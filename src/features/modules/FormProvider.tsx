import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { FormBody } from './types';
import {
  useGetWorkspacesByWidPlansAndPidQuery,
  usePatchWorkspacesByWidPlansAndPidMutation,
} from '../api';

const FormProvider = ({ children }: { children: ReactNode }) => {
  const { planId } = useParams();
  const { activeWorkspace } = useActiveWorkspace();
  const { data } = useGetWorkspacesByWidPlansAndPidQuery({
    wid: activeWorkspace?.id.toString() ?? '',
    pid: planId?.toString() ?? '',
  });
  const [patchPlan] = usePatchWorkspacesByWidPlansAndPidMutation();

  const handleSubmit = useCallback(
    (values: FormBody, helpers: FormikHelpers<FormBody>) => {
      helpers.setSubmitting(true);
      patchPlan({
        wid: activeWorkspace?.id.toString() ?? '',
        pid: planId?.toString() ?? '',
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
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          helpers.setSubmitting(false);
        });
    },
    [activeWorkspace, planId]
  );

  const [initialValues, setInitialValues] = useState<FormBody>({
    status: 'draft',
    modules: [],
  });

  useEffect(() => {
    if (data) {
      setInitialValues({
        status: data?.status,
        modules: data?.config.modules,
      });
    }
  }, [data]);

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

FormProvider.Debugger = Debugger;

export { FormProvider };
