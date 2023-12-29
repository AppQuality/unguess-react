import {
  Modal,
  Paragraph,
  Button,
  ModalClose,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const ModalBody = styled(Modal.Body)`
  max-height: 340px;
`;
export const DeleteCommentModal = ({
  setIsModalOpen,
  deleteCommentHandler,
  deleteCommentId,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
  deleteCommentHandler: (commentId: string) => void;
  deleteCommentId: string;
}) => {
  const { t } = useTranslation();

  const onQuit = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal onClose={onQuit}>
      <Modal.Header isDanger>
        {t('__BUG_COMMENTS_DELETE_MODAL_HEADER__')}
      </Modal.Header>
      <ModalBody>
        <Paragraph>{t('__BUG_COMMENTS_DELETE_MODAL_BODY__')}</Paragraph>
      </ModalBody>
      <Modal.Footer>
        <Button
          style={{ paddingRight: 20 }}
          id="comment-modal-delete"
          isDanger
          isLink
          onClick={() => deleteCommentHandler(deleteCommentId)}
        >
          {t('__BUG_COMMENTS_DELETE_MODAL_DELETE__')}
        </Button>
        <Button id="comment-modal-cancel" isPrimary isAccent onClick={onQuit}>
          {t('__BUG_COMMENTS_DELETE_MODAL_CANCEL__')}
        </Button>
      </Modal.Footer>
      <ModalClose onClick={onQuit} />
    </Modal>
  );
};
