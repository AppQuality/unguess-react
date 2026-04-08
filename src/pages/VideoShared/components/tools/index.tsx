import { Button, Span } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useContent } from '../Transcript/useContent';
import { ReactComponent as ShowSentimentIcon } from './assets/showSentimentIcon.svg';
import { useToolsContext } from './context/ToolsContext';
import { useTranslationTools } from './hooks/useTranslationTools';

const ShowHideSentiment = () => {
  const { videoId } = useParams();
  const { t } = useTranslation();
  const { sentiments } = useContent(videoId || '');
  const { showSentiment, setShowSentiment } = useToolsContext();

  if (!sentiments) return null;

  return (
    <Button isBasic onClick={() => setShowSentiment(!showSentiment)}>
      <Button.StartIcon>
        <ShowSentimentIcon />
      </Button.StartIcon>
      <Span>
        {showSentiment
          ? t('__TOOLS_MENU_ITEM_HIDE_SENTIMENT_LABEL')
          : t('__TOOLS_MENU_ITEM_SHOW_SENTIMENT_LABEL')}
      </Span>
    </Button>
  );
};

const ToolsWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
`;

export const Tools = () => {
  const { isError } = useTranslationTools();

  if (isError) return null;

  return (
    <ToolsWrapper>
      <ShowHideSentiment />
    </ToolsWrapper>
  );
};
