import { Modal, ModalClose } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadStep } from 'src/pages/Dashboard/Modals/steps/UploadStep';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (language: string) => void;
}

export const UploadModal = ({ onClose, onUpload }: UploadModalProps) => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState('');

  return (
    <Modal onClose={onClose} isLarge role="dialog">
      <Modal.Header>{t('__HUB_VIDEOS_UPLOAD_MODAL_TITLE')}</Modal.Header>
      <Modal.Body>
        <UploadStep language={language} onLanguageChange={setLanguage} />
      </Modal.Body>
      <Modal.Footer>
        <UploadStep.Footer
          onBack={onClose}
          onUpload={() => onUpload(language)}
        />
      </Modal.Footer>
      <ModalClose />
    </Modal>
  );
};
