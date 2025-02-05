import {
  Col,
  Paragraph,
  Row,
  Separator,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from 'src/common/components/SectionTitle';
import { ServiceTiles } from 'src/common/components/ServiceTiles';
import { useActiveWorkspaceProjects } from 'src/hooks/useActiveWorkspaceProjects';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled, { useTheme } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;
const LaunchCampaignCards = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { hasFeatureFlag } = useFeatureFlag();
  const { data } = useActiveWorkspaceProjects();

  if (!data) return null;
  if (!hasFeatureFlag('express')) return null;

  return (
    <Wrapper>
      <Row>
        <Col xs={12} style={{ marginBottom: 0 }}>
          <Paragraph>
            <SectionTitle
              title={t('__SERVICE_TILES_HEADER')}
              subtitle={t('__SERVICE_TILES_SUBTITLE')}
            />
            <Separator style={{ margin: `${theme.space.md} 0` }} />
          </Paragraph>
        </Col>
      </Row>
      <ServiceTiles />
    </Wrapper>
  );
};

export { LaunchCampaignCards };
