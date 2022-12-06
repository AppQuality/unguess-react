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
        id="anchor-campaign-overview-navigation"
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
        id="anchor-unique-bug-distribution-navigation"
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
        id="anchor-devices-and-types-navigation"
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
