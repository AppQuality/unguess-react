import { getLanguageNameByFullTag } from '@appquality/languages';
import {
  Button,
  IconButton,
  Span,
  Tooltip,
} from '@appquality/unguess-design-system';
import { ReactComponent as SettingsIcon } from '@zendeskgarden/svg-icons/src/16/gear-fill.svg';
import { ReactComponent as TranslateIcon } from '@zendeskgarden/svg-icons/src/16/translation-exists-fill.svg';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { styled } from 'styled-components';
import { useContent } from '../Transcript/useContent';
import { ReactComponent as ShowSentimentIcon } from './assets/showSentimentIcon.svg';
import { useToolsContext } from './context/ToolsContext';
import { useRequestTranslation } from './hooks/useRequestTranslation';
import { useTranslationTools } from './hooks/useTranslationTools';
import { ToolsTranslate } from './ToolsTranslate';

const TranslateModal = () => {
  const { data } = useTranslationTools();
  const { isOpen } = useToolsContext();

  if (!isOpen) return null;

  return (
    <ToolsTranslate
      {...(data.translation && {
        currentLanguage: data.translation.language,
      })}
    />
  );
};

const TranslateButton = () => {
  const { t } = useTranslation();
  const { videoId } = useParams();
  const { isProcessing, data } = useTranslationTools();
  const { setIsOpen } = useToolsContext();

  const translate = useRequestTranslation({
    language: data.preferredLanguage,
    videoId: videoId || '',
  });

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <Button
      isBasic
      disabled={isProcessing}
      onClick={
        data.hasQuickTranslate && data.preferredLanguage ? translate : openModal
      }
    >
      <Button.StartIcon>
        <TranslateIcon />
      </Button.StartIcon>
      {data.hasQuickTranslate && data.preferredLanguage ? (
        <Span>
          {t('__TOOLS_MENU_ITEM_TRANSLATE_PREFERENCE_TITLE')}{' '}
          {getLanguageNameByFullTag(data.preferredLanguage)}
        </Span>
      ) : (
        <Span>{t('__TOOLS_MENU_ITEM_BUTTON_LABEL')}</Span>
      )}
    </Button>
  );
};

const OpenModalButton = () => {
  const { t } = useTranslation();
  const { isError, isProcessing, data } = useTranslationTools();
  const { isOpen, setIsOpen } = useToolsContext();

  if (isError || !data.hasQuickTranslate || !data.preferredLanguage)
    return null;

  return (
    <Tooltip
      content={t('__TOOLS_MENU_ITEM_LANGUAGE_SETTINGS_TOOLTIP')}
      type="light"
      size="medium"
      onClick={(e) => e.stopPropagation()}
    >
      <IconButton disabled={isProcessing} onClick={() => setIsOpen(!isOpen)}>
        <SettingsIcon color={appTheme.palette.blue[600]} />
      </IconButton>
    </Tooltip>
  );
};

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
      <TranslateButton />
      <TranslateModal />
      <OpenModalButton />
      <ShowHideSentiment />
    </ToolsWrapper>
  );
};
