import {
  StickyNavItem,
  StickyNavItemLabel,
} from 'src/common/components/navigation';
import { useTranslation } from 'react-i18next';

export const ReportNavigation = () => {
  const { t } = useTranslation();
  return (
    <>
      <StickyNavItemLabel>
        {t('__CAMPAIGN_PAGE_NAVIGATION_BUG_GROUP_OTHER_LABEL')}
      </StickyNavItemLabel>
      <StickyNavItem
        id="anchor-reports-navigation"
        to="reports"
        containerId="main"
        spy
        smooth
        duration={500}
        offset={-30}
      >
        {t('__CAMPAIGN_PAGE_NAVIGATION_BUG_ITEM_OTHER_REPORTS_LABEL')}
      </StickyNavItem>
    </>
  );
};
