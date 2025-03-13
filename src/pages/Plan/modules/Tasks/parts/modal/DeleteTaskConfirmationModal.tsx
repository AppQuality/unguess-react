import { Button, Modal, ModalClose } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useModuleTasksContext } from '../../context';
import { useModuleTasks } from '../../hooks';

const DeleteTaskConfirmationModal = ({ taskKey }: { taskKey: number }) => {
  const { t } = useTranslation();
  const { isConfirmationModalOpen, setIsConfirmationModalOpen } =
    useModuleTasksContext();
  const { remove } = useModuleTasks();

  const onQuit = () => {
    setIsConfirmationModalOpen(false);
  };

  const onConfirm = () => {
    remove(taskKey);
    setIsConfirmationModalOpen(false);
  };

  if (!isConfirmationModalOpen) return null;

  return (
    <Modal onClose={onQuit}>
      <Modal.Header isDanger>
        {t('__PLAN_PAGE_MODULE_TASKS_MODAL_CONFIRMATION_REMOVE_TASK_TITLE')}
      </Modal.Header>
      <Modal.Body>
        {t(
          '__PLAN_PAGE_MODULE_TASKS_MODAL_CONFIRMATION_REMOVE_TASK_DESCRIPTION'
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ paddingRight: 20 }}
          isDanger
          isLink
          onClick={onConfirm}
        >
          {t('__PLAN_PAGE_MODULE_TASKS_MODAL_CONFIRMATION_REMOVE_TASK_CONFIRM')}
        </Button>
        <Button isPrimary isAccent onClick={onQuit}>
          {t('__PLAN_PAGE_MODULE_TASKS_MODAL_CONFIRMATION_REMOVE_TASK_CANCEL')}
        </Button>
      </Modal.Footer>
      <ModalClose onClick={onQuit} />
    </Modal>
  );
};

export { DeleteTaskConfirmationModal };
