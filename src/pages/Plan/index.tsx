import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { FormikHelpers } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetWorkspacesByWidPlansAndPidQuery } from 'src/features/api';
import { FormProvider } from 'src/features/modules/FormProvider';
import { FormBody } from 'src/features/modules/types';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { Page } from 'src/features/templates/Page';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { Controls } from './Controls';
import { Dates } from './Dates';
import { Tasks } from './Tasks';
import { Title } from './Title';

const ModulesList = () => {
  const { getModules } = useModuleConfiguration();
  const getModule = (type: string) => {
    switch (type) {
      case 'title':
        return <Title key="title" />;
      case 'tasks':
        return <Tasks key="tasks" />;
      case 'dates':
        return <Dates key="dates" />;
      default:
        return null;
    }
  };
  return <>{getModules().map((module) => getModule(module.type))}</>;
};

const Plan = () => {
  const { planId } = useParams();
  const { activeWorkspace } = useActiveWorkspace();

  const { data: plan } = useGetWorkspacesByWidPlansAndPidQuery({
    wid: Number(activeWorkspace?.id).toString(),
    pid: Number(planId).toString(),
  });

  const [initialValues, setInitialValues] = useState<FormBody>({
    status: 'draft',
    modules: [],
  });

  useEffect(() => {
    if (!plan) return;
    setInitialValues({
      status: plan.status,
      modules: plan.config.modules,
    });
  }, [plan]);

  const handleSubmit = useCallback(
    (values: FormBody, helpers: FormikHelpers<FormBody>) => {
      helpers.setSubmitting(true);
      fetch(`/api/workspaces/${activeWorkspace?.id}/plans/${planId}`, {
        method: 'PATCH',
        // add body, a json of values
        body: JSON.stringify({
          config: {
            modules: values.modules,
          },
        }),
        headers: {},
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error(error))
        .finally(() => helpers.setSubmitting(false));
    },
    [activeWorkspace, planId]
  );

  return (
    <FormProvider onSubmit={handleSubmit} initialValues={initialValues}>
      <Page title="temp" route="temp">
        <Grid>
          <Row>
            <Col sm="8">
              <ModulesList />
            </Col>
            <Col sm="4">
              <Controls />
            </Col>
          </Row>
        </Grid>
      </Page>
    </FormProvider>
  );
};

export default Plan;
