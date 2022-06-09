import { Page } from 'src/features/templates/Page';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  Col,
  Grid,
  Row,
  MD,
  Paragraph,
  Timeline,
  XXL,
  XXXL,
  LG,
  ContainerCard,
} from '@appquality/unguess-design-system';
import { ReactComponent as TailoredIcon } from 'src/assets/icons/tailored-icon.svg';
import { ReactComponent as ExpressIcon } from 'src/assets/icons/express-icon.svg';
import { useAppSelector } from 'src/app/hooks';
import { PageHeaderContainer } from 'src/common/components/pageHeaderContainer';
import PageLoader from 'src/features/templates/PageLoader';
import { Divider } from 'src/common/components/divider';
import { Featured } from './Featured';
import { Categories } from './Categories';

const StickyContainer = styled(ContainerCard)`
  position: sticky;
  top: ${({ theme }) => theme.space.md};
  z-index: 1;
  padding: ${({ theme }) => theme.space.base * 6}px;
  padding-top: ${({ theme }) => theme.space.xl};
  background-color: ${({ theme }) => theme.palette.white};
`;

const StickyContainerTitle = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[600]};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const StickyContainerParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[800]};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const PageContent = styled.div`
  width: 100%;
  padding-top: ${({ theme }) => theme.space.xl};
`;

const PageTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const StyledDivider = styled(Divider)`
  margin-top: ${({ theme }) => theme.space.base * 3}px;
  margin-bottom: ${({ theme }) => theme.space.base * 6}px;
`;

const PageHeaderTitle = styled(XXXL)`
  color: ${({ theme }) => theme.colors.primaryHue};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const PageHeaderDescription = styled(LG)`
  color: ${({ theme }) => theme.palette.grey[700]};
  margin-top: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const Catalog = () => {
  const { t } = useTranslation();
  const { status } = useAppSelector((state) => state.user);

  return status === 'loading' ? (
    <PageLoader />
  ) : (
    <Page
      pageHeader={
        <PageHeaderContainer>
          <PageHeaderTitle>{t('__CATALOG_PAGE_TITLE')}</PageHeaderTitle>
          <PageHeaderDescription>
            {t('__CATALOG_PAGE_DESCRIPTION')}
          </PageHeaderDescription>
        </PageHeaderContainer>
      }
      title={t('__PAGE_TITLE_CATALOG')}
      route="services"
    >
      <Grid gutters="lg">
        <Row>
          <Col xs={12} lg={3}>
            <StickyContainer>
              <StickyContainerTitle>
                {t('__CATALOG_STICKY_CONTAINER_TITLE')}
              </StickyContainerTitle>
              <StickyContainerParagraph>
                {t('__CATALOG_STICKY_CONTAINER_PARAGRAPH')}
              </StickyContainerParagraph>
              <Timeline>
                <Timeline.Item hiddenLine icon={<ExpressIcon />}>
                  <Timeline.Content>
                    <Paragraph style={{ fontWeight: 500 }}>
                      {t('__EXPRESS_LABEL')}
                    </Paragraph>
                    {t(
                      '__CATALOG_STICKY_CONTAINER_TIMELINE_ITEM_EXPRESS_DESCRIPTION'
                    )}
                  </Timeline.Content>
                </Timeline.Item>
                <Timeline.Item hiddenLine icon={<TailoredIcon />}>
                  <Timeline.Content>
                    <Paragraph style={{ fontWeight: 500 }}>
                      {t('__TAILORED_LABEL')}
                    </Paragraph>
                    {t(
                      '__CATALOG_STICKY_CONTAINER_TIMELINE_ITEM_TAILORED_DESCRIPTION'
                    )}
                  </Timeline.Content>
                </Timeline.Item>
              </Timeline>
            </StickyContainer>
          </Col>
          <Col xs={12} lg={9}>
            <PageContent>
              <Featured />
              <Categories />
            </PageContent>
          </Col>
        </Row>
      </Grid>
    </Page>
  );
};

export default Catalog;
