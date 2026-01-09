import {
  getColor,
  Grid,
  Paragraph,
  Separator,
  Span,
  XL,
  XXL,
} from '@appquality/unguess-design-system';
import { useCallback, useMemo, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import PlanCreationInterface from 'src/common/components/PlanCreationInterface';
import { ServiceTiles } from 'src/common/components/ServiceTiles';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';
import styled from 'styled-components';
import { usePromoContext } from '../PromoContext';
import { ReactComponent as Illustration } from './assets/illustrazione-new-project.svg';
import { ReactComponent as UGLogoBig } from './assets/unguess-big.svg';
import { ReactComponent as UGLogoMedium } from './assets/unguess-medium.svg';
import { ReactComponent as UGLogoSmall } from './assets/unguess-small.svg';

const EmptyProjectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  padding: ${({ theme }) => `${theme.space.xxl}`};
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ProjectEmptyState = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canView = useCanAccessToActiveWorkspace();
  const {
    promoTemplates,
    workspaceStrapiTemplates,
    workspaceNoStrapiTemplates,
    setIsDrawerOpen,
    selectedTemplate,
    isDrawerOpen,
    setSelectedTemplate,
  } = usePromoContext();

  const allTemplates = useMemo(
    () => [
      ...workspaceNoStrapiTemplates,
      ...workspaceStrapiTemplates,
      ...promoTemplates,
    ],
    [promoTemplates, workspaceNoStrapiTemplates, workspaceStrapiTemplates]
  );

  // Remove duplicated template ids from allTemplates (remove from promoTemplates if already in workspace templates)
  const uniqueTemplateIds = new Set<number>();
  const uniqueAllTemplates = allTemplates.filter((template) => {
    if (uniqueTemplateIds.has(template.id)) {
      return false;
    }
    uniqueTemplateIds.add(template.id);
    return true;
  });

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, [setIsDrawerOpen]);

  const handleClick = useCallback(
    (tid: number) => {
      setSelectedTemplate(
        uniqueAllTemplates.find((template) => template.id === tid)
      );
      setIsDrawerOpen(true);
    },
    [uniqueAllTemplates, setSelectedTemplate, setIsDrawerOpen]
  );

  return (
    <EmptyProjectContainer
      ref={containerRef}
      style={{
        backgroundColor: canView ? '#f9feff' : 'transparent',
      }}
    >
      {canView && promoTemplates.length > 0 ? (
        <>
          <Grid>
            <Paragraph style={{ textAlign: 'center', width: '100%' }}>
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
            </Paragraph>
            <Separator
              style={{
                margin: `${appTheme.space.md} 0 ${appTheme.space.lg}`,
                width: '50%',
              }}
            />
            <div style={{ zIndex: 1, position: 'relative' }}>
              <ServiceTiles
                onClick={handleClick}
                promoTemplates={uniqueAllTemplates}
              />
            </div>
            <UGLogoMedium
              style={{ top: 0, left: 0, position: 'absolute', opacity: 0.5 }}
            />
            <UGLogoSmall
              style={{
                bottom: 0,
                left: '20%',
                position: 'absolute',
                opacity: 0.5,
              }}
            />
            <UGLogoBig
              style={{
                top: 0,
                right: 0,
                position: 'absolute',
                opacity: 0.5,
                zIndex: appTheme.levels.base,
              }}
            />
          </Grid>
          {selectedTemplate && (
            <PlanCreationInterface
              isOpen={isDrawerOpen}
              onClose={handleCloseDrawer}
              template={selectedTemplate}
            />
          )}
        </>
      ) : (
        <ImageWrapper>
          <Illustration />
          <Paragraph style={{ textAlign: 'center', width: '70%' }}>
            <XL color={appTheme.palette.blue[600]}>
              {t('__PROJECT_PAGE_EMPTY_STATE_NO_FEATURE')}
            </XL>
          </Paragraph>
        </ImageWrapper>
      )}
    </EmptyProjectContainer>
  );
};
