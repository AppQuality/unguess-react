import { SM, IconButton } from '@appquality/unguess-design-system';
import { PropsWithChildren, useState } from 'react';
import { formatDuration } from 'src/pages/Videos/utils/formatDuration';
import { styled } from 'styled-components';
import { ReactComponent as PlayIcon } from 'src/assets/icons/play-fill.svg';
import { Notes } from 'src/pages/ExpressWizard/notesCard';
import { getColorWithAlpha } from 'src/common/utils';
import { appTheme } from 'src/app/theme';
import { ReactComponent as ChevronIcon } from 'src/assets/icons/chevron-down-stroke.svg';
import { getSentiment } from './sentiment';

interface IParagraphMeta {
  speakers: number;
  start: number;
  end: number;
  speakerIndex: number;
  setCurrentTime: (time: number) => void;
  sentiment?: {
    start: number;
    end: number;
    value: number;
    comment: string;
  };
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
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

export const ParagraphMeta = ({
  speakers,
  start,
  end,
  speakerIndex,
  children,
  setCurrentTime,
  sentiment,
}: PropsWithChildren<IParagraphMeta>) => {
  const [isOpen, setIsOpen] = useState(false);
  const sentimentObj = sentiment ? getSentiment(sentiment.value) : false;
  return (
    <StyledDiv>
      <Header>
        <StyledSM data-unselectable>
          <IconButton size="small" onClick={() => setCurrentTime(start)}>
            <PlayIcon />
          </IconButton>
          {speakers > 1 && <b>Speaker {speakerIndex + 1} </b>}
          {formatDuration(start)} - {formatDuration(end)}
        </StyledSM>
        {sentimentObj && sentimentObj.text && (
          <Flex>
            {sentimentObj.text}
            <IconButton
              isRotated={isOpen}
              size="small"
              onClick={() => setIsOpen(!isOpen)}
            >
              <ChevronIcon />
            </IconButton>
          </Flex>
        )}
      </Header>
      {sentimentObj && isOpen && (
        <Notes
          style={{
            backgroundColor: getColorWithAlpha(sentimentObj.color, 0.1),
            color: sentimentObj.color,
            marginBottom: appTheme.space.sm,
          }}
        >
          {sentiment?.comment ?? ''}
        </Notes>
      )}
      {children}
    </StyledDiv>
  );
};
