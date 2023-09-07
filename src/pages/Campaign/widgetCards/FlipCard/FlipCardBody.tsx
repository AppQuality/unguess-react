import { useRef } from 'react';
import styled from 'styled-components';
import { useFlipCardContext } from './context/FlipCardContext';
import { FlipCardBodyProps } from './types';

const durationMilliseconds = 500;

const WidgetCardFaceContent = styled.div`
  @keyframes flip {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.space.xxs};
  margin-top: ${({ theme }) => theme.space.xxs};
  opacity: 0;
  transition: all ${durationMilliseconds}ms;
  animation: flip ${durationMilliseconds}ms ease-in-out;
  animation-fill-mode: both;
`;

export const FlipCardBody = ({ front, back }: FlipCardBodyProps) => {
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const { visibleFace } = useFlipCardContext();

  return (
    <div className={`face ${visibleFace}`}>
      {visibleFace === 'back' && (
        <WidgetCardFaceContent ref={backRef}>{back}</WidgetCardFaceContent>
      )}
      {visibleFace === 'front' && (
        <WidgetCardFaceContent ref={frontRef}>{front}</WidgetCardFaceContent>
      )}
    </div>
  );
};
