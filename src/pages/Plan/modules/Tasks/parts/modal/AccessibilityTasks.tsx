import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as AccessibilityTaskIcon } from 'src/assets/icons/accessibility-task-icon.svg';
import { useHandleModalItemClick } from '../../utils';
import { ButtonsContainer } from './ButtonsContainer';
import { TaskTypeTitle } from './TaskTypeTitle';

const AccessibilityTasks = () => {
  const { t } = useTranslation();
  const handleModalItemClick = useHandleModalItemClick();

  return (
    <>
      <TaskTypeTitle isBold>
        {' '}
        {t(
          '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_ACCESSIBILITY_TASKS_LABEL'
        ).toUpperCase()}
      </TaskTypeTitle>
      <ButtonsContainer>
        <Button
          isBasic
          isPill={false}
          onClick={() => handleModalItemClick('accessibility')}
        >
          <Button.StartIcon>
            <AccessibilityTaskIcon />
          </Button.StartIcon>
          {t(
            '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_ACCESSIBILITY_TASK_ACCESSIBILITY_BUTTON'
          )}
        </Button>
      </ButtonsContainer>
    </>
  );
};

export { AccessibilityTasks };
