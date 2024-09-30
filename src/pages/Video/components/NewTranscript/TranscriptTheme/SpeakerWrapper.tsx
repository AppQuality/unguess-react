import { IconButton, SM } from '@appquality/unguess-design-system';
import { ReactComponent as PlayIcon } from 'src/assets/icons/play-fill.svg';
import { formatDuration } from 'src/pages/Videos/utils/formatDuration';
import { styled } from 'styled-components';

const StyledSM = styled(SM)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  user-select: none;
  margin-bottom: ${({ theme }) => theme.space.sm};

  & > b {
    margin-right: ${({ theme }) => theme.space.xxs};
  }
`;

const StyledDiv = styled.div`
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const SpeakerWrapper = ({
  start,
  end,
  setCurrentTime,
}: {
  start: number;
  end: number;
  setCurrentTime?: (time: { start: number; end: number }) => void;
}) => (
  <StyledDiv>
    <StyledSM />
    <IconButton
      size="small"
      onClick={
        setCurrentTime ? () => setCurrentTime({ start, end }) : undefined
      }
    >
      <PlayIcon />
    </IconButton>
    {formatDuration(start)} - {formatDuration(end)}
  </StyledDiv>
);

export default SpeakerWrapper;
