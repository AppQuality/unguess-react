import { useContext, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { FlipCardContext } from '.';
import { FlipCardBodyProps } from './types';

const durationMilliseconds = 500;

const WidgetCardFaceContent = styled.div`
  margin-bottom: ${({ theme }) => theme.space.xxs};
  margin-top: ${({ theme }) => theme.space.xxs};
  background-color: white;
  width: 100%;
  height: 100%;

  &.face-enter {
    opacity: 0;
  }
  &.face-enter-active {
    position: absolute;
  }
  &.face-enter-active,
  &.face-enter-done {
    opacity: 1;
    transition: opacity ${durationMilliseconds}ms;
  }
  &.face-exit {
    opacity: 1;
  }
  &.face-exit-active,
  &.face-exit-done {
    opacity: 0;
    transition: opacity ${durationMilliseconds}ms;
  }
`;

export const FlipCardBody = ({
  front,
  back,
  height = 'auto',
}: FlipCardBodyProps) => {
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const context = useContext(FlipCardContext);
  const { visibleFace } = context;

  return (
    <TransitionGroup
      style={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
      }}
    >
      {visibleFace === 'back' && (
        <CSSTransition timeout={durationMilliseconds} classNames="face">
          <WidgetCardFaceContent ref={backRef}>{back}</WidgetCardFaceContent>
        </CSSTransition>
      )}
      {visibleFace === 'front' && (
        <CSSTransition timeout={durationMilliseconds} classNames="face">
          <WidgetCardFaceContent ref={frontRef}>{front}</WidgetCardFaceContent>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};
