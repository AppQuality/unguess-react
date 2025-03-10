import { useTasks } from '../hooks';
import { TaskItem } from './TaskItem';

const TasksList = () => {
  const { value } = useTasks();

  return (
    <div data-qa="tasks-module">
      {value.map((task) => (
        <TaskItem key={task.key} task={task} />
      ))}
    </div>
  );
};

export { TasksList };
