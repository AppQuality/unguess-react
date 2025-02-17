import { ModuleWrapper } from 'src/features/modules/ModuleWrapper';
import { Page } from 'src/features/templates/Page';
import { Tasks } from './Tasks';
import { Title } from './Title';
import { Dates } from './Dates';
import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { Controls } from './Controls';
import { useFormikContext } from 'formik';
import { FormBody } from 'src/features/modules/types';

const Plan = () => {
  return (
    <ModuleWrapper>
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
    </ModuleWrapper>
  );
};

const ModulesList = () => {
  const { values } = useFormikContext<FormBody>();
  const getModule = (type: string) => {
    switch (type) {
      case 'title':
        return <Title />;
      case 'tasks':
        return <Tasks />;
      case 'dates':
        return <Dates />;
      default:
        return null;
    }
  };
  return <>{values.modules.map((module) => getModule(module.type))}</>;
};

export default Plan;
