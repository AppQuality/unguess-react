import { Button, TooltipModal } from '@appquality/unguess-design-system';
import { usePostVideosByVidTranslationMutation } from 'src/features/api';
import { useCallback } from 'react';
import { useToolsContext } from './context/toolsContext';

export const TranslationSettings = () => {
  const { mediaId, setReferenceElement } = useToolsContext();
  const [postVideosByVidTranslation] = usePostVideosByVidTranslationMutation();

  const handleTranslation = useCallback(() => {
    postVideosByVidTranslation({
      vid: mediaId,
      body: {
        language: 'en',
      },
    })
      .unwrap()
      .then((res) => console.log(res.sentences));

    setReferenceElement(null);
  }, []);

  return (
    <>
      <TooltipModal.Title>
        Tooltip TranslationSettings of Media {mediaId}
      </TooltipModal.Title>
      <TooltipModal.Body>
        Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot
        courgette tatsoi pea sprouts fava bean collard greens dandelion okra
        wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.
        <Button onClick={handleTranslation}>Traduci in english</Button>
      </TooltipModal.Body>
      <TooltipModal.Close aria-label="Close" />
    </>
  );
};
