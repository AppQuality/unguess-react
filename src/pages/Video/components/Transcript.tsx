import { ContainerCard, LG } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

const StyledContainerCard = styled(ContainerCard)`
  margin: ${({ theme }) => theme.space.xxl} 0;
`;

const Transcript = () => {
  const { t } = useTranslation();

  return (
    <StyledContainerCard>
      <LG>{t('__VIDEO_PAGE_TRANSCRIPT_TITLE')}</LG>
    </StyledContainerCard>
  );
};

export { Transcript };
