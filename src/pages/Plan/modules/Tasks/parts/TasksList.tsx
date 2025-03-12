import { useModuleTasks } from '../hooks';
import { TaskItem } from './TaskItem';

const TasksList = () => {
  const { value } = useModuleTasks();

  return (
    <div id="tasks-list" data-qa="tasks-module">
      {value.map((task) => (
        <TaskItem key={task.key} task={task} />
      ))}
    </div>
  );
};

export { TasksList };
