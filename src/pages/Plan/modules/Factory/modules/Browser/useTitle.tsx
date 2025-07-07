import { useTranslation } from 'react-i18next';

const useTitle = () => {
  const { t } = useTranslation();
  return t('__PLAN_PAGE_MODULE_BROWSER_LABEL');
};

export default useTitle;
