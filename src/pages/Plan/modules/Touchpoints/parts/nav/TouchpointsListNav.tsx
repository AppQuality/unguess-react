import { appTheme } from 'src/app/theme';
import { useModuleTouchpoints } from '../../hooks';
import { TouchpointItemNav } from './TouchpointItemNav';

const TouchpointsListNav = () => {
  const { value } = useModuleTouchpoints();

  return (
    <div
      data-qa="touchpoints-module-nav"
      style={{ marginBottom: appTheme.space.md }}
    >
      {value.map((touchpoint) => (
        <TouchpointItemNav key={touchpoint.key} touchpoint={touchpoint} />
      ))}
    </div>
  );
};

export { TouchpointsListNav };
