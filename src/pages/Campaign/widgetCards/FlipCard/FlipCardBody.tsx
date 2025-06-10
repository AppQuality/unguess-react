import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import styled from 'styled-components';
import { useFlipCardContext } from './context/FlipCardContext';
import { FlipCardBodyProps } from './types';

const FlipCardFaceContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.space.xxs};
  margin-top: ${({ theme }) => theme.space.xxs};
`;

export const FlipCardBody = ({ front, back }: FlipCardBodyProps) => {
  const { visibleFace } = useFlipCardContext();

  return (
    <FlipCardFaceContent>
      <AnimatePresence mode="wait">
        <motion.div
          key={visibleFace}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ width: '100%', height: '100%' }}
        >
          {visibleFace === 'front' && front}
          {visibleFace === 'back' && back}
        </motion.div>
      </AnimatePresence>
    </FlipCardFaceContent>
  );
};
