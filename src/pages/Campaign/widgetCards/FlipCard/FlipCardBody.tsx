import styled from 'styled-components';
import { useFlipCardContext } from './context/FlipCardContext';
import { FlipCardBodyProps } from './types';

const durationMilliseconds = 500;

const FlipCardFaceContainer = styled.div<{ breakpoint: number }>`
  container-type: inline-size;
  .flipcard-face {
    transform-style: preserve-3d;
    animation-duration: ${durationMilliseconds}ms;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }
  .flipcard-face-back {
    animation-name: show;
  }
  .flipcard-face-front {
    animation-name: hide;
  }
  @container (min-width: ${(p) => p.breakpoint}px) {
    .flipcard-face-front {
      z-index: 2;
    }
    .flipcard-face-back {
      z-index: 1;
    }
    &.flipcard.front {
      .flipcard-face-front {
        animation-name: show;
      }
      .flipcard-face-back {
        animation-name: hide;
      }
    }
    &.flipcard.back {
      .flipcard-face-front {
        animation-name: hide;
      }
      .flipcard-face-back {
        animation-name: show;
      }
    }
  }
  @keyframes hide {
    0% {
      opacity: 1;
      height: auto;
    }
    100% {
      opacity: 0;
      height: 0;
    }
  }
  @keyframes show {
    0% {
      opacity: 0;
      height: 0;
    }
    100% {
      opacity: 1;
      height: auto;
    }
  }
`;

const FlipCardFaceContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.space.xxs};
  margin-top: ${({ theme }) => theme.space.xxs};
`;

export const FlipCardBody = ({ front, back }: FlipCardBodyProps) => {
  const { visibleFace, breakpoint } = useFlipCardContext();

  return (
    <FlipCardFaceContainer
      breakpoint={breakpoint}
      className={`flipcard ${visibleFace}`}
    >
      <FlipCardFaceContent className="flipcard-face flipcard-face-back">
        {back}
      </FlipCardFaceContent>
      <FlipCardFaceContent className="flipcard-face flipcard-face-front">
        {front}
      </FlipCardFaceContent>
    </FlipCardFaceContainer>
  );
};
