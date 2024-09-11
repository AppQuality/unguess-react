import {
  Button,
  Dropdown,
  Item,
  Menu,
  Trigger,
  Label,
} from '@appquality/unguess-design-system';
import { useRef } from 'react';

import { ReactComponent as AIMenuIcon } from 'src/assets/icons/ai-icon.svg';

import { useToolsContext } from './context/toolsContext';
import { MenuItems } from './MenuItems';

export const Tools = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { setReferenceElement, showMenuPanel, setShowMenuPanel } =
    useToolsContext();

  return (
    <Dropdown>
      <Trigger>
        <Button
          isBasic
          size="large"
          ref={buttonRef}
          onClick={() => {
            setReferenceElement(buttonRef.current);
            setShowMenuPanel(!showMenuPanel);
          }}
        >
          <AIMenuIcon />
          <Label style={{ marginLeft: '0.5rem' }} isRegular>
            Generate AI
          </Label>
        </Button>
      </Trigger>
      <Menu hasArrow>
        <MenuItems />
      </Menu>
    </Dropdown>
  );
};
