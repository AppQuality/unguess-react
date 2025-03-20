import { Button, Modal, ModalClose } from '@appquality/unguess-design-system';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useModuleTasks } from '../../hooks';

const DeleteTaskConfirmationModal = ({
  state,
}: {
  state: [
    {
      isOpen: boolean;
      taskKey: number;
    },
    Dispatch<
      SetStateAction<{
        isOpen: boolean;
        taskKey: number;
      }>
    >
  ];
}) => {
  const { t } = useTranslation();
  const { remove } = useModuleTasks();

  const onQuit = () => {
    state[1]({
      isOpen: false,
      taskKey: 0,
    });
  };

  const onConfirm = () => {
    remove(state[0].taskKey);
    state[1]({
      isOpen: false,
      taskKey: 0,
    });
  };

  if (!state[0].isOpen) return null;

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
