import { Button } from '@appquality/unguess-design-system';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as PlusIcon } from 'src/assets/icons/plus-icon.svg';
import { useModuleTasksContext } from '../context';

const AddTaskButton = () => {
  const { t } = useTranslation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { setModalRef } = useModuleTasksContext();

  return (
    <Button
      isPrimary
      isPill={false}
      ref={triggerRef}
      onClick={() => setModalRef(triggerRef.current)}
      isStretched
    >
      <Button.StartIcon>
        <PlusIcon />
      </Button.StartIcon>
      {t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_BUTTON')}
    </Button>
  );
};

export { AddTaskButton };
