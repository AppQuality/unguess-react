import {
  Card,
  Ellipsis,
  MD,
  Message,
  Span,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { appTheme } from 'src/app/theme';
import { components } from 'src/common/schema';
import styled from 'styled-components';
import { useModuleTasks } from '../../hooks';
import { getIconFromTaskOutput } from '../../utils';

const StyledCard = styled(Card)`
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  margin: ${({ theme }) => theme.space.xs} 0;
  background-color: transparent;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

const TaskItemNavLink = styled(Link)`
  &.isCurrent {
    ${StyledCard} {
      background-color: white;
    }
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
    <TaskItemNavLink
      to={`task-${key + 1}`}
      containerId="main"
      duration={500}
      offset={-200}
      smooth
      spy
      isDynamic
      style={{ textDecoration: 'none' }}
      activeClass="isCurrent"
    >
      <StyledCard
        key={key}
        data-qa="task-item-nav"
        {...(hasErrors && {
          style: {
            borderColor: appTheme.palette.red[900],
          },
        })}
      >
        <StyledContainer>
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
        </StyledContainer>
        {hasErrors && (
          <Message validation="error" style={{ marginTop: appTheme.space.sm }}>
            {t('__PLAN_PAGE_MODULE_TASKS_GENERIC_TASK_ERROR')}
          </Message>
        )}
      </StyledCard>
    </TaskItemNavLink>
  );
};

export { TaskItemNav };
