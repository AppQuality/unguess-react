import { Button, Dropdown, Trigger } from '@appquality/unguess-design-system';
import { ReactComponent as AIMenuIcon } from 'src/assets/icons/ai-icon.svg';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { ToolsMenu } from './ToolsMenu';
import { useToolsContext } from './context/ToolsContext';
import { ModalSentiment, ModalAutotag, ModalTranslate } from './modals';

export const Tools = () => {
  const { t } = useTranslation();
  const { activeItem, setActiveItem } = useToolsContext();

  return (
    <>
      <Dropdown>
        <Trigger>
          <Button
            isBasic
            size="large"
            style={{ marginLeft: appTheme.space.md }}
            onClick={() => setActiveItem('menu')}
          >
            <Button.StartIcon>
              <AIMenuIcon />
            </Button.StartIcon>
            {t('__TOOLS_MENU_ITEM_BUTTON_LABEL')}
          </Button>
        </Trigger>
        <ToolsMenu />
      </Dropdown>
      {activeItem === 'sentiment' && <ModalSentiment />}
      {activeItem === 'autotag' && <ModalAutotag />}
      {activeItem === 'translate' && <ModalTranslate />}
    </>
  );
};
