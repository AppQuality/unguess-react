import { Button, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ExploratoryTaskIcon } from 'src/assets/icons/exploratory-task-icon.svg';
import { ReactComponent as FunctionalTaskIcon } from 'src/assets/icons/functional-task-icon.svg';
import { useTasks } from '../hooks';

const FunctionalTasks = () => {
  const { add } = useTasks();
  const { t } = useTranslation();

  return (
    <>
      <SM isBold>
        {t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_FUNCTIONAL_TASKS_LABEL')}
      </SM>
      <Button isBasic isPill onClick={() => add('bug')}>
        <Button.StartIcon style={{ width: 35, height: 35 }}>
          <ExploratoryTaskIcon />
        </Button.StartIcon>
        {t(
          '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_FUNCTIONAL_TASK_EXPLORATORY_BUTTON'
        )}
      </Button>
      <Button isBasic isPill onClick={() => add('bug')}>
        <Button.StartIcon style={{ width: 35, height: 35 }}>
          <FunctionalTaskIcon />
        </Button.StartIcon>
        {t(
          '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_FUNCTIONAL_TASK_FUNCTIONAL_BUTTON'
        )}
      </Button>
    </>
  );
};

export { FunctionalTasks };
