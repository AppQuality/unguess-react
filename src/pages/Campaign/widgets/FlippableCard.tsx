import {
  SpecialCard,
  IconButton,
  MD,
  theme as ugTheme,
} from '@appquality/unguess-design-system';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ReactComponent as LineGraphIconStroke } from '@zendeskgarden/svg-icons/src/16/line-graph-stroke.svg';
import { ReactComponent as LineGraphIconFill } from '@zendeskgarden/svg-icons/src/16/line-graph-fill.svg';
import { ReactComponent as ListBulletIconStroke } from '@zendeskgarden/svg-icons/src/16/list-bullet-stroke.svg';
import { ReactComponent as ListBulletIconFill } from '@zendeskgarden/svg-icons/src/16/list-bullet-fill.svg';
import React, { useRef } from 'react';
import { Divider } from 'src/common/components/divider';
import styled from 'styled-components';

const StyledSpecialCard = styled(SpecialCard)`
  border-radius: ${({ theme }) => theme.borderRadii.xl};
`;

type FaceType = 'front' | 'back';

interface FlipCardHeader {
  visibleFace: FaceType;
  setVisibleFace: (face: FaceType) => void;
}
interface FlipCardBody {
  visibleFace: FaceType;
}

const FlippableCard = ({ children }: { children?: React.ReactNode }) => {
  const [visibleFace, setVisibleFace] = React.useState<FaceType>('front');
  const cardChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null;
    if (
      typeof child.type !== 'string' &&
      child.type.name === 'WidgetCardHeader'
    ) {
      const el = React.cloneElement<FlipCardHeader>(
        child as React.ReactElement,
        {
          visibleFace,
          setVisibleFace,
        }
      );
      return el;
    }
    if (
      typeof child.type !== 'string' &&
      child.type.name === 'WidgetCardBody'
    ) {
      const el = React.cloneElement<FlipCardBody>(child as React.ReactElement, {
        visibleFace,
      });
      return el;
    }
    return child;
  });

  return <StyledSpecialCard>{cardChildren}</StyledSpecialCard>;
};

const CapitalizeFirstLetter = styled.span`
  &:first-letter {
    text-transform: uppercase;
  }
`;

const FlipButton = styled(IconButton)<{ isActive?: boolean }>`
  background-color: ${(p) =>
    p.isActive ? p.theme.palette.blue[600] : 'transparent'};
  &:hover {
    background-color: ${(p) =>
      p.isActive ? p.theme.palette.blue[600] : p.theme.palette.grey[100]};
  }
  transition: background-color 0.25s ease-in-out;
  margin-left: ${(p) => p.theme.space.xs};
`;

const WidgetCardHeader = ({
  children,
  setVisibleFace,
  visibleFace,
}: {
  children: React.ReactNode;
  setVisibleFace?: (face: FaceType) => void;
  visibleFace?: FaceType;
}) => (
  <>
    <SpecialCard.Meta justifyContent="space-between">
      <MD style={{ color: ugTheme.palette.grey[800] }}>
        <CapitalizeFirstLetter>{children}</CapitalizeFirstLetter>
      </MD>
      {setVisibleFace && (
        <div>
          <FlipButton
            isActive={visibleFace === 'front'}
            size="small"
            onClick={() => setVisibleFace('front')}
          >
            <>
              {visibleFace === 'front' && <LineGraphIconFill color="white" />}
              {visibleFace === 'back' && <LineGraphIconStroke />}
            </>
          </FlipButton>
          <FlipButton
            size="small"
            isActive={visibleFace === 'back'}
            onClick={() => setVisibleFace('back')}
          >
            <>
              {visibleFace === 'front' && <ListBulletIconStroke />}
              {visibleFace === 'back' && <ListBulletIconFill color="white" />}
            </>
          </FlipButton>
        </div>
      )}
    </SpecialCard.Meta>
    <Divider />
  </>
);

const WidgetCardFooter = ({ children }: { children: React.ReactNode }) => (
  <SpecialCard.Footer>{children}</SpecialCard.Footer>
);

const WidgetCardFaceContent = styled.div`
  margin-bottom: ${({ theme }) => theme.space.xxs};
  margin-top: ${({ theme }) => theme.space.xxs};
  position: absolute;
  background-color: white;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  &.face-enter {
    opacity: 0;
  }
  &.face-enter-active,
  &.face-enter-done {
    opacity: 1;
    transition: opacity 500ms;
  }
  &.face-exit {
    opacity: 1;
  }
  &.face-exit-active,
  &.face-exit-done {
    opacity: 0;
    transition: opacity 500ms;
  }
`;

const WidgetCardBody = ({
  front,
  back,
  visibleFace,
  height,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  height?: string;
  visibleFace?: FaceType;
}) => {
  const frontRef = useRef(null);
  const backRef = useRef(null);
  return (
    <div
      style={{
        position: 'relative',
        height: `${height || 'auto'}`,
        width: '100%',
      }}
    >
      <CSSTransition
        in={visibleFace === 'back'}
        timeout={600}
        classNames="face"
      >
        <WidgetCardFaceContent ref={backRef}>{back}</WidgetCardFaceContent>
      </CSSTransition>
      <CSSTransition
        in={visibleFace === 'front'}
        timeout={600}
        classNames="face"
      >
        <WidgetCardFaceContent ref={frontRef}>{front}</WidgetCardFaceContent>
      </CSSTransition>
    </div>
  );
};

FlippableCard.Header = WidgetCardHeader;
FlippableCard.Footer = WidgetCardFooter;
FlippableCard.Body = WidgetCardBody;
export { FlippableCard };
