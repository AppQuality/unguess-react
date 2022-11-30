import { Anchor } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { getLocalizedUXDashboardUrl } from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';
import styled from 'styled-components';

const StyledAnchor = styled(Anchor)`
  display: block;
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

export const MediaNavigationLink = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();

  return (
    <StyledAnchor
      isExternal
      onClick={() => {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        window.open(
          getLocalizedUXDashboardUrl(campaignId, i18n.language),
          '_blank'
        );
      }}
    >
      {t('__CAMPAIGN_PAGE_NAVIGATION_MEDIA_EXTERNAL_LINK_LABEL')}
    </StyledAnchor>
  );
};
