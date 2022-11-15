import { Anchor } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import {
  StickyNavItem,
  StickyNavItemLabel,
  StyledDivider,
} from 'src/common/components/navigation';
import { CampaignWithOutput } from 'src/features/api';
import { FC } from 'react';
import { StickyContainer } from 'src/common/components/StickyContainer';
import { ExternalLink } from 'src/hooks/useExternaLink';
import { FunctionalNavigation } from './FunctionalNavigation';

const Navigation: FC<{
  externalLink?: ExternalLink;
  outputs?: CampaignWithOutput['outputs'];
}> = ({ externalLink, outputs }) => {
  const { t } = useTranslation();

  return (
    <StickyContainer>
      {outputs?.includes('bugs') && <FunctionalNavigation />}
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
              // eslint-disable-next-line security/detect-non-literal-fs-filename
              window.open(externalLink.url, '_blank');
            }}
          >
            {externalLink.label}
          </Anchor>
        </>
      )}
    </StickyContainer>
  );
};

export default Navigation;
