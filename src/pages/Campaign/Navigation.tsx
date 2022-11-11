import { Anchor } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import {
  StickyNavItem,
  StickyNavItemLabel,
  StyledDivider,
} from 'src/common/components/navigation';
import { FC } from 'react';
import { StickyContainer } from 'src/common/components/StickyContainer';

export const Navigation: FC<{ externalLink?: string }> = ({ externalLink }) => {
  const { t } = useTranslation();
  return (
    <StickyContainer>
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
      <StickyNavItemLabel>
        {t('__MOTHER_DASHBOARD_NAVIGATION_OTHER', 'Other')}
      </StickyNavItemLabel>
      <StickyNavItem
        to="reports"
        containerId="main"
        spy
        smooth
        duration={500}
        offset={-350}
      >
        {t('__MOTHER_DASHBOARD_NAVIGATION_REPORTS', 'Reports & Attachments')}
      </StickyNavItem>
      {externalLink && (
        <>
          <StyledDivider />
          <Anchor
            isExternal
            onClick={() => {
              window.open(externalLink, '_blank');
            }}
          >
            {t('__MOTHER_DASHBOARD_NAVIGATION_BUG_DETAILS', 'Bug details')}
          </Anchor>
        </>
      )}
    </StickyContainer>
  );
};
