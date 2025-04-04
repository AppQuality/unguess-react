import { useModuleTouchpoints } from '../../hooks';
import { TouchpointItemNav } from './TouchpointItemNav';

const TouchpointsListNav = () => {
  const { value } = useModuleTouchpoints();

  return (
    <div data-qa="touchpoints-module-nav">
      {value.map((touchpoint) => (
        <TouchpointItemNav key={touchpoint.key} touchpoint={touchpoint} />
      ))}
    </div>
  );
};

export { TouchpointsListNav };
