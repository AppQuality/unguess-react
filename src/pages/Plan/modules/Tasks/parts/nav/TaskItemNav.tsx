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
import { getIconFromTask } from '../../utils';

const StyledCard = styled(Card)`
  padding: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
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

  const hasErrors = titleError || descriptionError;
  const hasPlaceholder = !task.title;

  return (
    <Link
      to={`task-${key + 1}`}
      containerId="main"
      duration={500}
      offset={-20}
      smooth
      spy
      style={{ textDecoration: 'none' }}
    >
      <StyledCard
        key={key}
        data-qa="task-item-nav"
        {...(hasErrors && {
          style: {
            borderColor: appTheme.palette.red[600],
          },
        })}
      >
        <StyledContainer>
          {getIconFromTask(task)}
          <Ellipsis style={{ width: '95%' }}>
            <MD>
              {key + 1}.
              <Span isBold>
                {hasPlaceholder
                  ? t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_PLACEHOLDER_EMPTY')
                  : task.title}
              </Span>
            </MD>
          </Ellipsis>
        </StyledContainer>
        {hasErrors && (
          <Message validation="error" style={{ marginTop: appTheme.space.sm }}>
            {t('__PLAN_PAGE_MODULE_TASKS_GENERIC_TASK_ERROR')}
          </Message>
        )}
      </StyledCard>
    </Link>
  );
};

export { TaskItemNav };
