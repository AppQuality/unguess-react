import { TooltipModal } from '@appquality/unguess-design-system';
import { AiMenu } from './ToolsMenu';
import { TranslationSettings } from './ToolsMenuTranslations';
import { useToolsContext } from './context/toolsContext';

const getItemBySlug = (slug: string) => {
  switch (slug) {
    case 'menu':
      return <AiMenu />;
    case 'translations':
      return <TranslationSettings />;
    default:
      return <AiMenu />;
  }
};

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
      {getItemBySlug(activeItem as string)}
    </TooltipModal>
  );
};
