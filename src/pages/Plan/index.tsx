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

interface Module {
  type: string;
  variant: string;
  output: object;
}

const Plan = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [status, setStatus] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { values } = useFormikContext<FormBody>();
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
        setModules(data.config.modules);
        setStatus(data.status);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, [activeWorkspace, planId]);

  const handleSave = () => {
    setIsSaving(true);
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
      .finally(() => setIsSaving(false));
  };

  const handleQuoteRequest = () => {
    setIsSaving(true);
    // save an updated version of the plan
    fetch(
      `http://localhost:3000/api/workspaces/${activeWorkspace?.id}/plans/${planId}`,
      {
        method: 'PATCH',
        body: JSON.stringify(values),
        headers: {},
      }
    )
      .then((response) => response.json())
      .then(() => {
        // if the save is successful, change the status of the plan
        fetch(
          `http://localhost:3000/api/workspaces/${activeWorkspace?.id}/plans/${planId}/status`,
          {
            method: 'PATCH',
            headers: {},
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // update the status in the state
            setStatus(data.status);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error))
      .finally(() => setIsSaving(false));
  };

  return (
    <ModuleWrapper>
      <Page title="temp" route="temp">
        <Grid>
          <Row>
            <Col sm="8">{modules.map((module) => getModule(module.type))}</Col>
            <Col sm="4">
              <Button
                disabled={isSaving || status !== 'draft'}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                disabled={isSaving || status === 'pending_review'}
                onClick={handleQuoteRequest}
              >
                Request quotation
              </Button>
              <ModuleWrapper.Debugger />
            </Col>
          </Row>
        </Grid>
      </Page>
    </ModuleWrapper>
  );
};

export default Plan;
