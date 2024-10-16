import { getLanguageNameByFullTag } from '@appquality/languages';
import {
  Button,
  IconButton,
  Notification,
  Span,
  Spinner,
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

  // A preferred language is set and it's different from the video language and it's not already translated
  const canTranslate =
    !!preferredLanguage &&
    video &&
    video.language.localeCompare(preferredLanguage) !== 0 &&
    (!translation ||
      translation.language.localeCompare(preferredLanguage) !== 0);

  return (
    <div>
      <Button
        isBasic
        disabled={isLoadingRequestTranslation}
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

                addToast(
                  ({ close }) => (
                    <Notification
                      onClose={close}
                      type="success"
                      message={t('__TOOLS_TRANSLATE_TOAST_SUCCESS_MESSAGE')}
                      closeText={t('__TOAST_CLOSE_TEXT')}
                      isPrimary
                    />
                  ),
                  { placement: 'top' }
                );
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
        {canTranslate && preferredLanguage ? (
          <Span>
            {t('__TOOLS_MENU_ITEM_TRANSLATE_PREFERENCE_TITLE')}{' '}
            {getLanguageNameByFullTag(preferredLanguage)}
          </Span>
        ) : (
          t('__TOOLS_MENU_ITEM_BUTTON_LABEL')
        )}
        {isLoadingRequestTranslation && (
          <Button.EndIcon>
            <Spinner
              size={appTheme.space.md}
              color={appTheme.palette.grey[400]}
              style={{ marginLeft: appTheme.space.sm }}
            />
          </Button.EndIcon>
        )}
      </Button>
      {isOpen && (
        <ToolsTranslate
          {...(translation && { currentLanguage: translation.language })}
        />
      )}
      {!!canTranslate && (
        <IconButton
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <SettingsIcon color={appTheme.palette.blue[600]} />
        </IconButton>
      )}
    </div>
  );
};
