import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as SurveyTaskIcon } from 'src/assets/icons/survey-task-icon.svg';
import { useHandleModalItemClick } from '../../utils';
import { ButtonsContainer } from './ButtonsContainer';
import { TaskTypeTitle } from './TaskTypeTitle';

const SurveyTasks = () => {
  const { t } = useTranslation();
  const handleModalItemClick = useHandleModalItemClick();

  return (
    <>
      <TaskTypeTitle>
        {t(
          '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_SURVEY_TASKS_LABEL'
        ).toUpperCase()}
      </TaskTypeTitle>
      <ButtonsContainer>
        <Button
          isBasic
          isPill={false}
          onClick={() => handleModalItemClick('survey')}
        >
          <Button.StartIcon>
            <SurveyTaskIcon />
          </Button.StartIcon>
          {t(
            '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_SURVEY_TASK_SURVEY_BUTTON'
          )}
        </Button>
      </ButtonsContainer>
    </>
  );
};

export { SurveyTasks };
