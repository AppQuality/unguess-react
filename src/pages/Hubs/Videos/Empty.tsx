import { Button, XL } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { ReactComponent as EmptyStateImg } from 'src/assets/empty-state-videos.svg';
import styled from 'styled-components';
import { UploadModal } from './UploadModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
  padding: ${({ theme }) => theme.space.xxl} ${({ theme }) => theme.space.md};
  gap: ${({ theme }) => theme.space.lg};
`;

export const HubVideosEmpty = () => {
  const { t } = useTranslation();
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <>
      <LayoutWrapper>
        <Container>
          <EmptyStateImg
            title="No videos"
            style={{ marginBottom: appTheme.space.sm }}
          />
          <XL isBold style={{ textAlign: 'center' }}>
            {t('__HUB_VIDEOS_EMPTY_STATE_TITLE')}
          </XL>
          <Button isAccent isPrimary onClick={() => setIsUploadOpen(true)}>
            {t('__HUB_VIDEOS_EMPTY_STATE_BUTTON')}
          </Button>
        </Container>
      </LayoutWrapper>
      {isUploadOpen && (
        <UploadModal
          onClose={() => setIsUploadOpen(false)}
          onUpload={() => setIsUploadOpen(false)}
        />
      )}
    </>
  );
};
