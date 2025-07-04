import {
  Ellipsis,
  MD,
  Message,
  Draggable,
  DraggableList,
  Span,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { appTheme } from 'src/app/theme';
import { components } from 'src/common/schema';
import styled from 'styled-components';
import { useModuleTasks } from '../../hooks';
import { getIconFromTaskOutput } from '../../utils';
import { useEffect, useRef, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

const StyledDraggableContent = styled(Draggable.Content)`
  min-width: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

const StyledDraggableListItem = styled(DraggableList.Item)`
  display: block;
`;

const StyledDraggable = styled(Draggable)<{ $dragging: boolean }>`
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

const ModuleIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 2px;
`;

const TaskItemNav = ({
  task,
}: {
  task: components['schemas']['OutputModuleTask'] & { key: number };
}) => {
  const { t } = useTranslation();
  const { error } = useModuleTasks();
  const { key } = task;
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    return draggable({
      element: el,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, []);

  const titleError =
    error && typeof error === 'object' && `tasks.${key}.title` in error
      ? error[`tasks.${key}.title`]
      : false;
  const descriptionError =
    error && typeof error === 'object' && `tasks.${key}.description` in error
      ? error[`tasks.${key}.description`]
      : false;
  const invalidUrlError =
    error && typeof error === 'object' && `tasks.${key}.url` in error
      ? error[`tasks.${key}.url`]
      : false;

  const hasErrors = titleError || descriptionError || invalidUrlError;
  const hasPlaceholder = !task.title;

  return (
    <StyledDraggableListItem key={key} data-qa="task-item-nav">
      <TaskItemNavLink
        to={`task-${key + 1}`}
        containerId="main"
        duration={500}
        offset={-200}
        smooth
        spy
        isDynamic
        activeClass="isCurrent"
      >
        <StyledDraggable ref={ref} $dragging={dragging}>
          <Draggable.Grip style={{ cursor: 'grab' }} />
          <StyledDraggableContent>
            <ModuleIconContainer>
              {getIconFromTaskOutput(task)}
            </ModuleIconContainer>
            <MD color={appTheme.palette.blue[600]} style={{ minWidth: '10px' }}>
              <Ellipsis title={task.title}>
                {key + 1}.{' '}
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
                style={{ marginTop: appTheme.space.sm }}
              >
                {t('__PLAN_PAGE_MODULE_TASKS_GENERIC_TASK_ERROR')}
              </Message>
            )}
          </StyledDraggableContent>
        </StyledDraggable>
      </TaskItemNavLink>
    </StyledDraggableListItem>
  );
};

export { TaskItemNav };
