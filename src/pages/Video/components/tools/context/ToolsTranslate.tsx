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
} from '@appquality/unguess-design-system';
import { Field as ZendeskDropdownField } from '@zendeskgarden/react-dropdowns';
import { Field as ZendeskFormField } from '@zendeskgarden/react-forms';
import { ReactComponent as ArrowLeft } from 'src/assets/icons/chevron-left-icon.svg';
import { ReactComponent as TranslateIcon } from '@zendeskgarden/svg-icons/src/16/translation-exists-stroke.svg';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useEffect, useState } from 'react';
import { usePostVideosByVidTranslationMutation } from 'src/features/api';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { MenuButton } from '../MenuButton';
import { useToolsContext } from './ToolsContext';

interface Lang {
  value: string;
  label: string;
}

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
  const { activeItem, setActiveItem } = useToolsContext();
  const [language, setLanguage] = useState<Lang>();
  const allowedLanguages: Lang[] = [
    { value: 'en', label: t('__TOOLS_TRANSLATE_LANGUAGE_EN_LABEL') },
    { value: 'it', label: t('__TOOLS_TRANSLATE_LANGUAGE_IT_LABEL') },
    { value: 'es', label: t('__TOOLS_TRANSLATE_LANGUAGE_ES_LABEL') },
    { value: 'fr', label: t('__TOOLS_TRANSLATE_LANGUAGE_FR_LABEL') },
    { value: 'de', label: t('__TOOLS_TRANSLATE_LANGUAGE_DE_LABEL') },
  ];
  const [requestTranslation, { isLoading, isError, isSuccess }] =
    usePostVideosByVidTranslationMutation();

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
          <Dropdown
            selectedItem={language?.value}
            onSelect={(item: string) => {
              if (item) {
                const lang = allowedLanguages.find(
                  ({ value }) => value === item
                );
                if (lang) {
                  setLanguage(lang);
                }
              }
            }}
          >
            <ZendeskDropdownField>
              <Select start={<TranslateIcon />}>
                {language ? (
                  language.label
                ) : (
                  <Span style={{ opacity: 0.5 }}>
                    {t('__TOOLS_TRANSLATE_LANGUAGE_DROPDOWN_PLACEHOLDER')}
                  </Span>
                )}
              </Select>
            </ZendeskDropdownField>
            <Menu>
              {allowedLanguages.map(({ value, label }) => (
                <Item key={`language-${value}-option`} value={value}>
                  {label}
                </Item>
              ))}
            </Menu>
          </Dropdown>
        </div>
        <ZendeskFormField>
          <Toggle defaultChecked>
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
            disabled={!language || isLoading}
            onClick={async () => {
              if (!videoId) return;
              if (!language) return;

              await requestTranslation({
                vid: videoId || '',
                body: {
                  language: language.value,
                },
              });

              setActiveItem(null);
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
