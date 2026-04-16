import {
  Button,
  FooterItem,
  Modal,
  ModalClose,
} from '@appquality/unguess-design-system';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAnalytics } from 'use-analytics';
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
  const { planId } = useParams();
  const { track } = useAnalytics();
  const { remove, value: tasks } = useModuleTasks();

  const onQuit = () => {
    state[1]({
      isOpen: false,
      taskId: '',
    });
  };

  const onConfirm = () => {
    // Find the task being deleted
    const taskToDelete = tasks.find((task) => task.id === state[0].taskId);

    // Track deletion only for AI-generated tasks
    if (taskToDelete?.isAiGeneratedInSession) {
      // Count remaining AI tasks after deletion (excluding the one being deleted)
      const remainingAiTaskCount = tasks.filter(
        (task) => task.isAiGeneratedInSession && task.id !== state[0].taskId
      ).length;

      track('aiTaskDeleted', {
        PlanID: planId || '',
        taskType: taskToDelete.kind,
        remainingAiTaskCount,
      });
    }

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
          <Button isPrimary isAccent onClick={onQuit}>
            {t(
              '__PLAN_PAGE_MODULE_TASKS_MODAL_CONFIRMATION_REMOVE_TASK_CANCEL'
            )}
          </Button>
        </FooterItem>
      </Modal.Footer>
      <ModalClose onClick={onQuit} />
    </Modal>
  );
};

export { DeleteTaskConfirmationModal };
