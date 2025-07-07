import { ModuleTouchpointsContextProvider } from './context';
import { TouchpointsList } from './parts';

const TouchPoints = () => (
  <ModuleTouchpointsContextProvider>
    <TouchpointsList />
  </ModuleTouchpointsContextProvider>
);

export default TouchPoints;
