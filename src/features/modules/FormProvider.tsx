import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { FormBody } from './types';

const FormProvider = ({
  children,
  onSubmit,
}: {
  children: ReactNode;
  onSubmit: (values: FormBody, helpers: FormikHelpers<FormBody>) => void;
}) => {
  const { planId } = useParams();
  const { activeWorkspace } = useActiveWorkspace();

  const [initialValues, setInitialValues] = useState<FormBody>({
    status: 'draft',
    modules: [],
  });

  useEffect(() => {
    if (!activeWorkspace) return;
    if (!planId) return;
    fetch(`/api/workspaces/${activeWorkspace?.id}/plans/${planId}`, {
      method: 'GET',
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        setInitialValues({
          status: data.status,
          modules: data.config.modules,
        });
      })
      .catch((error) => console.error(error));
  }, [activeWorkspace, planId]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
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
