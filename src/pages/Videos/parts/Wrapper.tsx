import { styled } from 'styled-components';

export const Wrapper = styled.div<{
  isFetching?: boolean;
}>`
  padding-top: ${(p) => p.theme.space.lg};

  ${(p) =>
    p.isFetching &&
    `
        opacity: 0.5;
        pointer-events: none;
      `}
`;
