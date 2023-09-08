import { Col, Grid, PageHeader, Row } from '@appquality/unguess-design-system';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { HubspotModal } from 'src/common/components/HubspotModal';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { PageTitle } from 'src/common/components/PageTitle';
import { checkHubspotURL } from 'src/common/utils';
import { openWizard } from 'src/features/express/expressSlice';
import { Page } from 'src/features/templates/Page';
import PageLoader from 'src/features/templates/PageLoader';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import styled from 'styled-components';
import { ExpressWizardContainer } from '../ExpressWizard';
import { ExpressDrawer } from '../ExpressWizard/drawer';
import { Categories } from './Categories';
import { CategoriesNav } from './CategoriesNav';
import { Featured } from './Featured';

const StyledGrid = styled(Grid)`
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0;
  }
`;

const Catalog = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { status } = useAppSelector((state) => state.user);
  const { activeWorkspace } = useActiveWorkspace();

  const memoCsm = useMemo(() => activeWorkspace?.csm, [activeWorkspace]);

  const handleOpenHubspot = () => {
    if (memoCsm && memoCsm.url && checkHubspotURL(memoCsm.url)) {
      setIsModalOpen(true);
    } else {
      window.location.href = `mailto:${
        activeWorkspace?.csm.email || 'info@unguess.io'
      }`;
    }
  };

  return status === 'loading' ? (
    <PageLoader />
  ) : (
    <Page
      pageHeader={
        <LayoutWrapper>
          <PageHeader>
            <PageHeader.Main
              mainTitle={t('__CATALOG_PAGE_TITLE')}
              mainDescription={t('__CATALOG_PAGE_DESCRIPTION')}
            >
              <PageHeader.Title>
                <PageTitle>{t('__CATALOG_PAGE_TITLE')}</PageTitle>
              </PageHeader.Title>
              <PageHeader.Description>
                {t('__CATALOG_PAGE_DESCRIPTION')}
              </PageHeader.Description>
            </PageHeader.Main>
          </PageHeader>
        </LayoutWrapper>
      }
      title={t('__PAGE_TITLE_CATALOG')}
      route="services"
    >
      <LayoutWrapper>
        <StyledGrid gutters="lg">
          <HubspotModal
            isOpen={isModalOpen}
            meetingUrl={memoCsm?.url}
            onClose={() => setIsModalOpen(false)}
          />
          <Row>
            <Col xs={12} lg={2} style={{ margin: 0 }}>
              <CategoriesNav />
            </Col>
            <Col xs={12} lg={10}>
              <Featured handleHubspot={handleOpenHubspot} />
              <Categories handleHubspot={handleOpenHubspot} />
              <ExpressDrawer
                onCtaClick={() => {
                  dispatch(openWizard());
                }}
              />
              <ExpressWizardContainer />
            </Col>
          </Row>
        </StyledGrid>
      </LayoutWrapper>
    </Page>
  );
};

export default Catalog;
