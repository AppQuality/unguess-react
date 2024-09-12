import {
  Button,
  Dropdown,
  Item,
  MD,
  SM,
  Select,
  Separator,
  Span,
  Menu,
  Label,
  Toggle,
} from '@appquality/unguess-design-system';
import { Field as ZendeskDropdownField } from '@zendeskgarden/react-dropdowns';
import { Field as ZendeskFormField } from '@zendeskgarden/react-forms';
import { ReactComponent as ArrowLeft } from 'src/assets/icons/chevron-left-icon.svg';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useState } from 'react';
import { MenuButton } from '../MenuButton';
import { useToolsContext } from './ToolsContext';

const ToolsTranslate = () => {
  const { t } = useTranslation();
  const { activeItem, setActiveItem } = useToolsContext();
  const [language, setLanguage] = useState<string>('');
  const allowedLanguages = ['en', 'it', 'es', 'fr', 'de'];

  if (activeItem !== 'translate') return null;

  return (
    <>
      <MenuButton onClick={() => setActiveItem('menu')}>
        <Button.StartIcon>
          <ArrowLeft />
        </Button.StartIcon>
        <Span isBold>{t('__TOOLS_TRANSLATE_PREVIOUS_ITEM')}</Span>
      </MenuButton>
      <Separator style={{ marginBottom: appTheme.space.md }} />
      <MD isBold>{t('__TOOLS_TRANSLATE_TITLE')}</MD>
      <SM>{t('__TOOLS_TRANSLATE_DESCRIPTION')}</SM>
      <Dropdown
        selectedItem={language}
        onSelect={(item: string) => {
          setLanguage(item);
        }}
      >
        <ZendeskDropdownField>
          <Select isCompact>
            {language && <Item value={language}>{language}</Item>}
          </Select>
        </ZendeskDropdownField>
        <Menu>
          {allowedLanguages.map((lang) => (
            <Item key={lang} value={lang}>
              {lang}
            </Item>
          ))}
        </Menu>
      </Dropdown>
      <ZendeskFormField>
        <Toggle checked>
          <Label isRegular style={{ color: appTheme.palette.grey[700] }}>
            <MD>{t('__TOOLS_TRANSLATE_TOGGLE_TEXT')}</MD>
          </Label>
        </Toggle>
      </ZendeskFormField>
      <Button isPrimary isAccent>
        {t('__TOOLS_TRANSLATE_BUTTON_SEND')}
      </Button>
    </>
  );
};

export { ToolsTranslate };
