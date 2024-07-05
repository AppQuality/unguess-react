import { Button, getColor, Tooltip } from '@appquality/unguess-design-system';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowLeft } from '@zendeskgarden/svg-icons/src/12/chevron-double-left-fill.svg';
import { appTheme } from 'src/app/theme';
import { styled } from 'styled-components';
import { ReactComponent as ArrowRight } from 'src/assets/icons/arrow-right.svg';
import InsightsDrawer from './InsightsDrawer';
import { ActionBar } from './ActionBar';
import { Collection } from './Collection';
import { FormProvider } from './FormProvider';
import { useInsightContext } from './InsightContext';
import { Widgets } from './Widgets';

const Grid = styled.div<{ isDrawerOpen: boolean }>`
  transition: 300ms;
  display: grid;
  grid-template-columns: 1fr 40%;
  grid-template-rows: auto;
  gap: 0;
  ${({ isDrawerOpen }) =>
    isDrawerOpen
      ? `
    grid-template-columns: 1fr 40%;
    `
      : `
    grid-template-columns: 1fr 52px;
    `}
`;

const DrawerWrapper = styled.aside<{ isDrawerOpen: boolean }>`
  > button {
    position: sticky;
    top: 33px;
    margin-top: 33px;
    background-color: ${appTheme.palette.white};
    border: 1px solid ${getColor(appTheme.colors.neutralHue, 200)};
    border-radius: 0;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-right: none;
    height: 52px;
    width: 52px;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 100;
  }
  display: grid;
  grid-template-columns: 52px 1fr;
`;

const InsightsPageContent = () => {
  const { t } = useTranslation();
  const { isDrawerOpen, setIsDrawerOpen } = useInsightContext();

  return (
    <FormProvider>
      <Grid isDrawerOpen={isDrawerOpen}>
        <LayoutWrapper isNotBoxed>
          <ActionBar />
          <Widgets />
          <Collection />
        </LayoutWrapper>
        <DrawerWrapper isDrawerOpen={isDrawerOpen}>
          <Tooltip
            content={
              isDrawerOpen
                ? t('__INSIGHTS_PAGE_CLOSE_DRAWER_BUTTON')
                : t('__INSIGHTS_PAGE_OPEN_DRAWER_BUTTON')
            }
            type="light"
            placement="auto"
          >
            <Button
              isPill={false}
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              {isDrawerOpen ? (
                <ArrowRight color={appTheme.palette.grey[600]} />
              ) : (
                <ArrowLeft color={appTheme.palette.grey[600]} />
              )}
            </Button>
          </Tooltip>
          <InsightsDrawer />
        </DrawerWrapper>
      </Grid>
    </FormProvider>
  );
};

export default InsightsPageContent;
