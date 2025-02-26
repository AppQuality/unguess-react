import {
  Col,
  Grid,
  Row,
  Card,
  LG,
  Button,
  Tabs,
} from '@appquality/unguess-design-system';
import { useFormikContext, useFormik, FormikProvider } from 'formik';
import { ModuleWrapper } from 'src/features/modules/ModuleWrapper';
import { Page } from 'src/features/templates/Page';
import { FormBody } from 'src/features/modules/types';
import styled from 'styled-components';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { Tasks } from './Tasks';
import { Title } from './Title';
import { Dates } from './Dates';
import { Controls } from './Controls';
import { Instructions } from './Instructions';

const MODULES_BY_TAB = {
  details: [
    { type: 'title', label: 'Project Title' },
    { type: 'dates', label: 'Campaign Dates' },
  ],
  instructions: [{ type: 'tasks', label: 'Tasks' }],
  target: [], // Target profile modules will go here
};

const StyledCard = styled(Card)`
  padding: 0;
`;

const TabContent = styled.div`
  padding: ${({ theme }) => theme.space.xxl};
`;

const ModulesList = ({ tabId }: { tabId: string }) => {
  const { values, setFieldValue } = useFormikContext<FormBody>();
  const availableModules =
    MODULES_BY_TAB[tabId as keyof typeof MODULES_BY_TAB] || [];

  const addModule = (type: string) => {
    if (!values.modules.find((m) => m.type === type)) {
      setFieldValue('modules', [...values.modules, { type }]);
    }
  };

  const getModule = (type: string) => {
    switch (type) {
      case 'title':
        return <Title />;
      case 'tasks':
        return <Tasks />;
      case 'dates':
        return <Dates />;
      case 'instructions':
        return <Instructions />;
      default:
        return null;
    }
  };

  const filteredModules = values.modules.filter((module) =>
    availableModules.some((m) => m.type === module.type)
  );

  return (
    <>
      {filteredModules.map((module) => (
        <Card key={module.type}>{getModule(module.type)}</Card>
      ))}

      {filteredModules.length < availableModules.length && (
        <Card>
          <LG tag="h4">Add a new section</LG>
          <div>
            {availableModules.map((module) => {
              const isDisabled = values.modules.some(
                (m) => m.type === module.type
              );
              return (
                <Button
                  key={module.type}
                  onClick={() => addModule(module.type)}
                  disabled={isDisabled}
                  isBasic
                >
                  {module.label}
                </Button>
              );
            })}
          </div>
        </Card>
      )}
    </>
  );
};

const Plan = () => {
  const formik = useFormik({
    initialValues: {
      modules: [],
    },
    onSubmit: (values) => {
      // Handle form submission
    },
  });

  return (
    <FormikProvider value={formik}>
      <ModuleWrapper>
        <Page title="Bug hunting 1" route="temp" excludeMarginBottom>
          <LayoutWrapper isNotBoxed>
            <Grid>
              <Row>
                <Col size={8}>
                  <StyledCard>
                    <Tabs>
                      <Tabs.Panel id="details" title="Activity details">
                        <TabContent>
                          <ModulesList tabId="details" />
                        </TabContent>
                      </Tabs.Panel>
                      <Tabs.Panel id="target" title="Target profile">
                        <TabContent>
                          {/* TODO: Implement target profile content */}
                          <div>Target Profile Content</div>
                        </TabContent>
                      </Tabs.Panel>
                      <Tabs.Panel
                        id="instructions"
                        title="Activity instructions"
                      >
                        <TabContent>
                          <Instructions />
                          <ModulesList tabId="instructions" />
                        </TabContent>
                      </Tabs.Panel>
                    </Tabs>
                  </StyledCard>
                </Col>
                <Col sm="4">
                  <Card>
                    <Controls />
                  </Card>
                </Col>
              </Row>
            </Grid>
          </LayoutWrapper>
        </Page>
      </ModuleWrapper>
    </FormikProvider>
  );
};

export default Plan;
