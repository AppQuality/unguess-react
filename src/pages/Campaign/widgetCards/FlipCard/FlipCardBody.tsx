import { useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { useFlipCardContext } from './context/FlipCardContext';
import { FlipCardBodyProps } from './types';

const durationMilliseconds = 500;

const WidgetCardFaceContent = styled.div`
  margin-bottom: ${({ theme }) => theme.space.xxs};
  margin-top: ${({ theme }) => theme.space.xxs};
  height: calc(
    100% - ${({ theme }) => theme.space.xxs} - ${({ theme }) => theme.space.xxs}
  );

  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

export const FlipCardBody = ({ front, back }: FlipCardBodyProps) => {
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const { visibleFace } = useFlipCardContext();

  if (!back) {
    return <WidgetCardFaceContent>{front}</WidgetCardFaceContent>;
  }

  return (
    <TransitionGroup
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
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