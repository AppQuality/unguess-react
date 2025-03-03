import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { FormikHelpers, useFormikContext } from 'formik';
import { FormProvider } from 'src/features/modules/FormProvider';
import { Page } from 'src/features/templates/Page';
import { FormBody } from 'src/features/modules/types';
import { Tasks } from './Tasks';
import { Title } from './Title';
import { Dates } from './Dates';
import { Controls } from './Controls';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';

const ModulesList = () => {
  const { values } = useFormikContext<FormBody>();
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
  return <>{values.modules.map((module) => getModule(module.type))}</>;
};

const Plan = () => {
  const { planId } = useParams();
  const { activeWorkspace } = useActiveWorkspace();

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
    <FormProvider onSubmit={handleSubmit}>
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
