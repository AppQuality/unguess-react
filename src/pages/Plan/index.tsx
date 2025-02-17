import { ModuleWrapper } from 'src/features/modules/ModuleWrapper';
import { Page } from 'src/features/templates/Page';
import { Tasks } from './Tasks';
import { Title } from './Title';
import { Dates } from './Dates';
import { Button, Col, Grid, Row } from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useFormikContext } from 'formik';
import { FormBody } from 'src/features/modules/types';
import { Controls } from './Controls';

interface Module {
  type: string;
  variant: string;
  output: object;
}

const Plan = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const { planId } = useParams();
  const { activeWorkspace } = useActiveWorkspace();

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

  return (
    <ModuleWrapper>
      <Page title="temp" route="temp">
        <Grid>
          <Row>
            <Col sm="8">{modules.map((module) => getModule(module.type))}</Col>
            <Col sm="4">
              <Controls />
            </Col>
          </Row>
        </Grid>
      </Page>
    </ModuleWrapper>
  );
};

export default Plan;
