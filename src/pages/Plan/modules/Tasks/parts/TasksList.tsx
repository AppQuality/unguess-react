import { Button, LG } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as TasksIcon } from 'src/assets/icons/tasks-icon.svg';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useModule } from 'src/features/modules/useModule';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled from 'styled-components';
import { useModuleTasks } from '../hooks';
import { AddTaskButton } from './AddTaskButton';
import { TaskItem } from './TaskItem';
import { TasksModal } from './modal';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const TasksList = () => {
  const { value } = useModuleTasks();
  const { remove } = useModule('tasks');
  const { t } = useTranslation();
  const { hasFeatureFlag } = useFeatureFlag();

  return (
    <div
      id="tasks-list"
      data-qa="tasks-module"
      style={{ marginBottom: appTheme.space.md }}
    >
      <HeaderContainer>
        <TitleContainer>
          <TasksIcon />
          <LG>{t('__PLAN_PAGE_MODULE_TASKS_TITLE')}</LG>
        </TitleContainer>
        {hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) && (
          <Button isBasic isDanger onClick={remove}>
            {t('__PLAN_PAGE_MODULE_TASKS_REMOVE_BUTTON')}
          </Button>
        )}
      </HeaderContainer>
      {value.map((task) => (
        <TaskItem key={task.key} task={task} />
      ))}
      <AddTaskButton />
      <TasksModal />
    </div>
  );
};

export { TasksList };
