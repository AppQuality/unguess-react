import { styled } from 'styled-components';

export const CardBackground = styled.div<{ isOpen?: boolean }>`
  padding-top: ${({ theme }) => theme.space.md};
  padding-right: ${({ theme }) => theme.space.xs};
  padding-left: ${({ theme }) => theme.space.xs};

  ${({ isOpen, theme }) =>
    isOpen &&
    `
    background-color: ${theme.palette.grey[800]};
  `}
`;
