import { Tag } from '@appquality/unguess-design-system';
import { ReactComponent as TagIcon } from 'src/assets/icons/tag-icon.svg';
import { getColorWithAlpha } from 'src/common/utils';
import styled from 'styled-components';
import { useVideoContext } from '../context/VideoContext';

const StyledTag = styled(Tag)`
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  background: white;
  position: relative;

  &:hover {
    cursor: pointer;
    color: ${({ color }) => getColorWithAlpha(color ?? '', 0.5)};
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ color }) => color};
    opacity: 0.1;
  }

  > svg {
    min-width: 0;
    margin-right: ${({ theme }) => theme.space.xxs};
  }
`;

export const ObservationTooltip = ({
  observationId,
  color,
  label,
}: {
  observationId: number;
  color?: string;
  label?: string;
}) => {
  const { setOpenAccordion } = useVideoContext();
  return (
    <StyledTag
      size="large"
      color={color}
      onClick={() => setOpenAccordion({ id: observationId })}
    >
      <TagIcon />
      {label}
    </StyledTag>
  );
};
