import {
  Button,
  MD,
  Menu,
  Span,
  Notification,
  useToast,
  Spinner,
} from '@appquality/unguess-design-system';
import { ReactComponent as TranslateIcon } from '@zendeskgarden/svg-icons/src/16/translation-exists-stroke.svg';
// import { ReactComponent as BoltIcon } from '@zendeskgarden/svg-icons/src/16/lightning-bolt-stroke.svg';
// import { ReactComponent as SmileyIcon } from '@zendeskgarden/svg-icons/src/16/smiley-stroke.svg';
import { ReactComponent as ArrowRight } from 'src/assets/icons/chevron-right-icon.svg';
import { styled } from 'styled-components';
import { appTheme } from 'src/app/theme';
import { Trans, useTranslation } from 'react-i18next';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { FEATURE_FLAG_AI } from 'src/constants';
import {
  useGetUsersMePreferencesQuery,
  useGetVideosByVidQuery,
  usePostVideosByVidTranslationMutation,
} from 'src/features/api';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getAllLanguageTags } from '@appquality/languages-lib';
import { useToolsContext } from './context/ToolsContext';
import { MenuButton } from './MenuButton';
import { ToolsSentimentFlag } from './ToolsSentimentFlag';
import { ToolsAutotagFlag } from './ToolsAutotagFlag';
import { ToolsTranslateFlag } from './ToolsTranslateFlag';
import { ToolsTranslate } from './ToolsTranslate';

const Labels = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: ${({ theme }) => theme.space.lg};
`;

const ButtonLabels = ({
  title,
  subtitle,
}: {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
}) => (
  <Labels>
    <MD style={{ color: appTheme.palette.grey[800] }}>{title}</MD>
    {subtitle && (
      <MD style={{ color: appTheme.palette.grey[600] }}>{subtitle}</MD>
    )}
  </Labels>
);

export const ToolsMenu = () => {
  const { videoId } = useParams();
  const { t } = useTranslation();
  const { hasFeatureFlag } = useFeatureFlag();
  const hasAIFeatureFlag = hasFeatureFlag(FEATURE_FLAG_AI);
  const { activeItem, setActiveItem, setLanguage } = useToolsContext();
  const languages = getAllLanguageTags();
  const { addToast } = useToast();
  const [requestTranslation, { isLoading }] =
    usePostVideosByVidTranslationMutation();

  const {
    data: preferences,
    isLoading: isLoadingPrefs,
    isFetching: isFetchingPrefs,
    isError: isErrorPrefs,
  } = useGetUsersMePreferencesQuery();

  const languagePreference = preferences?.items?.find(
    (preference) => preference?.name === 'translations_language'
  );

  const preferredLanguage = languages.find(
    (lang) => lang === languagePreference?.value
  );

  const { data: video } = useGetVideosByVidQuery({
    vid: videoId || '',
  });

  const videoLanguage = video?.language ?? '';

  return (
    <Menu hasArrow zIndex={appTheme.levels.front}>
      <div style={{ padding: appTheme.space.xs }}>
        {activeItem === 'menu' && (
          <>
            {preferredLanguage && preferredLanguage !== videoLanguage && (
              <MenuButton
                disabled={
                  isLoadingPrefs || isFetchingPrefs || isErrorPrefs || isLoading
                }
                onClick={() => {
                  requestTranslation({
                    vid: videoId || '',
                    body: {
                      language: preferredLanguage,
                    },
                  })
                    .unwrap()
                    .then(() => {
                      setActiveItem(null);

                      setLanguage(preferredLanguage);

                      addToast(
                        ({ close }) => (
                          <Notification
                            onClose={close}
                            type="success"
                            message={t(
                              '__TOOLS_TRANSLATE_TOAST_SUCCESS_MESSAGE'
                            )}
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
                }}
              >
                <Button.StartIcon style={{ marginRight: appTheme.space.md }}>
                  <TranslateIcon />
                </Button.StartIcon>
                <ButtonLabels
                  title={
                    isLoading ? (
                      t('__TOOLS_TRANSLATE_BUTTON_SEND_LOADING')
                    ) : (
                      <Trans i18nKey="__TOOLS_MENU_ITEM_TRANSLATE_PREFERENCE_TITLE">
                        Translate in{' '}
                        <Span style={{ textTransform: 'lowercase' }}>
                          {{
                            language: preferredLanguage,
                          }}
                        </Span>
                      </Trans>
                    )
                  }
                />
                {isLoading && (
                  <Button.EndIcon>
                    <Spinner
                      size={appTheme.space.md}
                      color={appTheme.palette.grey[400]}
                      style={{ marginLeft: appTheme.space.sm }}
                    />
                  </Button.EndIcon>
                )}
              </MenuButton>
            )}
            <MenuButton onClick={() => setActiveItem('translate')}>
              <Button.StartIcon style={{ marginRight: appTheme.space.md }}>
                <TranslateIcon />
              </Button.StartIcon>
              <ButtonLabels
                title={t('__TOOLS_MENU_ITEM_TRANSLATE_TITLE')}
                // {...(!hasAIFeatureFlag && {
                //   subtitle: t('__TOOLS_MENU_ITEM_TRANSLATE_SUBTITLE'),
                // })}
              />
              <Button.EndIcon style={{ marginLeft: 'auto' }}>
                <ArrowRight />
              </Button.EndIcon>
            </MenuButton>
          </>
        )}
        {activeItem === 'sentiment' && <ToolsSentimentFlag />}
        {activeItem === 'autotag' && <ToolsAutotagFlag />}
        {activeItem === 'translate' && hasAIFeatureFlag ? (
          <ToolsTranslate />
        ) : (
          <ToolsTranslateFlag />
        )}
      </div>
    </Menu>
  );
};
