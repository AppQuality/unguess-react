import { useTranslation } from 'react-i18next';

const useTitle = () => {
  const { t } = useTranslation();
  return t('__PLAN_PAGE_MODULE_SETUP_NOTE_BLOCK_TITLE');
};

export default useTitle;
