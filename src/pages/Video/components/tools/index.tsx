import {
  Button,
  Dropdown,
  IconButton,
  Menu,
  Notification,
  Span,
  Trigger,
  useToast,
} from '@appquality/unguess-design-system';
import { ReactComponent as TranslateIcon } from '@zendeskgarden/svg-icons/src/16/translation-exists-stroke.svg';
import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AIMenuIcon } from 'src/assets/icons/ai-icon.svg';
import { FEATURE_FLAG_AI } from 'src/constants';
import {
  useGetUsersMePreferencesQuery,
  useGetVideosByVidQuery,
  usePostVideosByVidTranslationMutation,
} from 'src/features/api';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { useToolsContext } from './context/ToolsContext';
import { getLanguages } from './languages';
import { ToolsTranslate } from './ToolsTranslate';

export const Tools = () => {
  const { t } = useTranslation();
  const { videoId } = useParams();
  const { isOpen, setIsOpen, language, setLanguage } = useToolsContext();
  const languages = getLanguages();
  const { hasFeatureFlag } = useFeatureFlag();
  const hasAIFeatureFlag = hasFeatureFlag(FEATURE_FLAG_AI);

  const { addToast } = useToast();
  const [requestTranslation] = usePostVideosByVidTranslationMutation();

  const { data: preferences } = useGetUsersMePreferencesQuery();

  const languagePreference = preferences?.items?.find(
    (preference) => preference?.name === 'translations_language'
  );

  const preferredLanguage = languages.find(
    (lang) => lang.value === languagePreference?.value
  );

  useEffect(() => {
    if (!language && preferredLanguage) setLanguage(preferredLanguage);
  }, [preferredLanguage]);

  const { data: video } = useGetVideosByVidQuery({
    vid: videoId || '',
  });

  if (!hasAIFeatureFlag) return null;

  // A preferred language is set and it's different from the video language
  const canTranslate =
    language &&
    language.value &&
    language.value.localeCompare(video?.language ?? '');

  return (
    <>
      <Dropdown isOpen={isOpen}>
        <Trigger>
          <Button
            isBasic
            size="large"
            onClick={() => {
              if (canTranslate) {
                requestTranslation({
                  vid: videoId || '',
                  body: {
                    language: language.value,
                  },
                })
                  .unwrap()
                  .then(() => {
                    setIsOpen(false);

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
            style={{ marginLeft: appTheme.space.md }}
          >
            <Button.StartIcon>
              <AIMenuIcon />
            </Button.StartIcon>
            {canTranslate ? (
              <Trans i18nKey="__TOOLS_MENU_ITEM_TRANSLATE_PREFERENCE_TITLE">
                Translate in &nbsp;
                <Span style={{ textTransform: 'lowercase' }}>
                  {{
                    language: language?.label,
                  }}
                </Span>
              </Trans>
            ) : (
              t('__TOOLS_MENU_ITEM_BUTTON_LABEL')
            )}
          </Button>
        </Trigger>
        <Menu hasArrow zIndex={appTheme.levels.front}>
          <div style={{ padding: appTheme.space.xs }}>
            <ToolsTranslate />
          </div>
        </Menu>
      </Dropdown>
      {!!canTranslate && (
        <IconButton
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <TranslateIcon />
        </IconButton>
      )}
    </>
  );
};
