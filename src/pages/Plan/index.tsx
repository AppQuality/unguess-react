import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { FormProvider } from 'src/features/modules/FormProvider';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { Page } from 'src/features/templates/Page';
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

const Plan = () => (
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

export default Plan;
