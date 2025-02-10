import React from 'react';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';

const Container = styled.div<{
  isNotBoxed?: boolean;
}>`
  width: 100%;
  box-sizing: border-box;
  padding: 0 ${({ theme }) => theme.space.md};
  margin: 0 auto;
  max-width: ${({ theme, isNotBoxed }) =>
    isNotBoxed ? '100%' : theme.breakpoints.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.space.xxl};
  }
`;

export const LayoutWrapper = (
  props: React.ComponentProps<typeof Container>
) => {
  const { className, isNotBoxed, ...rest } = props;

  return (
    <Container
      className={
        className
          ? `layout-wrapper ${isNotBoxed ? 'not-boxed' : 'boxed'} ${className}`
          : `layout-wrapper ${isNotBoxed ? 'not-boxed' : 'boxed'}`
      }
      isNotBoxed={isNotBoxed}
      {...rest}
    />
  );
};

const scrollingContainerItemsGap = appTheme.space.md;
const ScrollingContainer = styled.div`
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

  .scrolling-wrapper-item {
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
  }

  @media (min-width: ${(p) => p.theme.breakpoints.sm}) {
    margin-right: -${(p) => p.theme.space.xxl};
    margin-left: -${(p) => p.theme.space.xxl};

    .scrolling-wrapper-item {
      scroll-margin: ${(p) => p.theme.space.xxl};
    }
  }

  @container scrollingContainer (min-width: 500px) {
    .scrolling-wrapper-item {
      width: calc(
        (
            100% - ${scrollingContainerItemsGap} - ${(p) => p.theme.space.xxl} -
              ${(p) => p.theme.space.xxl}
          ) / 2
      );
    }
  }
  @container scrollingContainer (min-width: 900px) {
    .scrolling-wrapper-item {
      width: calc(
        (
            100% - ${scrollingContainerItemsGap}*2 - ${(p) => p.theme.space.xxl} -
              ${(p) => p.theme.space.xxl}
          ) / 3
      );
    }
  }
  @container scrollingContainer (min-width: 1300px) {
    .scrolling-wrapper-item {
      width: calc(
        (
            100% - ${scrollingContainerItemsGap}*3 - ${(p) => p.theme.space.xxl} -
              ${(p) => p.theme.space.xxl}
          ) / 4
      );
    }
  }
  @container scrollingContainer (min-width: ${(p) => p.theme.breakpoints.xxl}) {
    flex-wrap: wrap;
  }

  // Hide scrollbar
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

interface Props {
  children: React.ReactNode;
}

export const ScrollingGridWrapper = ({ children }: Props) => {
  const childrenArray = React.Children.toArray(children);
  const shouldScroll = childrenArray.length > 3;

  return (
    <ScrollingContainer>
      {childrenArray.map((child, index) => (
        <div key={index} className="scrolling-wrapper-item">
          {child}
        </div>
      ))}
    </ScrollingContainer>
  );
};
