import { Button, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AccessibilityTaskIcon } from 'src/assets/icons/accessibility-task-icon.svg';
import { useHandleModalItemClick } from '../../utils';
import { ButtonsContainer } from './ButtonsContainer';

const AccessibilityTasks = () => {
  const { t } = useTranslation();
  const handleModalItemClick = useHandleModalItemClick();

  return (
    <>
      <SM isBold color={appTheme.palette.grey[600]}>
        {t(
          '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_ACCESSIBILITY_TASKS_LABEL'
        ).toUpperCase()}
      </SM>
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
