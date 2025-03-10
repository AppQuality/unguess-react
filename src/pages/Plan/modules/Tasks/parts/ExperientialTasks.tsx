import { Button, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ThinkingAloudTaskIcon } from 'src/assets/icons/thinking-aloud-task-icon.svg';
import { useTasks } from '../hooks';

const ExperientialTasks = () => {
  const { add } = useTasks();
  const { t } = useTranslation();

  return (
    <>
      <SM isBold>
        {t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_EXPERIENTIAL_TASKS_LABEL')}
      </SM>
      <Button isBasic isPill onClick={() => add('video')}>
        <Button.StartIcon style={{ width: 35, height: 35 }}>
          <ThinkingAloudTaskIcon />
        </Button.StartIcon>
        {t(
          '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_EXPERIENTIAL_TASK_THINKING_ALOUD_BUTTON'
        )}
      </Button>
    </>
  );
};

export { ExperientialTasks };
