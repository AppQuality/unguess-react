import { Modal, ModalClose } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { UploadStep } from 'src/pages/Dashboard/Modals/steps/UploadStep';

export type PendingUpload = { name: string; size: number; type: string };

interface UploadModalProps {
  hubId: string;
  onClose: () => void;
}

export const UploadModal = ({ hubId, onClose }: UploadModalProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const hubsBaseRoute = useLocalizeRoute('hubs');
  const [language, setLanguage] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = () => {
    const pendingUploads: PendingUpload[] = files.map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
    }));
    onClose();
    navigate(`${hubsBaseRoute}${hubId}/videos`, {
      state: { pendingUploads },
    });
  };

  return (
    <Modal onClose={onClose} isLarge role="dialog">
      <Modal.Header>{t('__HUB_VIDEOS_UPLOAD_MODAL_TITLE')}</Modal.Header>
      <Modal.Body>
        <UploadStep
          language={language}
          onLanguageChange={setLanguage}
          files={files}
          onFilesChange={setFiles}
        />
      </Modal.Body>
      <Modal.Footer>
        <UploadStep.Footer onBack={onClose} onUpload={handleUpload} />
      </Modal.Footer>
      <ModalClose />
    </Modal>
  );
};
