import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const AnimatedContainer = styled.div`
  visibility: visible;
  animation: ${fadeIn} 300ms ease-in;
  transition: visibility 300ms ease-in;
`;
