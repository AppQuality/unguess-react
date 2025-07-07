import { ModuleTasksContextProvider } from './context';
import { TasksList } from './parts';

const Tasks = () => (
  <ModuleTasksContextProvider>
    <TasksList />
  </ModuleTasksContextProvider>
);

export default Tasks;
