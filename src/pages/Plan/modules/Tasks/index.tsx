import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { ModuleTasksContextProvider } from './context';
import { AddTaskButton } from './parts/AddTaskButton';
import { TasksList } from './parts/TasksList';
import { TasksModal } from './parts/TasksModal';

const Tasks = () => (
  <ModuleTasksContextProvider>
    <Grid>
      <Row>
        <Col sm={4}>
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
