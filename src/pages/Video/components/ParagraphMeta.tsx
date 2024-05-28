import { SM } from '@appquality/unguess-design-system';
import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

interface IParagraphMeta {
  speakers: number;
  start: number;
  end: number;
  speakerIndex: number;
}

export const formatDuration = (durationInSeconds: number) => {
  const min = Math.floor(durationInSeconds / 60);
  const sec = Math.floor(durationInSeconds - min * 60);

  const minutes = `${min}`.padStart(2, '0');
  const seconds = `${sec}`.padStart(2, '0');

  return `${minutes}:${seconds}`;
};

const StyledSM = styled(SM)`
  user-select: none;
  margin-bottom: ${({ theme }) => theme.space.sm};
  line-height: ${({ theme }) => theme.lineHeights.sm};

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
}: PropsWithChildren<IParagraphMeta>) => (
  <StyledDiv>
    <StyledSM data-unselectable>
      {speakers > 1 && <b>Speaker {speakerIndex + 1} </b>}
      {formatDuration(start)} - {formatDuration(end)}
    </StyledSM>
    {children}
  </StyledDiv>
);
