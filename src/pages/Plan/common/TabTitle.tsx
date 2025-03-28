import { useTranslation } from 'react-i18next';
import { PlanTab } from '../context/planContext';
import { SectionTitle } from './SectionTitle';

export const TabTitle = ({ tabId }: { tabId: PlanTab }) => {
  const { t } = useTranslation();

  if (tabId === 'setup') {
    return (
      <SectionTitle isBold>{t('__PLAN_PAGE_TAB_SETUP_TAB_TITLE')}</SectionTitle>
    );
  }

  if (tabId === 'target') {
    return (
      <SectionTitle isBold>
        {t('__PLAN_PAGE_TAB_TARGET_TAB_TITLE')}
      </SectionTitle>
    );
  }

  if (tabId === 'instructions') {
    return (
      <SectionTitle isBold>
        {t('__PLAN_PAGE_TAB_INSTRUCTIONS_TAB_TITLE')}
      </SectionTitle>
    );
  }

  if (tabId === 'summary') {
    return (
      <SectionTitle isBold>
        {t('__PLAN_PAGE_TAB_SUMMARY_TAB_TITLE')}
      </SectionTitle>
    );
  }

  return null;
};
