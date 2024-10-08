import { Button, SM, useVideoContext } from '@appquality/unguess-design-system';
import { ReactComponent as PlayIcon } from 'src/assets/icons/play-fill.svg';
import { formatDuration } from 'src/pages/Videos/utils/formatDuration';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.space.xs} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const SpeakerWrapper = ({
  start,
  end,
  setCurrentTime,
  speaker,
  totalSpeakers,
}: {
  start: number;
  end: number;
  setCurrentTime?: (time: { start: number; end: number }) => void;
  speaker: number;
  totalSpeakers: number | null;
}) => {
  const { context, setIsPlaying } = useVideoContext();
  return (
    <Wrapper>
      {totalSpeakers && totalSpeakers > 1 ? (
        <SM isBold>Speaker {speaker + 1}</SM>
      ) : null}
      <Button
        isBasic
        size="small"
        onClick={
          setCurrentTime
            ? () => {
                setCurrentTime({ start, end });
                context.player?.ref?.current?.play();
                setIsPlaying(true);
              }
            : undefined
        }
      >
        <ButtonWrapper>
          <PlayIcon width="12" />
          {formatDuration(start)}
        </ButtonWrapper>
      </Button>
    </Wrapper>
  );
};

export default SpeakerWrapper;
