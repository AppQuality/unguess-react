import { Anchor } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { StickyNavItem, StyledDivider } from 'src/common/components/navigation';
import { FC } from 'react';
import { StickyContainer } from 'src/common/components/StickyContainer';
import { ExternalLink } from 'src/hooks/useExternaLink';
import { FunctionalNavigation } from './FunctionalNavigation';

const Navigation: FC<{
  externalLink?: ExternalLink;
  type?: string;
}> = ({ externalLink, type }) => {
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
      {type === 'functional' && <FunctionalNavigation />}
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
