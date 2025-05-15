import { Notification, useToast } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';

export const useCopy = ({
  text,
  notification,
}: {
  text: string;
  notification?: string;
}) => {
  const { t } = useTranslation();
  const { addToast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="success"
            message={notification || t('__COPY_SUCCESS')}
            closeText={t('__TOAST_CLOSE_TEXT')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
    } catch (error) {
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="error"
            message={t('__COPY_ERROR')}
            closeText={t('__TOAST_CLOSE_TEXT')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
    }
  };

  return copyToClipboard;
};
