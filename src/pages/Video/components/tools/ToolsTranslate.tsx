import {
  getAllLanguageTags,
  getLanguageNameByFullTag,
} from '@appquality/languages';
import {
  Button,
  Dropdown,
  Item,
  Label,
  MD,
  Menu,
  Modal,
  ModalClose,
  Notification,
  Select,
  Span,
  Spinner,
  Toggle,
  useToast,
} from '@appquality/unguess-design-system';
import { Field as ZendeskDropdownField } from '@zendeskgarden/react-dropdowns';
import { Field as ZendeskFormField } from '@zendeskgarden/react-forms';
import { ReactComponent as TranslateIcon } from '@zendeskgarden/svg-icons/src/16/translation-exists-stroke.svg';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import {
  useGetUsersMePreferencesQuery,
  useGetVideosByVidQuery,
  usePostVideosByVidTranslationMutation,
  usePutUsersMePreferencesByPrefidMutation,
} from 'src/features/api';
import { useToolsContext } from './context/ToolsContext';

const ToolsTranslate = ({ currentLanguage }: { currentLanguage?: string }) => {
  const { videoId } = useParams();
  const { t } = useTranslation();
  const [internalLanguage, setInternalLanguage] = useState<string>('');
  const { setLanguage, setIsOpen } = useToolsContext();
  const [isLangChecked, setIsLangChecked] = useState(false);
  const { addToast } = useToast();
  const [requestTranslation, { isLoading }] =
    usePostVideosByVidTranslationMutation();
  const [updatePreference] = usePutUsersMePreferencesByPrefidMutation();
  const allowedLanguages = getAllLanguageTags();

  const {
    data: video,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useGetVideosByVidQuery({
    vid: videoId || '',
  });

  const videoLanguage = video?.language ?? '';

  const {
    data: preferences,
    isLoading: isLoadingPrefs,
    isFetching: isFetchingPrefs,
    isError: isErrorPrefs,
  } = useGetUsersMePreferencesQuery();

  const languagePreference = preferences?.items?.find(
    (preference) => preference?.name === 'translations_language'
  );

  // Remove videoLanguage and current translation language from allowedLanguages
  const filteredLanguages = allowedLanguages.filter(
    (lang) => lang !== videoLanguage && lang !== currentLanguage
  );

  useEffect(() => {
    if (languagePreference?.value) {
      setInternalLanguage(languagePreference.value);
    }
  }, [languagePreference]);

  if (
    isLoadingPrefs ||
    isLoadingVideo ||
    isFetchingPrefs ||
    isFetchingVideo ||
    isErrorPrefs ||
    isErrorVideo
  ) {
    return null;
  }

  return (
    <Modal onClose={() => setIsOpen(false)}>
      <ModalClose onClick={() => setIsOpen(false)} />
      <Modal.Header>
        <MD isBold>{t('__TOOLS_TRANSLATE_TITLE')}</MD>
      </Modal.Header>
      <Modal.Body>
        <MD style={{ marginBottom: appTheme.space.sm }}>
          {t('__TOOLS_TRANSLATE_DESCRIPTION')}
        </MD>
        <Label>{t('__TOOLS_TRANSLATE_LANGUAGE_DROPDOWN_LABEL')}</Label>
        <div style={{ margin: `${appTheme.space.xs} 0` }}>
          <Dropdown
            selectedItem={internalLanguage}
            onSelect={(item: string) => {
              if (item) {
                const l = filteredLanguages.find((lang) => lang === item);
                if (l) {
                  setInternalLanguage(l);
                }
              }
            }}
          >
            <ZendeskDropdownField>
              <Select start={<TranslateIcon />}>
                {internalLanguage ? (
                  <Span>{getLanguageNameByFullTag(internalLanguage)}</Span>
                ) : (
                  <Span style={{ opacity: 0.5 }}>
                    {t('__TOOLS_TRANSLATE_LANGUAGE_DROPDOWN_PLACEHOLDER')}
                  </Span>
                )}
              </Select>
            </ZendeskDropdownField>
            <Menu style={{ maxHeight: 250 }}>
              {filteredLanguages.map((lang) => (
                <Item key={`language-${lang}-option`} value={lang}>
                  {getLanguageNameByFullTag(lang)}
                </Item>
              ))}
            </Menu>
          </Dropdown>
        </div>
        <ZendeskFormField>
          <Toggle
            checked={isLangChecked}
            onChange={() => setIsLangChecked(!isLangChecked)}
          >
            <Label>{t('__TOOLS_TRANSLATE_TOGGLE_TEXT')}</Label>
          </Toggle>
        </ZendeskFormField>
      </Modal.Body>
      <Modal.Footer>
        <Button isBasic onClick={() => setIsOpen(false)}>
          {t('__TOOLS_TRANSLATE_BUTTON_CANCEL')}
        </Button>
        <Button
          isPrimary
          isAccent
          disabled={!internalLanguage || isLoading}
          onClick={() => {
            if (!videoId) return;
            if (!internalLanguage) return;

            if (isLangChecked)
              updatePreference({
                prefid: languagePreference?.preference_id.toString() || '',
                body: {
                  value: internalLanguage,
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
                language: internalLanguage,
              },
            })
              .unwrap()
              .then(() => {
                setIsOpen(false);

                setLanguage(internalLanguage);

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
          style={{ marginLeft: appTheme.space.md }}
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
      </Modal.Footer>
    </Modal>
  );
};

export { ToolsTranslate };
