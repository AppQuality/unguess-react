import {
  Button,
  ContainerCard,
  MD,
  Message,
  Span,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as TasksIcon } from 'src/assets/icons/tasks-icon.svg';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled from 'styled-components';
import { DeleteModuleConfirmationModal } from '../../modal/DeleteModuleConfirmationModal';
import { useModuleTasks } from '../hooks';
import { AddTaskButton } from './AddTaskButton';
import { TaskItem } from './TaskItem';
import { TasksModal } from './modal';

const StyledCard = styled(ContainerCard)`
  background-color: transparent;
  padding: 0;
  overflow: hidden;
`;

const TasksContainer = styled.div`
  padding: 0 ${({ theme }) => theme.space.md};
`;

const HeaderContainer = styled.div<{
  hasErrors?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space.md};
  background-color: ${({ hasErrors, theme }) =>
    hasErrors ? theme.palette.red[100] : theme.palette.blue[100]};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const TasksList = () => {
  const { value, error } = useModuleTasks();
  const { remove } = useModule('tasks');
  const { getPlanStatus } = useModuleConfiguration();
  const { t } = useTranslation();
  const { hasFeatureFlag } = useFeatureFlag();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };

  return (
    <>
      <StyledCard
        data-qa="tasks-module"
        {...(error && { style: { borderColor: appTheme.palette.red[900] } })}
      >
        <HeaderContainer hasErrors={!!error}>
          <TitleContainer>
            <TasksIcon
              color={
                error ? appTheme.palette.red[600] : appTheme.palette.blue[600]
              }
            />
            <MD isBold style={{ color: appTheme.palette.blue[600] }}>
              {t('__PLAN_PAGE_MODULE_TASKS_TITLE')}
            </MD>
          </TitleContainer>
          {hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) &&
            getPlanStatus() === 'draft' && (
              <Button isBasic isDanger size="small" onClick={handleDelete}>
                {t('__PLAN_PAGE_MODULE_TASKS_REMOVE_BUTTON')}
              </Button>
            )}
        </HeaderContainer>
        <div style={{ padding: appTheme.space.md }}>
          <MD isBold style={{ color: appTheme.palette.grey[800] }}>
            {t('__PLAN_PAGE_MODULE_TASKS_SUBTITLE')}
            <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
          </MD>
          {error && (
            <Message
              validation="error"
              style={{ marginTop: appTheme.space.md }}
            >
              {t('__PLAN_PAGE_MODULE_TASKS_GENERIC_ERROR')}
            </Message>
          )}
        </div>
        <TasksContainer>
          {value.map((task) => (
            <TaskItem key={task.key} task={task} />
          ))}
        </TasksContainer>
        {getPlanStatus() === 'draft' && <AddTaskButton />}
        <TasksModal />
      </StyledCard>
      {isOpenDeleteModal && (
        <DeleteModuleConfirmationModal
          onQuit={() => setIsOpenDeleteModal(false)}
          onConfirm={remove}
        />
      )}
    </>
  );
};

export { TasksList };
