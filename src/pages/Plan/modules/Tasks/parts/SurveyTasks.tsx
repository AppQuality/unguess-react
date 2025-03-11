import { Button, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as SurveyTaskIcon } from 'src/assets/icons/survey-task-icon.svg';
import { useTasks } from '../hooks';
import { useModuleTasksContext } from '../context';

const SurveyTasks = () => {
  const { add } = useTasks();
  const { t } = useTranslation();
  const { setModalRef } = useModuleTasksContext();

  const handleClick = () => {
    add('bug');
    setModalRef(null);
  };

  return (
    <>
      <SM isBold>
        {t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_SURVEY_TASKS_LABEL')}
      </SM>
      <Button isBasic isPill={false} onClick={handleClick}>
        <Button.StartIcon>
          <SurveyTaskIcon />
        </Button.StartIcon>
        {t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_SURVEY_TASK_SURVEY_BUTTON')}
      </Button>
    </>
  );
};

export { SurveyTasks };
