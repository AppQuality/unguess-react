import { useState } from 'react';
import { useModuleTasks } from '../../hooks';
import { TaskItemNav } from './TaskItemNav';
import { DraggableList } from '@appquality/unguess-design-system';

const TasksListNav = () => {
  const { value } = useModuleTasks();
  const [tasks, setTasks] = useState<typeof value>(value);

  // useEffect(() => {
  //   return monitorForElements({
  //     canMonitor({ source }) {
  //       return isTaskData(source.data);
  //     },
  //     onDrop({ location, source }) {
  //       const target = location.current.dropTargets[0];
  //       if (!target) {
  //         return;
  //       }

  //       const sourceData = source.data;
  //       const targetData = target.data;

  //       if (!isTaskData(sourceData) || !isTaskData(targetData)) {
  //         return;
  //       }

  //       const indexOfSource = tasks.findIndex((task) => task.id === sourceData.taskId);
  //       const indexOfTarget = tasks.findIndex((task) => task.id === targetData.taskId);

  //       if (indexOfTarget < 0 || indexOfSource < 0) {
  //         return;
  //       }

  //       const closestEdgeOfTarget = extractClosestEdge(targetData);

  //       // Using `flushSync` so we can query the DOM straight after this line
  //       flushSync(() => {
  //         setTasks(
  //           reorderWithEdge({
  //             list: tasks,
  //             startIndex: indexOfSource,
  //             indexOfTarget,
  //             closestEdgeOfTarget,
  //             axis: 'vertical',
  //           }),
  //         );
  //       });
  //       // Being simple and just querying for the task after the drop.
  //       // We could use react context to register the element in a lookup,
  //       // and then we could retrieve that element after the drop and use
  //       // `triggerPostMoveFlash`. But this gets the job done.
  //       const element = document.querySelector(`[data-task-id="${sourceData.taskId}"]`);
  //       if (element instanceof HTMLElement) {
  //         triggerPostMoveFlash(element);
  //       }
  //     },
  //   });
  // }, [tasks]);

  return (
    <DraggableList data-qa="tasks-module-nav">
      {tasks.map((task) => (
        <TaskItemNav key={task.key} task={task} />
      ))}
    </DraggableList>
  );
};

export { TasksListNav };
