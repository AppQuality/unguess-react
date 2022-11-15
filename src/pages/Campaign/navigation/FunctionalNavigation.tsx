import { t } from 'i18next';
import {
  StickyNavItemLabel,
  StickyNavItem,
} from 'src/common/components/navigation';

export const FunctionalNavigation = () => (
  <>
    <StickyNavItem
      to="campaign-overview"
      containerId="main"
      spy
      smooth
      duration={500}
      offset={-350}
    >
      {t('__MOTHER_DASHBOARD_NAVIGATION_OVERVIEW', 'Campaign Overview')}
    </StickyNavItem>
    <StickyNavItemLabel>
      {t('__MOTHER_DASHBOARD_NAVIGATION_DETAILS', 'Details')}
    </StickyNavItemLabel>
    <StickyNavItem
      to="unique-bug-distribution"
      containerId="main"
      spy
      smooth
      duration={500}
      offset={-350}
    >
      {t(
        '__MOTHER_DASHBOARD_NAVIGATION_DISTRIBUTION',
        'Unique bugs distribution'
      )}
    </StickyNavItem>
    <StickyNavItem
      to="devices-and-types"
      containerId="main"
      spy
      smooth
      duration={500}
      offset={-350}
    >
      {t('__MOTHER_DASHBOARD_NAVIGATION_DEVICES', 'Devices and types')}
    </StickyNavItem>
  </>
);
