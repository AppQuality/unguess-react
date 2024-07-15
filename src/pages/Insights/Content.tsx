import {
  Col,
  Grid,
  IconButton,
  Row,
  Tooltip,
} from '@appquality/unguess-design-system';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowRight } from 'src/assets/icons/arrow-right.svg';
import { appTheme } from 'src/app/theme';
import { Widgets } from './Widgets';
import { Collection } from './Collection';
import { InsightsDrawer } from './InsightsDrawer';
import { FormProvider } from './FormProvider';
import { ActionBar } from './ActionBar';
import { useInsightContext } from './InsightContext';

const InsightsPageContent = () => {
  const { t } = useTranslation();
  const { isDrawerOpen, setIsDrawerOpen } = useInsightContext();

  return (
    <LayoutWrapper
      isNotBoxed
      {...(isDrawerOpen && { style: { paddingRight: 0 } })}
    >
      <FormProvider>
        <Grid gutters="xxl">
          <Row>
            <Col lg={isDrawerOpen ? 6 : 11}>
              <ActionBar />
              <Widgets />
              <Collection />
            </Col>
            {isDrawerOpen ? (
              <Col lg={6}>
                <InsightsDrawer />
              </Col>
            ) : (
              <Col lg={1}>
                <Tooltip
                  content={t('__INSIGHTS_PAGE_OPEN_DRAWER_BUTTON')}
                  type="light"
                  placement="auto"
                >
                  <IconButton
                    isPrimary
                    style={{ marginTop: appTheme.space.md }}
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    <ArrowRight style={{ transform: 'rotate(180deg)' }} />
                  </IconButton>
                </Tooltip>
              </Col>
            )}
          </Row>
        </Grid>
      </FormProvider>
    </LayoutWrapper>
  );
};

export default InsightsPageContent;
