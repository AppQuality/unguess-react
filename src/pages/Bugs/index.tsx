import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'src/features/templates/Page';
import BugsDetail from './Detail';
import BugsFilters from './Filters';
import BugsPageHeader from './PageHeader';
import BugsTable from './Table';

const Bugs = () => {
  const { t } = useTranslation();
  const [isDetailOpen, setIsDetailOpen] = useState(true);

  return (
    <Page
      title={t('__BUGS_PAGE_TITLE')}
      pageHeader={<BugsPageHeader />}
      route="bugs"
    >
      <Grid>
        <Row>
          <Col xs={12}>
            <BugsFilters />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={isDetailOpen ? 8 : 12}>
            <BugsTable />
          </Col>
          {isDetailOpen && (
            <Col xs={12} md={4}>
              <BugsDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
              />
            </Col>
          )}
        </Row>
      </Grid>
    </Page>
  );
};

export default Bugs;
