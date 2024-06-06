import { MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { ReactComponent as EmptyStateImg } from '../../assets/empty-state-videos.svg';

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
  return (
    <StyledEmptyState>
      <EmptyStateImg
        title="Table is empty"
        style={{ marginBottom: appTheme.space.lg }}
      />
      <MD>{t('__PAGE_VIDEOS_EMPTY_STATE')}</MD>
    </StyledEmptyState>
  );
};
