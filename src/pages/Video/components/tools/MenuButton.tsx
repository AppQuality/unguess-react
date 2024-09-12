import { Button } from '@appquality/unguess-design-system';
import { styled } from 'styled-components';

export const StyledButton = styled(Button)<{ readonly: boolean }>`
  display: flex;
  justify-content: flex-start;
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};
  border-radius: 0;

  &:focus {
    outline: 0;
    box-shadow: none;
  }

  ${({ readonly }) =>
    readonly &&
    `
    cursor: not-allowed;
    opacity: 0.5;
  `}
`;

export const MenuButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode | React.ReactNode[];
  onClick: () => void;
}) => (
  <StyledButton isBasic size="large" isStretched onClick={onClick}>
    {children}
  </StyledButton>
);
