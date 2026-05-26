import { Button, Modal, ModalClose } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';

interface ImportMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  hubId: string;
}

export const ImportMediaModal = ({
  isOpen,
  onClose,
  hubId,
}: ImportMediaModalProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <Modal.Header>Import Media</Modal.Header>
      <Modal.Body>
        {/* TODO: Implement upload functionality */}
        <p>Upload functionality for hub {hubId} - To be implemented</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
      <ModalClose />
    </Modal>
  );
};
