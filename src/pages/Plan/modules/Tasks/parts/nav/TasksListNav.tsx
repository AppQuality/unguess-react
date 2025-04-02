import { useModuleTasks } from '../../hooks';
import { TaskItemNav } from './TaskItemNav';

const TasksListNav = () => {
  const { value } = useModuleTasks();

  return (
    <div data-qa="tasks-module-nav">
      {value.map((task) => (
        <TaskItemNav key={task.key} task={task} />
      ))}
    </div>
  );
};

export { TasksListNav };
