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
      <Modal.Header isDanger>Vuoi eliminare il commento?</Modal.Header>
      <ModalBody>
        <Paragraph>Se lo elimini, non comparirà più tra i commenti.</Paragraph>
      </ModalBody>
      <Modal.Footer>
        <Button
          style={{ paddingRight: 20 }}
          id="comment-modal-delete"
          isDanger
          isLink
          onClick={() => deleteCommentHandler(deleteCommentId)}
        >
          Elimina
        </Button>
        <Button id="comment-modal-cancel" isPrimary isAccent onClick={onQuit}>
          Torna al commento
        </Button>
      </Modal.Footer>
      <ModalClose onClick={onQuit} />
    </Modal>
  );
};
