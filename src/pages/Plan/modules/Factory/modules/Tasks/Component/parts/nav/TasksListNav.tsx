import { DraggableList } from '@appquality/unguess-design-system';
import { triggerPostMoveFlash } from '@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash';
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { isTaskData, useModuleTasks } from '../../hooks';
import { TaskItemNav } from './TaskItemNav';

const TasksListNav = () => {
  const { value, setOutput } = useModuleTasks();

  useEffect(
    () =>
      monitorForElements({
        canMonitor({ source }) {
          return isTaskData(source.data);
        },
        onDrop({ location, source }) {
          const target = location.current.dropTargets[0];
          if (!target) {
            return;
          }

          const sourceData = source.data;
          const targetData = target.data;

          if (!isTaskData(sourceData) || !isTaskData(targetData)) {
            return;
          }

          const indexOfSource = value.findIndex(
            (task) => task.id === sourceData.taskId
          );
          const indexOfTarget = value.findIndex(
            (task) => task.id === targetData.taskId
          );

          if (indexOfTarget < 0 || indexOfSource < 0) {
            return;
          }

          const closestEdgeOfTarget = extractClosestEdge(targetData);

          // Using `flushSync` so we can query the DOM straight after this line
          flushSync(() => {
            // Create a new array for immutability
            const newList = reorderWithEdge({
              list: value,
              startIndex: indexOfSource,
              indexOfTarget,
              closestEdgeOfTarget,
              axis: 'vertical',
            });
            setOutput([...newList]); // ensure a new array reference
          });
          // Being simple and just querying for the task after the drop.
          // We could use react context to register the element in a lookup,
          // and then we could retrieve that element after the drop and use
          // `triggerPostMoveFlash`. But this gets the job done.
          const element = document.querySelector(
            `[data-task-id="${sourceData.taskId}"]`
          );
          if (element instanceof HTMLElement) {
            triggerPostMoveFlash(element);
          }
        },
      }),
    [value]
  );

  return (
    <DraggableList data-qa="tasks-module-nav">
      {value.map((task, i) => (
        <TaskItemNav key={task.id} task={task} index={i} />
      ))}
    </DraggableList>
  );
};

export { TasksListNav };
