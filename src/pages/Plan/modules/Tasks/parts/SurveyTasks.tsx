import { Button, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as SurveyTaskIcon } from 'src/assets/icons/survey-task-icon.svg';
import { useTasks } from '../hooks';

const SurveyTasks = () => {
  const { add } = useTasks();
  const { t } = useTranslation();

  return (
    <>
      <SM isBold>
        {t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_SURVEY_TASKS_LABEL')}
      </SM>
      <Button isBasic isPill onClick={() => add('bug')}>
        <Button.StartIcon style={{ width: 35, height: 35 }}>
          <SurveyTaskIcon />
        </Button.StartIcon>
        {t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_SURVEY_TASK_SURVEY_BUTTON')}
      </Button>
    </>
  );
};

export { SurveyTasks };
