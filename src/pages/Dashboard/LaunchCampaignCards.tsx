import {
  Col,
  getColor,
  Paragraph,
  Row,
  Separator,
  Span,
  XXL,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ServiceTiles } from 'src/common/components/ServiceTiles';
import { useActiveWorkspaceProjects } from 'src/hooks/useActiveWorkspaceProjects';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled, { useTheme } from 'styled-components';
import { useDashboardContext } from './Context';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;
const LaunchCampaignCards = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const canView = useCanAccessToActiveWorkspace();
  const { data } = useActiveWorkspaceProjects();
  const { promoTemplates, setIsDrawerOpen, setSelectedTemplate } =
    useDashboardContext();

  const handleClick = (tid: number) => {
    const selectedTemplate = promoTemplates.find(
      (template) => template.id === tid
    );
    setSelectedTemplate(selectedTemplate);
    setIsDrawerOpen(true);
  };

  if (!data) return null;
  if (!canView) return null;

  return (
    <Wrapper>
      <Row>
        <Col xs={12} style={{ marginBottom: 0 }}>
          <Paragraph>
            <XXL
              style={{
                fontWeight: appTheme.fontWeights.medium,
                marginBottom: appTheme.space.xs,
                color: getColor(appTheme.palette.blue, 600),
              }}
            >
              {t('__SERVICE_TILES_HEADER')}
            </XXL>
            <Trans
              i18nKey="__SERVICE_TILES_SUBTITLE"
              components={{ bold: <Span isBold /> }}
              defaults="Launch <bold>lean tests</bold> autonomosly, get <bold>expert-verified</bold> results"
            />
            <Separator style={{ margin: `${theme.space.md} 0` }} />
          </Paragraph>
        </Col>
      </Row>
      <ServiceTiles onClick={handleClick} promoTemplates={promoTemplates} />
    </Wrapper>
  );
};

export { LaunchCampaignCards };
