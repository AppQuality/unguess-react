import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from '@zendeskgarden/svg-icons/src/16/chevron-left-stroke.svg';
import { ReactComponent as ArrowRight } from '@zendeskgarden/svg-icons/src/16/chevron-right-stroke.svg';
import { useCallback, useEffect, useRef } from 'react';

const scrollingContainerItemsGap = appTheme.space.md;

const StyledGrid = styled.div`
  width: 100%;
  container-type: inline-size;
  container-name: scrollingContainer;
  flex-wrap: nowrap;
  display: flex;
  gap: ${scrollingContainerItemsGap};
  overflow-x: auto;
  padding-bottom: ${(p) => p.theme.space.xl};
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

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
        ) / 3.1
    );
  }
  @container scrollingContainer (min-width: 1410px) {
    width: calc(
      (
          100% - ${scrollingContainerItemsGap}*3 - ${(p) => p.theme.space.xxl} -
            ${(p) => p.theme.space.xxl}
        ) / 3.2
    );
  }
`;

const GridContainer = styled.div`
  position: relative;
  margin-right: -${(p) => p.theme.space.md};
  margin-left: -${(p) => p.theme.space.md};
  .navigation-left,
  .navigation-right {
    display: none;
  }

  @media (min-width: ${(p) => p.theme.breakpoints.sm}) {
    margin-right: -${(p) => p.theme.space.xxl};
    margin-left: -${(p) => p.theme.space.xxl};
  }
  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    .navigation-left,
    .navigation-right {
      // reset button properties
      appearance: none;
      border: none;
      background: none;
      padding: 0;
      cursor: auto;

      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      bottom: ${(p) => p.theme.space.xl};
      width: ${(p) => p.theme.space.xxl};
      min-width: ${(p) => p.theme.space.xxl};
      opacity: 0;
      transition: opacity 0.3s;
      z-index: 2;

      &:hover:not(.disabled) {
        opacity: 1;
        pointer-events: auto;
        cursor: pointer;
      }
    }
    .navigation-left {
      left: 0;
      background: linear-gradient(
        to left,
        rgba(255, 255, 255, 0.5),
        ${(p) => p.theme.palette.grey[100]}
      );
    }
    .navigation-right {
      right: 0;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.5),
        ${(p) => p.theme.palette.grey[100]}
      );
    }
  }
  @media (min-width: ${(p) => p.theme.breakpoints.xxl}) {
    &::after,
    &::before {
      position: absolute;
      z-index: 1;
      display: block;
      content: '';
      top: 0;
      bottom: 0;
      width: ${(p) => p.theme.space.xxl};
      min-width: ${(p) => p.theme.space.xxl};
      pointer-events: none;
    }
    &::after {
      right: 0;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0),
        ${(p) => p.theme.palette.grey[100]}
      );
    }
    &::before {
      background: linear-gradient(
        to left,
        rgba(255, 255, 255, 0),
        ${(p) => p.theme.palette.grey[100]}
      );
      left: 0;
    }
  }
`;

const ScrollingGridComponent = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const scrollingContainer = useRef<HTMLDivElement>(null);
  const wrapperContainer = useRef<HTMLDivElement>(null);
  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const rightButtonRef = useRef<HTMLButtonElement>(null);

  const scrollLeft = () => {
    if (scrollingContainer.current) {
      scrollingContainer.current.scrollBy({
        left: -(scrollingContainer.current.offsetWidth / 2),
        behavior: 'smooth',
      });
    }
  };
  const scrollRight = () => {
    if (scrollingContainer.current) {
      scrollingContainer.current.scrollBy({
        left: scrollingContainer.current.offsetWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = useCallback(() => {
    if (scrollingContainer.current) {
      if (scrollingContainer.current.scrollLeft === 0) {
        leftButtonRef.current?.classList.add('disabled');
      } else {
        leftButtonRef.current?.classList.remove('disabled');
      }
      if (
        Math.ceil(
          scrollingContainer.current.scrollLeft +
            scrollingContainer.current.offsetWidth
        ) >= Math.ceil(scrollingContainer.current.scrollWidth)
      ) {
        rightButtonRef.current?.classList.add('disabled');
      } else {
        rightButtonRef.current?.classList.remove('disabled');
      }
    }
  }, []);

  useEffect(() => {
    handleScroll();
    if (scrollingContainer.current) {
      scrollingContainer.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollingContainer.current) {
        scrollingContainer.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <GridContainer {...props} ref={wrapperContainer}>
      <button
        ref={leftButtonRef}
        type="button"
        name="scroll-left"
        title="Scroll left"
        className="disabled navigation-left"
        onClick={scrollLeft}
      >
        <ArrowLeft width={26} height={26} />
      </button>
      <StyledGrid role="list" ref={scrollingContainer}>
        {children}
      </StyledGrid>
      <button
        ref={rightButtonRef}
        type="button"
        name="scroll-right"
        title="Scroll right"
        className="disabled navigation-right"
        onClick={scrollRight}
      >
        <ArrowRight width={26} height={26} />
      </button>
    </GridContainer>
  );
};

export const ScrollingGrid =
  ScrollingGridComponent as typeof ScrollingGridComponent & {
    Item: typeof StyledItem;
  };

ScrollingGrid.Item = StyledItem;
