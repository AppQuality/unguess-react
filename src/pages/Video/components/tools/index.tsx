import { Button, Dropdown, Trigger } from '@appquality/unguess-design-system';
import { ReactComponent as AIMenuIcon } from 'src/assets/icons/ai-icon.svg';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { ToolsMenu } from './ToolsMenu';

export const Tools = () => {
  const { t } = useTranslation();

  return (
    <Dropdown>
      <Trigger>
        <Button isBasic size="large" style={{ marginLeft: appTheme.space.md }}>
          <Button.StartIcon>
            <AIMenuIcon />
          </Button.StartIcon>
          {t('__TOOLS_MENU_ITEM_BUTTON_LABEL')}
        </Button>
      </Trigger>
      <ToolsMenu />
    </Dropdown>
  );
};
