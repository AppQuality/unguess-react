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
import PlanCreationInterface from 'src/common/components/PlanCreationInterface';
import { ServiceTiles } from 'src/common/components/ServiceTiles';
import { useActiveWorkspaceProjects } from 'src/hooks/useActiveWorkspaceProjects';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';
import styled, { useTheme } from 'styled-components';
import { usePromoContext } from './PromoContext';

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
  const {
    promoTemplates,
    workspaceNoStrapiTemplates,
    workspaceStrapiTemplates,
    setIsDrawerOpen,
    setSelectedTemplate,
    selectedTemplate,
    isDrawerOpen,
  } = usePromoContext();

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleClick = (tid: number) => {
    const selected = promoTemplates.find((template) => template.id === tid);
    setSelectedTemplate(selected);
    setIsDrawerOpen(true);
  };

  if (!data) return null;
  if (!canView) return null;
  if (!promoTemplates?.length) return null;

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
      <ServiceTiles
        onClick={handleClick}
        promoTemplates={[
          ...promoTemplates,
          ...workspaceStrapiTemplates,
          ...workspaceNoStrapiTemplates,
        ]}
      />
      {selectedTemplate && (
        <PlanCreationInterface
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          template={selectedTemplate}
        />
      )}
    </Wrapper>
  );
};

export { LaunchCampaignCards };
