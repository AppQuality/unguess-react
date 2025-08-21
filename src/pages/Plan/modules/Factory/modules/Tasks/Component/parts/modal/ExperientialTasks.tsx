import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ThinkingAloudTaskIcon } from 'src/assets/icons/thinking-aloud-task-icon.svg';
import { useHandleModalItemClick } from '../../utils';
import { ButtonsContainer } from './ButtonsContainer';
import { TaskTypeTitle } from './TaskTypeTitle';

const ExperientialTasks = () => {
  const { t } = useTranslation();
  const handleModalItemClick = useHandleModalItemClick();

  return (
    <>
      <TaskTypeTitle>
        {t(
          '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_EXPERIENTIAL_TASKS_LABEL'
        ).toUpperCase()}
      </TaskTypeTitle>
      <ButtonsContainer>
        <Button
          isBasic
          isPill={false}
          onClick={() => handleModalItemClick('video')}
        >
          <Button.StartIcon>
            <ThinkingAloudTaskIcon />
          </Button.StartIcon>
          {t(
            '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_EXPERIENTIAL_TASK_THINKING_ALOUD_BUTTON'
          )}
        </Button>
      </ButtonsContainer>
    </>
  );
};

export { ExperientialTasks };
