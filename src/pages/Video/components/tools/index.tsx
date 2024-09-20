import { Button, Dropdown, Trigger } from '@appquality/unguess-design-system';
import { ReactComponent as AIMenuIcon } from 'src/assets/icons/ai-icon.svg';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { ToolsMenu } from './ToolsMenu';
import { useToolsContext } from './context/ToolsContext';

export const Tools = () => {
  const { t } = useTranslation();
  const { activeItem, setActiveItem } = useToolsContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!activeItem) setIsOpen(false);
  }, [activeItem]);

  return (
    <Dropdown isOpen={isOpen} onStateChange={() => setIsOpen(!isOpen)}>
      <Trigger>
        <Button
          isBasic
          size="large"
          onClick={() => setActiveItem('menu')}
          style={{ marginLeft: appTheme.space.md }}
        >
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
