import { Button } from '@appquality/unguess-design-system';
import { useToolsContext } from './context/toolsContext';

export const AiMenu = () => {
  const { setActiveItem } = useToolsContext();
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
