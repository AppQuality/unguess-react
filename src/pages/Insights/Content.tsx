import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useState } from 'react';
import { Widgets } from './Widgets';
import { Collection } from './Collection';
import { InsightsDrawer } from './InsightsDrawer';
import { FormProvider } from './FormProvider';
import { ActionBar } from './ActionBar';

const InsightsPageContent = () => {
  // eslint-disable-next-line
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  return (
    <LayoutWrapper
      isNotBoxed
      {...(isDrawerOpen && { style: { paddingRight: 0 } })}
    >
      <FormProvider>
        <Grid gutters="xxl">
          <Row>
            <Col lg={isDrawerOpen ? 6 : 12}>
              <ActionBar />
              <Widgets />
              <Collection />
            </Col>
            {isDrawerOpen && (
              <Col lg={6}>
                <InsightsDrawer />
              </Col>
            )}
          </Row>
        </Grid>
      </FormProvider>
    </LayoutWrapper>
  );
};

export default InsightsPageContent;
