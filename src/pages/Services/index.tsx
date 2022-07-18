import { Page } from 'src/features/templates/Page';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Col, Grid, Row, PageHeader } from '@appquality/unguess-design-system';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { openWizard } from 'src/features/express/expressSlice';
import PageLoader from 'src/features/templates/PageLoader';
import { HubspotModal } from 'src/common/components/HubspotModal';
import { checkHubspotURL } from 'src/common/utils';
import { Featured } from './Featured';
import { Categories } from './Categories';
import { CategoriesNav } from './CategoriesNav';
import { ExpressDrawer } from '../ExpressWizard/drawer';
import { ExpressWizardContainer } from '../ExpressWizard';

const PageContent = styled.div`
  width: 100%;
  padding-top: ${({ theme }) => theme.space.xl};
`;

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
  const { activeWorkspace } = useAppSelector((state) => state.navigation);

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
        <PageHeader>
          <PageHeader.Main
            infoTitle={t('__CATALOG_PAGE_TITLE')}
            infoDescription={t('__CATALOG_PAGE_DESCRIPTION')}
          />
        </PageHeader>
      }
      title={t('__PAGE_TITLE_CATALOG')}
      route="services"
    >
      <StyledGrid gutters="lg">
        <HubspotModal
          isOpen={isModalOpen}
          meetingUrl={memoCsm?.url}
          onClose={() => setIsModalOpen(false)}
        />
        <Row>
          <Col xs={12} lg={3}>
            <CategoriesNav />
          </Col>
          <Col xs={12} lg={9}>
            <PageContent>
              <Featured handleHubspot={handleOpenHubspot} />
              <Categories handleHubspot={handleOpenHubspot} />
            </PageContent>
            <ExpressDrawer
              onCtaClick={() => {
                dispatch(openWizard());
              }}
            />
            <ExpressWizardContainer />
          </Col>
        </Row>
      </StyledGrid>
    </Page>
  );
};

export default Catalog;
