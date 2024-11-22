import { useToast, Notification } from '@appquality/unguess-design-system';
import { t } from 'i18next';

const { addToast } = useToast();

export const copyLinkToClipboard = () => {
  const url = new URL(window.location.href);
  navigator.clipboard.writeText(`${url.origin}${url.pathname}`);
  addToast(
    ({ close }) => (
      <Notification
        onClose={close}
        type="success"
        message={t('__PERMISSION_SETTINGS_TOAST_COPY_MESSAGE')}
        closeText={t('__TOAST_CLOSE_TEXT')}
        isPrimary
      />
    ),
    { placement: 'top' }
  );
};
