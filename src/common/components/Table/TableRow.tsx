import { Row } from '@zendeskgarden/react-tables';
import styled from 'styled-components';

interface TableRowProps {
  children: React.ReactNode;
  id: string;
  isSelected?: boolean;
  isHighlighted?: boolean;
  onClick?: (id: string) => void;
  borderColor?: string;
}

const StyledRow = styled(Row)<{
  isHighlighted?: boolean;
  isSelected?: boolean;
  borderColor?: string;
}>`
  cursor: pointer;
  position: relative;
  border-left: ${({ borderColor }) =>
    borderColor ? `2px solid ${borderColor}` : 'none'};
  border-bottom: 2px solid ${({ theme }) => theme.palette.grey[200]};
  border-top: 1px solid ${({ theme }) => theme.palette.grey[100]};
  background-color: ${({ theme }) => theme.palette.grey[100]};
  ${({ isHighlighted, theme }) =>
    isHighlighted && `background-color: ${theme.palette.white};`}
  ${({ isSelected, theme }) =>
    isSelected && `background-color: ${theme.palette.blue[100]};`}
  > td {
    box-shadow: none !important;
  }
  &:hover {
    z-index: 1;
    border-bottom-color: ${({ theme }) => theme.palette.grey[200]};
    box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
    background-color: ${({ theme }) => theme.palette.grey[100]};
    ${({ isHighlighted, theme }) =>
      isHighlighted && `background-color: ${theme.palette.white};`}
    ${({ isSelected, theme }) =>
      isSelected && `background-color: ${theme.palette.blue[100]};`}
  }
`;

export const TableRow = ({
  children,
  isSelected,
  isHighlighted,
  onClick,
  borderColor,
  id,
}: TableRowProps) => {
  const clickAction = () => {
    if (onClick) {
      onClick(id);
    }
  };
  return (
    <StyledRow
      onClick={clickAction}
      isSelected={isSelected}
      isHighlighted={isHighlighted}
      borderColor={borderColor}
    >
      {children}
    </StyledRow>
  );
};
