import { Button, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ExploratoryTaskIcon } from 'src/assets/icons/exploratory-task-icon.svg';
import { ReactComponent as FunctionalTaskIcon } from 'src/assets/icons/functional-task-icon.svg';
import { components } from 'src/common/schema';
import { useModuleTasksContext } from '../context';
import { useModuleTasks } from '../hooks';

const FunctionalTasks = () => {
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
        {t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_FUNCTIONAL_TASKS_LABEL')}
      </SM>
      <Button
        isBasic
        isPill={false}
        onClick={() => handleClick('explorative-bug')}
      >
        <Button.StartIcon>
          <ExploratoryTaskIcon />
        </Button.StartIcon>
        {t(
          '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_FUNCTIONAL_TASK_EXPLORATORY_BUTTON'
        )}
      </Button>
      <Button isBasic isPill={false} onClick={() => handleClick('bug')}>
        <Button.StartIcon>
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
