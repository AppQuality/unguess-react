import styled from 'styled-components';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useFlipCardContext } from './context/FlipCardContext';
import { FlipCardBodyProps } from './types';

const durationMilliseconds = 125;

const FaceContent = styled.div<{ isVisible?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.space.xxs};
  margin-top: ${({ theme }) => theme.space.xxs};
  transition: opacity ${durationMilliseconds}ms;
`;

const WidgetCard = styled.div`
  ${FaceContent} {
    &.flip-card-enter {
      opacity: 0;
    }
    &.flip-card-enter-active {
      opacity: 1;
    }
    &.flip-card-exit {
      opacity: 1;
    }
    &.flip-card-exit-active {
      opacity: 0;
    }
  }
`;

export const FlipCardBody = ({ front, back }: FlipCardBodyProps) => {
  const { visibleFace } = useFlipCardContext();

  return (
    <WidgetCard className={`face ${visibleFace}`}>
      <SwitchTransition>
        <CSSTransition
          key={visibleFace}
          timeout={durationMilliseconds}
          classNames="flip-card"
        >
          <FaceContent>{visibleFace === 'front' ? front : back}</FaceContent>
        </CSSTransition>
      </SwitchTransition>
    </WidgetCard>
  );
};
