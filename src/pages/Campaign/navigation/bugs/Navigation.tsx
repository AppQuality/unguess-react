import { useTranslation } from 'react-i18next';
import {
  StickyNavItemLabel,
  StickyNavItem,
} from 'src/common/components/navigation';

export const BugsNavigation = ({ containerId }: { containerId?: string }) => {
  const { t } = useTranslation();

  return (
    <>
      <StickyNavItem
        to="campaign-overview"
        containerId={containerId ?? 'main'}
        spy
        smooth
        duration={500}
        offset={-350}
      >
        {t('__CAMPAIGN_PAGE_NAVIGATION_BUG_ITEM_OVERVIEW_LABEL')}
      </StickyNavItem>
      <StickyNavItemLabel>
        {t('__CAMPAIGN_PAGE_NAVIGATION_BUG_GROUP_DETAILS_LABEL')}
      </StickyNavItemLabel>
      <StickyNavItem
        to="unique-bug-distribution"
        containerId={containerId ?? 'main'}
        spy
        smooth
        duration={500}
        offset={-350}
      >
        {t('__CAMPAIGN_PAGE_NAVIGATION_BUG_ITEM_DETAILS_UNIQUE_BUGS_LABEL')}
      </StickyNavItem>
      <StickyNavItem
        to="devices-and-types"
        containerId={containerId ?? 'main'}
        spy
        smooth
        duration={500}
        offset={-350}
      >
        {t('__CAMPAIGN_PAGE_NAVIGATION_BUG_ITEM_DETAILS_DEVICES_LABEL')}
      </StickyNavItem>
    </>
  );
};
