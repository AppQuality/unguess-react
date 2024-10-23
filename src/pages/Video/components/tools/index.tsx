import { getLanguageNameByFullTag } from '@appquality/languages';
import {
  Button,
  IconButton,
  Notification,
  Span,
  Tooltip,
  useToast,
} from '@appquality/unguess-design-system';
import { ReactComponent as TranslateIcon } from '@zendeskgarden/svg-icons/src/16/translation-exists-fill.svg';
import { ReactComponent as SettingsIcon } from '@zendeskgarden/svg-icons/src/16/gear-fill.svg';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { FEATURE_FLAG_AI_TRANSLATION } from 'src/constants';
import {
  useGetVideosByVidQuery,
  useGetVideosByVidTranslationQuery,
  usePostVideosByVidTranslationMutation,
} from 'src/features/api';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { ToolsTranslate } from './ToolsTranslate';
import { useToolsContext } from './context/ToolsContext';
import { usePreferredLanguage } from './usePreferredLanguage';

export const Tools = () => {
  const { t } = useTranslation();
  const { videoId } = useParams();
  const { isOpen, setIsOpen, language, setLanguage } = useToolsContext();
  const { hasFeatureFlag } = useFeatureFlag();
  const hasAIFeatureFlag = hasFeatureFlag(FEATURE_FLAG_AI_TRANSLATION);

  const { addToast } = useToast();
  const [requestTranslation, { isLoading: isLoadingRequestTranslation }] =
    usePostVideosByVidTranslationMutation();

  const preferredLanguage = usePreferredLanguage();

  const { data: translation, isLoading: isLoadingTranslation } =
    useGetVideosByVidTranslationQuery(
      {
        vid: videoId || '',
        ...(language && { lang: language }),
      },
      {
        skip: !hasAIFeatureFlag || !language || !preferredLanguage,
      }
    );

  const { data: video } = useGetVideosByVidQuery({
    vid: videoId || '',
  });

  if (!hasAIFeatureFlag || isLoadingTranslation) return null;
  const canTranslate =
    !!preferredLanguage &&
    video &&
    video.language.localeCompare(preferredLanguage) !== 0 &&
    (!translation ||
      translation.language.localeCompare(preferredLanguage) !== 0);
  const isTranslating =
    translation &&
    translation.language === preferredLanguage &&
    translation.processing === 1;

  return (
    <div>
      <Button
        isBasic
        disabled={
          translation?.processing === 1 ||
          isLoadingRequestTranslation ||
          translation?.language === preferredLanguage
        }
        onClick={() => {
          if (canTranslate) {
            if (!preferredLanguage) return;
            requestTranslation({
              vid: videoId || '',
              body: {
                language: preferredLanguage,
              },
            })
              .unwrap()
              .then(() => {
                setLanguage(preferredLanguage);
              })
              .catch((e) => {
                // eslint-disable-next-line no-console
                console.error(e);

                addToast(
                  ({ close }) => (
                    <Notification
                      onClose={close}
                      type="error"
                      message={t('__TOOLS_TRANSLATE_TOAST_ERROR_MESSAGE')}
                      closeText={t('__TOAST_CLOSE_TEXT')}
                      isPrimary
                    />
                  ),
                  { placement: 'top' }
                );
              });
          } else {
            setIsOpen(true);
          }
        }}
      >
        <Button.StartIcon>
          <TranslateIcon />
        </Button.StartIcon>
        {preferredLanguage &&
        video?.language.localeCompare(preferredLanguage) !== 0 ? (
          <Span>
            {t('__TOOLS_MENU_ITEM_TRANSLATE_PREFERENCE_TITLE')}{' '}
            {getLanguageNameByFullTag(preferredLanguage)}
          </Span>
        ) : (
          t('__TOOLS_MENU_ITEM_BUTTON_LABEL')
        )}
      </Button>
      {isOpen && (
        <ToolsTranslate
          {...(translation && { currentLanguage: translation.language })}
        />
      )}
      {(preferredLanguage &&
        video?.language.localeCompare(preferredLanguage) !== 0) ||
      isTranslating ? (
        <Tooltip
          content={t('__TOOLS_MENU_ITEM_LANGUAGE_SETTINGS_TOOLTIP')}
          type="light"
          size="medium"
          onClick={(e: any) => {
            e.stopPropagation();
          }}
        >
          <IconButton
            disabled={translation?.processing === 1}
            style={{ marginLeft: appTheme.space.sm }}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <SettingsIcon color={appTheme.palette.blue[600]} />
          </IconButton>
        </Tooltip>
      ) : null}
    </div>
  );
};
