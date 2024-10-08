import {
  Tag,
  useVideoContext as usePlayerContext,
} from '@appquality/unguess-design-system';
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
    width: 16px;
    min-width: 0;
    margin-right: ${({ theme }) => theme.space.xxs};
  }
`;

export const ObservationTooltip = ({
  observationId,
  color,
  label,
  isSelecting,
  start,
}: {
  start?: number;
  observationId: number;
  color?: string;
  label?: string;
  isSelecting?: boolean;
}) => {
  const { context, setIsPlaying } = usePlayerContext();
  const { setOpenAccordion } = useVideoContext();
  return (
    <StyledTag
      size="large"
      color={color}
      onClick={() => {
        setOpenAccordion({ id: observationId });
        if (start && context?.player?.ref.current) {
          context.player.ref.current.currentTime = start;
          context.player.ref.current.play();
          setIsPlaying(true);
        }
      }}
      isSelecting={isSelecting}
    >
      <TagIcon />
      {label}
    </StyledTag>
  );
};
