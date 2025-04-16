import { Button, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ExploratoryTaskIcon } from 'src/assets/icons/exploratory-task-icon.svg';
import { ReactComponent as FunctionalTaskIcon } from 'src/assets/icons/functional-task-icon.svg';
import { appTheme } from 'src/app/theme';
import { useHandleModalItemClick } from '../../utils';
import { ButtonsContainer } from './ButtonsContainer';

const FunctionalTasks = () => {
  const { t } = useTranslation();
  const handleModalItemClick = useHandleModalItemClick();

  return (
    <>
      <SM isBold color={appTheme.palette.grey[600]}>
        {t(
          '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_FUNCTIONAL_TASKS_LABEL'
        ).toUpperCase()}
      </SM>
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
