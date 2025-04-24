import { useTranslation } from 'react-i18next';
import { useCopy } from './useCopy';

export const useCopyLink = () => {
  const { t } = useTranslation();
  const url = new URL(window.location.href);
  const text = `${url.origin}${url.pathname}`;
  const copyLinkToClipboard = useCopy({
    text,
    notification: t('__PERMISSION_SETTINGS_TOAST_COPY_MESSAGE'),
  });
  return copyLinkToClipboard;
};
