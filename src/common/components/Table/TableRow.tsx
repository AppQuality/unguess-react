import { Row } from '@zendeskgarden/react-tables';
import { FC } from 'react';
import styled from 'styled-components';

interface TableRowProps {
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
  border-left: ${({ borderColor }) =>
    borderColor ? `2px solid ${borderColor}` : 'none'};
  border-bottom: 2px solid ${({ theme }) => theme.palette.grey[200]};
  border-top: 1px solid ${({ theme }) => theme.palette.grey[100]};
  &:hover {
    box-shadow: 0px 4px 8px rgba(47, 57, 65, 0.15);
  }
  background-color: ${({ theme }) => theme.palette.grey[100]};
  ${({ isHighlighted, theme }) =>
    isHighlighted && `background-color: ${theme.palette.white};`}
  ${({ isSelected, theme }) =>
    isSelected && `background-color: ${theme.palette.blue[100]};`}
  > td {
    box-shadow: none !important;
  }
`;

export const TableRow: FC<TableRowProps> = ({
  children,
  isSelected,
  isHighlighted,
  onClick,
  borderColor,
  id,
}) => {
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
