import { TooltipModal } from '@appquality/unguess-design-system';
import { useToolsContext } from './context/toolsContext';

export const TranslationSettings = () => {
  const { mediaId } = useToolsContext();
  return (
    <>
      <TooltipModal.Title>
        Tooltip TranslationSettings of Media {mediaId}
      </TooltipModal.Title>
      <TooltipModal.Body>
        Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot
        courgette tatsoi pea sprouts fava bean collard greens dandelion okra
        wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.
      </TooltipModal.Body>
      <TooltipModal.Close aria-label="Close" />
    </>
  );
};
