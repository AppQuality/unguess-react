import { ModuleTouchpointsContextProvider } from './context';
import { TouchpointsList } from './parts';

const TouchPoints = () => (
  <ModuleTouchpointsContextProvider>
    <TouchpointsList />
  </ModuleTouchpointsContextProvider>
);

export { TouchPoints };
