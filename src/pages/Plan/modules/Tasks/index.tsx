import { ModuleTasksContextProvider } from './context';
import { AddTaskButton } from './parts/AddTaskButton';
import { TasksList } from './parts/TasksList';
import { TasksModal } from './parts/TasksModal';

const Tasks = () => (
  <ModuleTasksContextProvider>
    <AddTaskButton />
    <TasksModal />
    <TasksList />
  </ModuleTasksContextProvider>
);

export { Tasks };
