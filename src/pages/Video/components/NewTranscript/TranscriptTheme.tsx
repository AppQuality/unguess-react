import {
  IconButton,
  SM,
  Tag,
  Theme,
  Tooltip,
} from '@appquality/unguess-design-system';
import { ReactComponent as PlayIcon } from 'src/assets/icons/play-fill.svg';
import { ReactComponent as TagIcon } from 'src/assets/icons/tag-icon.svg';
import { formatDuration } from 'src/pages/Videos/utils/formatDuration';
import { styled } from 'styled-components';

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

const ActiveWrapper = styled.span`
  background-color: rgba(214, 83, 194, 0.4);
  display: inline-block;
`;

const WordWrapper = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: ${({ theme }) => theme.space.xxs} 0;
  position: relative;
  color: ${({ theme }) => theme.palette.grey[700]};
  line-height: 32px;
`;

const TagWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`;

export const TranscriptTheme = Theme.configure({
  speakerWrapper: ({ start, end, setCurrentTime }) => (
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
  ),
  activeWrapper: ({ children }) => <ActiveWrapper>{children}</ActiveWrapper>,
  wordWrapper: ({ children }) => <WordWrapper>{children}</WordWrapper>,
  observationWrapper: ({ title, color, children, observations }) => {
    const background = `${color}50`;
    return (
      <span
        data-title={title}
        style={{
          background,
          display: 'inline-block',
        }}
      >
        <Tooltip
          size="medium"
          isTransparent
          content={
            <TagWrapper>
              {observations.map((o) => (
                <div>
                  <Tag size="large" hue={o.color} color="white">
                    <TagIcon /> {o.title}
                  </Tag>
                </div>
              ))}
            </TagWrapper>
          }
        >
          <span>{children}</span>
        </Tooltip>
      </span>
    );
  },
  searchStyleWrapper: styled.div`
    .search-result {
      background-color: ${({ theme }) => theme.palette.product.talk};
    }
  `,
});
