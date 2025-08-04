import { useTranslation } from 'react-i18next';

const useSubtitle = () => {
  const { t } = useTranslation();
  return t('__ASIDE_NAVIGATION_MODULE_SETUP_NOTE_BLOCK_SUBTITLE');
};

export default useSubtitle;
