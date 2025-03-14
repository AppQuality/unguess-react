import { appTheme } from 'src/app/theme';
import { useModuleTasks } from '../hooks';
import { TaskItemNav } from './TaskItemNav';

const TasksListNav = () => {
  const { value } = useModuleTasks();

  return (
    <div data-qa="tasks-module-nav" style={{ marginBottom: appTheme.space.md }}>
      {value.map((task) => (
        <TaskItemNav key={task.key} task={task} />
      ))}
    </div>
  );
};

export { TasksListNav };
