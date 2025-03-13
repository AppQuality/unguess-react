import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { ModuleTasksContextProvider } from './context';
import { AddTaskButton, TasksList, TasksListNav, TasksModal } from './parts';

const Tasks = () => (
  <ModuleTasksContextProvider>
    <Grid>
      <Row>
        <Col sm={4}>
          <TasksListNav />
          <AddTaskButton />
          <TasksModal />
        </Col>
        <Col sm={8}>
          <TasksList />
        </Col>
      </Row>
    </Grid>
  </ModuleTasksContextProvider>
);

export { Tasks };
