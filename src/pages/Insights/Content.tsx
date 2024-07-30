import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { styled } from 'styled-components';
import { ActionBar } from './ActionBar';
import { Collection } from './Collection';
import { DrawerButton } from './DrawerButton';
import { FormProvider } from './FormProvider';
import { useInsightContext } from './InsightContext';
import InsightsDrawer from './InsightsDrawer';
import { Widgets } from './Widgets';

const Grid = styled.div<{ isDrawerOpen: boolean }>`
  transition: 300ms;
  display: grid;
  grid-template-columns: 1fr 40%;
  grid-template-rows: auto;
  gap: 0;
  ${({ isDrawerOpen, theme }) =>
    isDrawerOpen
      ? `grid-template-columns: 1fr 40%;`
      : `grid-template-columns: 1fr ${theme.space.xxl};`}
`;

const DrawerWrapper = styled.aside`
  display: grid;
  grid-template-columns: ${({ theme }) => theme.space.xxl} 1fr;
  align-items: start;
`;

const InsightsPageContent = () => {
  const { isDrawerOpen } = useInsightContext();

  return (
    <FormProvider>
      <Grid isDrawerOpen={isDrawerOpen}>
        <LayoutWrapper isNotBoxed>
          <ActionBar />
          <Widgets />
          <Collection />
        </LayoutWrapper>
        <DrawerWrapper>
          <DrawerButton />
          <InsightsDrawer />
        </DrawerWrapper>
      </Grid>
    </FormProvider>
  );
};

export default InsightsPageContent;
