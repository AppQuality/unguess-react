import { Tag } from '@appquality/unguess-design-system';
import { ReactComponent as TagIcon } from 'src/assets/icons/tag-icon.svg';
import { getColorWithAlpha } from 'src/common/utils';
import styled from 'styled-components';
import { useVideoContext } from '../context/VideoContext';

const StyledTag = styled(Tag)<{
  isSelecting?: boolean;
}>`
  ${({ isSelecting }) =>
    isSelecting &&
    `
    display: none;
  `}
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  background: white;
  position: relative;
  user-select: none;

  &:hover {
    cursor: pointer;
    color: ${({ color }) => color};
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ color }) => getColorWithAlpha(color ?? '', 0.2)};
  }

  > svg {
    min-width: 0;
    margin-right: ${({ theme }) => theme.space.xxs};
  }
`;

export const ObservationTooltip = ({
  observationId,
  start,
  color,
  label,
  isSelecting,
  seekPlayer,
}: {
  observationId: number;
  start: number;
  color?: string;
  label?: string;
  isSelecting?: boolean;
  seekPlayer?: (time: number) => void;
}) => {
  const { setOpenAccordion } = useVideoContext();
  return (
    <StyledTag
      size="large"
      color={color}
      onClick={() => {
        setOpenAccordion({ id: observationId });
        seekPlayer?.(start);
      }}
      isSelecting={isSelecting}
    >
      <TagIcon />
      {label}
    </StyledTag>
  );
};
