import styled from 'styled-components';

export const Pipe = styled.span<{ size?: 'small' | 'regular' | 'large' }>`
  /** Vertical Separator */
  border-left: 1px solid ${({ theme }) => theme.palette.grey[300]};
  display: inline;
  /* regular */
  height: ${({ theme }) => theme.space.lg};
  margin: 0 ${({ theme }) => theme.space.sm};
  /* small */
  ${(p) =>
    p.size === 'small' &&
    `
    margin: 0 0;
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    height: 0;
    margin: 0;
  }
`;
