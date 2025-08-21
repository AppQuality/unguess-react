import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ExploratoryTaskIcon } from 'src/assets/icons/exploratory-task-icon.svg';
import { ReactComponent as FunctionalTaskIcon } from 'src/assets/icons/functional-task-icon.svg';
import { useHandleModalItemClick } from '../../utils';
import { ButtonsContainer } from './ButtonsContainer';
import { TaskTypeTitle } from './TaskTypeTitle';

const FunctionalTasks = () => {
  const { t } = useTranslation();
  const handleModalItemClick = useHandleModalItemClick();

  return (
    <>
      <TaskTypeTitle>
        {t(
          '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_FUNCTIONAL_TASKS_LABEL'
        ).toUpperCase()}
      </TaskTypeTitle>
      <ButtonsContainer>
        <Button
          isBasic
          isPill={false}
          onClick={() => handleModalItemClick('explorative-bug')}
        >
          <Button.StartIcon>
            <ExploratoryTaskIcon />
          </Button.StartIcon>
          {t(
            '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_FUNCTIONAL_TASK_EXPLORATORY_BUTTON'
          )}
        </Button>
        <Button
          isBasic
          isPill={false}
          onClick={() => handleModalItemClick('bug')}
        >
          <Button.StartIcon>
            <FunctionalTaskIcon />
          </Button.StartIcon>
          {t(
            '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_FUNCTIONAL_TASK_FUNCTIONAL_BUTTON'
          )}
        </Button>
      </ButtonsContainer>
    </>
  );
};

export { FunctionalTasks };
