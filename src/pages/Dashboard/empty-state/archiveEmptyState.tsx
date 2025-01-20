import { LG, MD, Paragraph } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ReactComponent as EmptyArchive } from 'src/assets/empty-archive.svg';
import { appTheme } from 'src/app/theme';

const EmptyArchiveContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: ${({ theme }) => `${theme.space.xl} ${theme.space.xxl}`};
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const ArchiveEmptyState = () => {
  const { t } = useTranslation();
  return (
    <EmptyArchiveContainer>
      <ImageWrapper>
        <EmptyArchive />
        <Paragraph style={{ textAlign: 'center', width: '70%' }}>
          <LG
            color={appTheme.palette.blue[600]}
            style={{ marginBottom: appTheme.space.xxs }}
          >
            {t('__DASHBOARD_EMPTY_ARCHIVE_TITLE')}
          </LG>
          <MD color={appTheme.palette.grey[700]}>
            {t('__DASHBOARD_EMPTY_ARCHIVE_SUBTITLE')}
          </MD>
        </Paragraph>
      </ImageWrapper>
    </EmptyArchiveContainer>
  );
};
