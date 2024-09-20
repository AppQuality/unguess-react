import {
  Button,
  Dropdown,
  Item,
  SM,
  Select,
  Separator,
  Span,
  Menu,
  Label,
  Toggle,
  LG,
  Spinner,
  useToast,
  Notification,
  Skeleton,
} from '@appquality/unguess-design-system';
import { Field as ZendeskDropdownField } from '@zendeskgarden/react-dropdowns';
import { Field as ZendeskFormField } from '@zendeskgarden/react-forms';
import { ReactComponent as ArrowLeft } from 'src/assets/icons/chevron-left-icon.svg';
import { ReactComponent as TranslateIcon } from '@zendeskgarden/svg-icons/src/16/translation-exists-stroke.svg';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useState } from 'react';
import {
  useGetUsersMePreferencesQuery,
  useGetVideosByVidQuery,
  usePostVideosByVidTranslationMutation,
  usePutUsersMePreferencesByPrefidMutation,
} from 'src/features/api';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { MenuButton } from './MenuButton';
import { useToolsContext } from './context/ToolsContext';
import { getLanguages } from './languages';

const Body = styled.div`
  padding: ${({ theme }) => theme.space.md};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.md};
`;

const ToolsTranslate = () => {
  const { videoId } = useParams();
  const { t } = useTranslation();
  const [internalLanguage, setInternalLanguage] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const { activeItem, setActiveItem, setLanguage } = useToolsContext();
  const [isLangChecked, setIsLangChecked] = useState(true);
  const { addToast } = useToast();
  const [requestTranslation, { isLoading }] =
    usePostVideosByVidTranslationMutation();
  const [updatePreference] = usePutUsersMePreferencesByPrefidMutation();
  const allowedLanguages = getLanguages();

  const {
    data: video,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useGetVideosByVidQuery({
    vid: videoId || '',
  });

  const videoLanguage = video?.language ?? '';

  // Remove videoLanguage from allowedLanguages
  const filteredLanguages = allowedLanguages.filter(
    ({ value }) => value !== videoLanguage
  );

  const {
    data: preferences,
    isLoading: isLoadingPrefs,
    isFetching: isFetchingPrefs,
    isError: isErrorPrefs,
  } = useGetUsersMePreferencesQuery();

  const languagePreference = preferences?.items?.find(
    (preference) => preference?.name === 'translations_language'
  );

  if (activeItem !== 'translate') return null;

  return (
    <>
      <MenuButton onClick={() => setActiveItem('menu')}>
        <Button.StartIcon>
          <ArrowLeft />
        </Button.StartIcon>
        <Span isBold>{t('__TOOLS_TRANSLATE_PREVIOUS_ITEM')}</Span>
      </MenuButton>
      <Separator />
      <Body>
        <LG
          isBold
          style={{
            color: appTheme.palette.grey[800],
            marginBottom: appTheme.space.md,
          }}
        >
          {t('__TOOLS_TRANSLATE_TITLE')}
        </LG>
        <SM style={{ marginBottom: appTheme.space.sm }}>
          {t('__TOOLS_TRANSLATE_DESCRIPTION')}
        </SM>
        <Label style={{ marginBottom: appTheme.space.xxs }}>
          {t('__TOOLS_TRANSLATE_LANGUAGE_DROPDOWN_LABEL')}
        </Label>
        <div style={{ marginBottom: appTheme.space.sm }}>
          {isLoadingVideo ||
          isFetchingVideo ||
          isErrorVideo ||
          isLoadingPrefs ||
          isFetchingPrefs ||
          isErrorPrefs ? (
            <Skeleton height="40px" style={{ borderRadius: '4px' }} />
          ) : (
            <Dropdown
              selectedItem={internalLanguage?.value}
              onSelect={(item: string) => {
                if (item) {
                  const lang = filteredLanguages.find(
                    ({ value }) => value === item
                  );
                  if (lang) {
                    setInternalLanguage(lang);
                  }
                }
              }}
            >
              <ZendeskDropdownField>
                <Select start={<TranslateIcon />}>
                  {internalLanguage ? (
                    internalLanguage.label
                  ) : (
                    <Span style={{ opacity: 0.5 }}>
                      {t('__TOOLS_TRANSLATE_LANGUAGE_DROPDOWN_PLACEHOLDER')}
                    </Span>
                  )}
                </Select>
              </ZendeskDropdownField>
              <Menu>
                {filteredLanguages.map(({ value, label }) => (
                  <Item key={`language-${value}-option`} value={value}>
                    {label}
                  </Item>
                ))}
              </Menu>
            </Dropdown>
          )}
        </div>
        <ZendeskFormField>
          <Toggle
            checked={isLangChecked}
            onChange={() => setIsLangChecked(!isLangChecked)}
          >
            <Label>{t('__TOOLS_TRANSLATE_TOGGLE_TEXT')}</Label>
          </Toggle>
        </ZendeskFormField>
        <ButtonsWrapper>
          <Button isBasic onClick={() => setActiveItem(null)}>
            {t('__TOOLS_TRANSLATE_BUTTON_CANCEL')}
          </Button>
          <Button
            isPrimary
            isAccent
            disabled={!internalLanguage || isLoading}
            onClick={() => {
              if (!videoId) return;
              if (!internalLanguage) return;

              setLanguage(internalLanguage);

              if (isLangChecked)
                updatePreference({
                  prefid: languagePreference?.preference_id.toString() || '',
                  body: {
                    value: internalLanguage.value,
                  },
                })
                  .unwrap()
                  .then(() => {
                    addToast(
                      ({ close }) => (
                        <Notification
                          onClose={close}
                          type="success"
                          message={t(
                            '__TOOLS_TRANSLATE_TOAST_LANGUAGE_SUCCESS_MESSAGE'
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
                          message={t(
                            '__TOOLS_TRANSLATE_TOAST_LANGUAGE_ERROR_MESSAGE'
                          )}
                          closeText={t('__TOAST_CLOSE_TEXT')}
                          isPrimary
                        />
                      ),
                      { placement: 'top' }
                    );
                  });

              requestTranslation({
                vid: videoId || '',
                body: {
                  language: internalLanguage.value,
                },
              })
                .unwrap()
                .then(() => {
                  setActiveItem(null);

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
            }}
          >
            {isLoading
              ? t('__TOOLS_TRANSLATE_BUTTON_SEND_LOADING')
              : t('__TOOLS_TRANSLATE_BUTTON_SEND')}
            {isLoading && (
              <Button.EndIcon>
                <Spinner
                  size={appTheme.space.md}
                  color={appTheme.palette.grey[400]}
                  style={{ marginLeft: appTheme.space.sm }}
                />
              </Button.EndIcon>
            )}
          </Button>
        </ButtonsWrapper>
      </Body>
    </>
  );
};

export { ToolsTranslate };
