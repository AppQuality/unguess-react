import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useState } from 'react';
import { Widgets } from './Widgets';
import { Collection } from './Collection';
import { InsightsDrawer } from './InsightsDrawer';

const InsightsPageContent = () => {
  // eslint-disable-next-line
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  return (
    <LayoutWrapper
      isNotBoxed
      {...(isDrawerOpen && { style: { paddingRight: 0 } })}
    >
      <Grid gutters="xxl">
        <Row>
          <Col lg={isDrawerOpen ? 8 : 12}>
            <Widgets />
            <Collection />
          </Col>
          {isDrawerOpen && (
            <Col lg={4}>
              <InsightsDrawer />
            </Col>
          )}
        </Row>
      </Grid>
    </LayoutWrapper>
  );
};

export default InsightsPageContent;
