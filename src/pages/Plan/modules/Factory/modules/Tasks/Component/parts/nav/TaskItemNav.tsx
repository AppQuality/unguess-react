import {
  Draggable,
  DraggableList,
  Ellipsis,
  MD,
  Message,
  Span,
} from '@appquality/unguess-design-system';
import {
  attachClosestEdge,
  type Edge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { appTheme } from 'src/app/theme';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';
import { getTaskData, isTaskData, TTask, useModuleTasks } from '../../hooks';
import { getIconFromTaskOutput } from '../../utils';
import { DragPreview } from './DragPreview';
import { DropIndicator } from './drop-indicator';

const StyledDraggableContent = styled(Draggable.Content)`
  min-width: 0; // Ensures that the content does not overflow
  display: grid;
  grid-template-columns: 16px 1fr;
  grid-template-rows: 20px;
  align-items: center;
  column-gap: ${({ theme }) => theme.space.sm};
`;

const StyledDraggableListItem = styled(DraggableList.Item)`
  position: relative;
  display: block;
`;

const StyledDraggable = styled(Draggable)<{ $dragging?: boolean }>`
  opacity: ${({ $dragging }) => ($dragging ? 0.5 : 1)};
`;

const TaskItemNavLink = styled(Link)`
  display: block;
  text-decoration: none !important;
  &.isCurrent {
    background-color: white;
  }
  &.hasError {
    border-color: ${({ theme }) => theme.palette.red[600]};
  }
  ${Draggable} {
    background-color: transparent;
  }
`;

type TaskState =
  | {
      type: 'idle';
    }
  | {
      type: 'preview';
      container: HTMLElement;
    }
  | {
      type: 'is-dragging';
    }
  | {
      type: 'is-dragging-over';
      closestEdge: Edge | null;
    };
const idle: TaskState = { type: 'idle' };

const TaskItemNav = ({ task, index }: { task: TTask; index: number }) => {
  const [state, setState] = useState<TaskState>(idle);
  const { t } = useTranslation();
  const { error } = useModuleTasks();
  const { getPlanStatus } = useModuleConfiguration();
  const ref = useRef(null);
  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const isMobile = width < breakpointSm;

  useEffect(() => {
    if (getPlanStatus() !== 'draft') {
      return undefined;
    }
    const element = ref.current;
    if (!element) {
      return undefined;
    }
    return combine(
      draggable({
        element,
        getInitialData() {
          return getTaskData(task);
        },
        onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: '16px',
              y: '8px',
            }),
            render({ container }) {
              setState({ type: 'preview', container });
            },
          });
        },
        onDragStart() {
          setState({ type: 'is-dragging' });
        },
        onDrop() {
          setState(idle);
        },
      }),
      dropTargetForElements({
        element,
        canDrop({ source }) {
          // not allowing dropping on yourself
          if (source.element === element) {
            return false;
          }
          // only allowing tasks to be dropped on me
          return isTaskData(source.data);
        },
        getData({ input }) {
          const data = getTaskData(task);
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ['top', 'bottom'],
          });
        },
        getIsSticky() {
          return true;
        },
        onDragEnter({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          setState({ type: 'is-dragging-over', closestEdge });
        },
        onDrag({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          // Only need to update react state if nothing has changed.
          // Prevents re-rendering.
          setState((current) => {
            if (
              current.type === 'is-dragging-over' &&
              current.closestEdge === closestEdge
            ) {
              return current;
            }
            return { type: 'is-dragging-over', closestEdge };
          });
        },
        onDragLeave() {
          setState(idle);
        },
        onDrop() {
          setState(idle);
        },
      })
    );
  }, [task]);

  const titleError =
    error && typeof error === 'object' && `tasks.${task.id}.title` in error
      ? error[`tasks.${task.id}.title`]
      : false;
  const descriptionError =
    error &&
    typeof error === 'object' &&
    `tasks.${task.id}.description` in error
      ? error[`tasks.${task.id}.description`]
      : false;
  const invalidUrlError =
    error && typeof error === 'object' && `tasks.${task.id}.url` in error
      ? error[`tasks.${task.id}.url`]
      : false;

  const hasErrors = titleError || descriptionError || invalidUrlError;
  const hasPlaceholder = !task.title;

  return (
    <StyledDraggableListItem data-qa="task-item-nav">
      <TaskItemNavLink
        to={task.id}
        containerId="main"
        duration={500}
        offset={-200}
        smooth
        spy
        isDynamic
        activeClass="isCurrent"
      >
        <StyledDraggable
          ref={ref}
          data-task-id={task.id}
          $dragging={state.type === 'is-dragging'}
        >
          {!isMobile && getPlanStatus() === 'draft' && (
            <Draggable.Grip style={{ cursor: 'grab' }} />
          )}
          <StyledDraggableContent>
            {getIconFromTaskOutput(task)}
            <MD color={appTheme.palette.blue[600]} style={{ minWidth: '10px' }}>
              <Ellipsis title={task.title}>
                {index + 1}.{' '}
                <Span isBold>
                  {hasPlaceholder
                    ? t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_PLACEHOLDER_EMPTY')
                    : task.title}
                </Span>
              </Ellipsis>
            </MD>
            {hasErrors && (
              <Message
                validation="error"
                style={{ marginTop: appTheme.space.sm, gridColumn: 'span 2' }}
              >
                {t('__PLAN_PAGE_MODULE_TASKS_GENERIC_TASK_ERROR')}
              </Message>
            )}
          </StyledDraggableContent>
        </StyledDraggable>
      </TaskItemNavLink>
      {state.type === 'is-dragging-over' && state.closestEdge && (
        <DropIndicator edge={state.closestEdge} />
      )}
      {state.type === 'preview' &&
        createPortal(<DragPreview task={task} />, state.container)}
    </StyledDraggableListItem>
  );
};

export { TaskItemNav };
