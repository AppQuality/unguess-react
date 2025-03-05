import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { FormikHelpers, useFormikContext } from 'formik';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider } from 'src/features/modules/FormProvider';
import { FormBody } from 'src/features/modules/types';
import { Page } from 'src/features/templates/Page';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { Controls } from './Controls';
import { Dates } from './Dates';
import { Tasks } from './Tasks';
import { Title } from './Title';

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
  return (
    <FormProvider>
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
