import { IconButton } from '@appquality/unguess-design-system';
import { useRef } from 'react';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link-stroke.svg';
import { useToolsContext } from './context/toolsContext';
import { ToolsTooltipModal } from './TooltipModal';

export const Tools = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { setReferenceElement } = useToolsContext();

  return (
    <>
      <IconButton
        ref={buttonRef}
        onClick={() => {
          setReferenceElement(buttonRef.current);
        }}
      >
        <LinkIcon />
      </IconButton>
      <ToolsTooltipModal />
    </>
  );
};
