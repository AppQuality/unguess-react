import styled from 'styled-components';

export const Pipe = styled.span<{ size?: 'small' | 'regular' | 'large' }>`
  border-left: 1px solid ${({ theme }) => theme.palette.grey[300]};
  display: none;

  /* regular */
  height: ${({ theme }) => theme.space.md};
  margin-right: ${({ theme }) => theme.space.sm};
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: inline;
  }

  /* small */
  ${(p) =>
    p.size === 'small' &&
    `
      height: ${p.theme.space.sm};
      margin-right: ${p.theme.space.xs};
      @media (min-width: ${p.theme.breakpoints.md}) {
        display: inline;
      }
  `}

  /* large */
  ${(p) =>
    p.size === 'large' &&
    `
      height: ${p.theme.space.lg};
      margin-right: ${p.theme.space.md};
  `}
`;
