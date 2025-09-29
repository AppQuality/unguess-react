import {
  Button,
  FooterItem,
  IconButton,
  Modal,
  ModalClose,
  Tooltip,
} from '@appquality/unguess-design-system';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { useModuleTasks } from '../../hooks';

const DeleteTaskConfirmationModal = ({
  state,
}: {
  state: [
    {
      isOpen: boolean;
      taskId: string;
    },
    Dispatch<
      SetStateAction<{
        isOpen: boolean;
        taskId: string;
      }>
    >
  ];
}) => {
  const { t } = useTranslation();
  const { remove } = useModuleTasks();

  const onQuit = () => {
    state[1]({
      isOpen: false,
      taskId: '',
    });
  };

  const onConfirm = () => {
    remove(state[0].taskId);
    state[1]({
      isOpen: false,
      taskId: '',
    });
  };

  if (!state[0].isOpen) return null;

  return (
    <Modal onClose={onQuit} role="dialog">
      <Modal.Header isDanger>
        {t('__PLAN_PAGE_MODULE_TASKS_MODAL_CONFIRMATION_REMOVE_TASK_TITLE')}
      </Modal.Header>
      <Modal.Body>
        {t(
          '__PLAN_PAGE_MODULE_TASKS_MODAL_CONFIRMATION_REMOVE_TASK_DESCRIPTION'
        )}
      </Modal.Body>
      <Modal.Footer>
        <FooterItem>
          <Button isDanger isBasic onClick={onConfirm}>
            {t(
              '__PLAN_PAGE_MODULE_TASKS_MODAL_CONFIRMATION_REMOVE_TASK_CONFIRM'
            )}
          </Button>
        </FooterItem>
        <FooterItem>
          <Tooltip
            placement="start"
            type="light"
            size="small"
            content={t('__PLAN_PAGE_MODULE_TASKS_REMOVE_TOOLTIP_BUTTON')}
          >
            <IconButton isDanger>
              <TrashIcon />
            </IconButton>
          </Tooltip>
        </FooterItem>
      </Modal.Footer>
      <ModalClose onClick={onQuit} />
    </Modal>
  );
};

export { DeleteTaskConfirmationModal };
