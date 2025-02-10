import { appTheme } from 'src/app/theme';
import styled from 'styled-components';

const scrollingContainerItemsGap = appTheme.space.md;

const StyledGrid = styled.div`
  container-type: inline-size;
  container-name: scrollingContainer;
  flex-wrap: nowrap;
  display: flex;
  gap: ${scrollingContainerItemsGap};
  overflow-x: auto;
  padding-bottom: ${(p) => p.theme.space.md};
  scroll-snap-type: x mandatory;
  margin-right: -${(p) => p.theme.space.md};
  margin-left: -${(p) => p.theme.space.md};

  @media (min-width: ${(p) => p.theme.breakpoints.sm}) {
    margin-right: -${(p) => p.theme.space.xxl};
    margin-left: -${(p) => p.theme.space.xxl};
  }

  // Hide scrollbar
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const StyledItem = styled.div`
  overflow: visible;
  flex: 0 0 auto;
  width: calc(
    100% - ${(p) => p.theme.space.md}*2 - ${scrollingContainerItemsGap}
  );
  scroll-snap-align: start;
  scroll-margin: ${(p) => p.theme.space.md};

  &:first-child {
    margin-left: ${(p) => p.theme.space.xxl};
  }
  &:last-child {
    margin-right: ${(p) => p.theme.space.xxl};
    scroll-snap-align: end;
  }

  @media (min-width: ${(p) => p.theme.breakpoints.sm}) {
    scroll-margin: ${(p) => p.theme.space.xxl};
  }

  @container scrollingContainer (min-width: 500px) {
    width: calc(
      (
          100% - ${scrollingContainerItemsGap} - ${(p) => p.theme.space.xxl} -
            ${(p) => p.theme.space.xxl}
        ) / 2
    );
  }
  @container scrollingContainer (min-width: 900px) {
    width: calc(
      (
          100% - ${scrollingContainerItemsGap}*2 - ${(p) => p.theme.space.xxl} -
            ${(p) => p.theme.space.xxl}
        ) / 3
    );
  }
  @container scrollingContainer (min-width: 1300px) {
    width: calc(
      (
          100% - ${scrollingContainerItemsGap}*3 - ${(p) => p.theme.space.xxl} -
            ${(p) => p.theme.space.xxl}
        ) / 4
    );
  }
  @container scrollingContainer (min-width: ${(p) => p.theme.breakpoints.xxl}) {
    flex-wrap: wrap;
  }
`;

export const ScrollingGrid = StyledGrid as typeof StyledGrid & {
  Item: typeof StyledItem;
};

ScrollingGrid.Item = StyledItem;
