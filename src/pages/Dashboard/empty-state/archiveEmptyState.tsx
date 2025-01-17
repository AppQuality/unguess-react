import { LG } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ReactComponent as EmptyArchive } from 'src/assets/empty-archive.svg';

const EmptyArchiveContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;
const StyledLG = styled(LG)`
  color: ${({ theme }) => theme.palette.grey[800]};
  width: 70%;
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
        <StyledLG>{t('__DASHBOARD_EMPTY_ARCHIVE')}</StyledLG>
      </ImageWrapper>
    </EmptyArchiveContainer>
  );
};
