import { Paragraph, Separator } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { SectionTitle } from 'src/common/components/SectionTitle';
import { ServiceTiles } from 'src/common/components/ServiceTiles';
import styled from 'styled-components';

const EmptyProjectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.azure[100]};
`;

export const ProjectEmptyState = () => {
  const { t } = useTranslation();
  return (
    <EmptyProjectContainer>
      <Paragraph style={{ textAlign: 'center', width: '100%' }}>
        <SectionTitle
          title={t('__SERVICE_TILES_HEADER_EMPTY_STATE')}
          subtitle={t('__SERVICE_TILES_SUBTITLE_EMPTY_STATE')}
        />
      </Paragraph>
      <Separator style={{ margin: `${appTheme.space.md} 0`, width: '50%' }} />
      <ServiceTiles />
    </EmptyProjectContainer>
  );
};
