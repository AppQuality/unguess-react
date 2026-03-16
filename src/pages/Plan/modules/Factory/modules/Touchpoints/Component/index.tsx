import { useModule } from 'src/features/modules/useModule';
import { ModuleTouchpointsContextProvider } from './context';
import { TouchpointsList } from './parts';

const TouchPoints = () => {
  const { value } = useModule('touchpoints');

  if (value?.variant === 'hidden') {
    return null;
  }

  return (
    <ModuleTouchpointsContextProvider>
      <TouchpointsList />
    </ModuleTouchpointsContextProvider>
  );
};

export default TouchPoints;
