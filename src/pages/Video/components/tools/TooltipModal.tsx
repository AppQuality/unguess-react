import { TooltipModal } from '@appquality/unguess-design-system';
import { Menu } from './Menu';
import { TranslationSettings } from './MenuItemTranslations';
import { useToolsContext } from './context/toolsContext';

const getItemBySlug = (slug: string) => {
  switch (slug) {
    case 'menu':
      return <Menu />;
    case 'translations':
      return <TranslationSettings />;
    default:
      return <Menu />;
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
