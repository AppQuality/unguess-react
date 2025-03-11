import { Button, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ThinkingAloudTaskIcon } from 'src/assets/icons/thinking-aloud-task-icon.svg';
import { components } from 'src/common/schema';
import { useModuleTasksContext } from '../context';
import { useModuleTasks } from '../hooks';

const ExperientialTasks = () => {
  const { add } = useModuleTasks();
  const { t } = useTranslation();
  const { setModalRef } = useModuleTasksContext();

  const handleClick = (
    kind: components['schemas']['OutputModuleTask']['kind']
  ) => {
    add(kind);
    setModalRef(null);
  };

  return (
    <>
      <SM isBold>
        {t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_EXPERIENTIAL_TASKS_LABEL')}
      </SM>
      <Button isBasic isPill={false} onClick={() => handleClick('video')}>
        <Button.StartIcon>
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
