import { Button, MD } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { CampaignHubContext } from 'src/features/templates/CampaignsHubsMiddleware';
import styled from 'styled-components';
import { ReactComponent as EmptyStateImg } from '../../assets/empty-state-videos.svg';
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
      <EmptyStateImg
        title="Table is empty"
        style={{ marginBottom: appTheme.space.lg }}
      />
      <MD>{t('__PAGE_VIDEOS_EMPTY_STATE')}</MD>
      {isHub && (
        <Button
          isPrimary
          isAccent
          style={{ marginTop: appTheme.space.md }}
          onClick={() => setIsImportMediaModalOpen(true)}
        >
          {t('Import media')}
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
