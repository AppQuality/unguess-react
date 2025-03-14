import { Col, Grid, PageHeader, Row } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { Controls } from '../Controls';
import { BreadCrumbTabs } from './BreadCrumbTabs';
import { TitleGroup } from './TitleGroup';

const PlanPageHeader = () => {
  const { t } = useTranslation();

  return (
    <LayoutWrapper isNotBoxed>
      <PageHeader
        style={{
          padding: `${appTheme.space.md} 0`,
          border: 'none',
        }}
      >
        <PageHeader.Main mainTitle={t('__PLAN_PAGE_TITLE')}>
          <Grid>
            <Row alignItems="center">
              <Col size={3} style={{ marginBottom: 0 }}>
                <TitleGroup />
              </Col>
              <Col size={6} style={{ marginBottom: 0 }} textAlign="center">
                <BreadCrumbTabs />
              </Col>
              <Col size={3} style={{ marginBottom: 0 }}>
                <Controls />
              </Col>
            </Row>
          </Grid>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default PlanPageHeader;
