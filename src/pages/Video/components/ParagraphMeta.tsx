import { SM, IconButton } from '@appquality/unguess-design-system';
import { PropsWithChildren } from 'react';
import { formatDuration } from 'src/pages/Videos/utils/formatDuration';
import { styled } from 'styled-components';
import { ReactComponent as PlayIcon } from 'src/assets/icons/play-fill.svg';

interface IParagraphMeta {
  speakers: number;
  start: number;
  end: number;
  speakerIndex: number;
  setCurrentTime: (time: number) => void;
}

const StyledSM = styled(SM)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  user-select: none;
  margin-bottom: ${({ theme }) => theme.space.sm};
  line-height: ${({ theme }) => theme.lineHeights.md};

  & > b {
    margin-right: ${({ theme }) => theme.space.xxs};
  }
`;

const StyledDiv = styled.div`
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

export const ParagraphMeta = ({
  speakers,
  start,
  end,
  speakerIndex,
  children,
  setCurrentTime,
}: PropsWithChildren<IParagraphMeta>) => (
  <StyledDiv>
    <StyledSM data-unselectable>
      <IconButton size="small" onClick={() => setCurrentTime(start)}>
        <PlayIcon />
      </IconButton>
      {speakers > 1 && <b>Speaker {speakerIndex + 1} </b>}
      {formatDuration(start)} - {formatDuration(end)}
    </StyledSM>
    {children}
  </StyledDiv>
);
