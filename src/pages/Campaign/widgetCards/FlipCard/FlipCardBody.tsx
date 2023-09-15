import styled from 'styled-components';
import { useFlipCardContext } from './context';

interface FlipCardBodyProps {
  front: React.ReactNode;
  back?: React.ReactNode;
}

const durationMilliseconds = 125;

const FaceContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.space.xxs};
  margin-top: ${({ theme }) => theme.space.xxs};
`;

const WidgetCard = styled.div<{ breakpoint: number }>`
  container-type: inline-size;

  .flipcard-face {
    overflow: hidden;
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
      display: block;
    }
    99% {
      display: block;
    }
    100% {
      display: none;
      opacity: 0;
    }
  }
  @keyframes show {
    0% {
      opacity: 0;
      display: none;
    }
    1% {
      display: block;
    }
    100% {
      display: block;
      opacity: 1;
    }
  }
`;

export const FlipCardBody = ({ front, back }: FlipCardBodyProps) => {
  const { visibleFace, breakpoint } = useFlipCardContext();

  return (
    <WidgetCard breakpoint={breakpoint} className={`flipcard ${visibleFace}`}>
      <FaceContent className="flipcard-face flipcard-face-front">
        {front}
      </FaceContent>
      <FaceContent className="flipcard-face flipcard-face-back">
        {back}
      </FaceContent>
    </WidgetCard>
  );
};
