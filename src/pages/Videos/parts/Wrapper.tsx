import { styled } from 'styled-components';

export const Wrapper = styled.div<{
  isFetching?: boolean;
}>`
  ${(p) =>
    p.isFetching &&
    `
        opacity: 0.5;
        pointer-events: none;
      `}
`;
