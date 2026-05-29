import { Button, MD, XL } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { CampaignHubContext } from 'src/features/templates/CampaignsHubsMiddleware';
import styled from 'styled-components';
import { ReactComponent as EmptyStateImg } from '../../assets/empty-state-videos.svg';
import { ReactComponent as HubEmptyStateImg } from '../../assets/hub-empty-state.svg';
import { ImportMediaModal } from './ImportMediaModal';

const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding-top: ${appTheme.space.md};
`;

export const Empty = () => {
  const { t } = useTranslation();
  const { isHub, entityId } = useOutletContext<CampaignHubContext>();
  const [isImportMediaModalOpen, setIsImportMediaModalOpen] = useState(false);

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
          onClick={() => setIsImportMediaModalOpen(true)}
        >
          {t('__HUB_EMPTY_STATE_UPLOAD_MEDIA_CTA')}
        </Button>
      )}
      {isHub && (
        <ImportMediaModal
          isOpen={isImportMediaModalOpen}
          onClose={() => setIsImportMediaModalOpen(false)}
          hubId={entityId}
        />
      )}
    </StyledEmptyState>
  );
};
