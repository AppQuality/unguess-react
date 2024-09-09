import { Button } from '@appquality/unguess-design-system';
import { usePostVideosByVidTranslationMutation } from 'src/features/api';
import { useToolsContext } from './context/toolsContext';

export const AiMenu = () => {
  const { setActiveItem, mediaId } = useToolsContext();
  const [postVideosByVidTranslation] = usePostVideosByVidTranslationMutation();

  const translation = () => {
    postVideosByVidTranslation({
      pathVid: mediaId,
      _pathVid: mediaId,
      body: {
        language: 'fr',
      },
    })
      .unwrap()
      .then(() => setActiveItem('list'));
  };
  return (
    <>
      <Button
        isPill={false}
        isStretched
        onClick={() => setActiveItem('translations')}
      >
        Translate me
      </Button>
      <Button isPill={false} isStretched onClick={() => setActiveItem('other')}>
        Other magic item action here (not implemented)
      </Button>
    </>
  );
};
