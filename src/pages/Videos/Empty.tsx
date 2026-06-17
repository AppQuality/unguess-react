import { Button, MD, XL } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { CampaignHubContext } from 'src/features/templates/CampaignsHubsMiddleware';
import styled from 'styled-components';
import { useAnalytics } from 'use-analytics';
import { ReactComponent as EmptyStateImg } from '../../assets/empty-state-videos.svg';
import { ReactComponent as HubEmptyStateImg } from '../../assets/hub-empty-state.svg';

const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding-top: ${appTheme.space.md};
`;

type EmptyProps = {
  onOpenImportMediaModal: () => void;
};

export const Empty = ({ onOpenImportMediaModal }: EmptyProps) => {
  const { t } = useTranslation();
  const { track } = useAnalytics();
  const { isHub } = useOutletContext<CampaignHubContext>();

  return (
    <StyledEmptyState>
      {isHub ? (
        <HubEmptyStateImg
          title="Table is empty"
          style={{
            marginBottom: appTheme.space.lg,
            marginTop: appTheme.space.xxl,
          }}
        />
      ) : (
        <EmptyStateImg
          title="Table is empty"
          style={{ marginBottom: appTheme.space.lg }}
        />
      )}
      {isHub ? (
        <>
          <XL isBold style={{ marginBottom: appTheme.space.sm }}>
            {t('__HUB_EMPTY_STATE_TITLE')}
          </XL>
          <MD>{t('__HUB_EMPTY_STATE_SUBTITLE')}</MD>
        </>
      ) : (
        <MD>{t('__PAGE_VIDEOS_EMPTY_STATE')}</MD>
      )}
      {isHub && (
        <Button
          isPrimary
          isAccent
          style={{ marginTop: appTheme.space.md }}
          onClick={() => {
            track('mediaUploadModalOpened', {
              source: 'empty_state',
            });
            onOpenImportMediaModal();
          }}
        >
          {t('__HUB_EMPTY_STATE_UPLOAD_MEDIA_CTA')}
        </Button>
      )}
    </StyledEmptyState>
  );
};
