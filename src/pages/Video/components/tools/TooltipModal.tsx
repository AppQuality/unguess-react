import { TooltipModal } from '@appquality/unguess-design-system';
import { ToolsMenu } from './ToolsMenu';
import { useToolsContext } from './context/toolsContext';

export const ToolsTooltipModal = () => {
  const { referenceElement, setReferenceElement, activeItem, setActiveItem } =
    useToolsContext();

  return (
    <TooltipModal
      referenceElement={referenceElement}
      onClose={() => {
        setReferenceElement(null);
        setActiveItem('menu');
      }}
      hasArrow={false}
      placement="bottom"
    >
      <ToolsMenu />
    </TooltipModal>
  );
};
