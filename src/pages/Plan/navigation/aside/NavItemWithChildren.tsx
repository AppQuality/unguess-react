import { appTheme } from 'src/app/theme';
import { components } from 'src/common/schema';
import { modulesChildrenMap } from './const';

const NavItemWithChildren = ({
  module,
}: {
  module: components['schemas']['Module'];
}) => {
  const { type } = module;

  if (modulesChildrenMap[`${type}`]) {
    return (
      <div style={{ marginTop: appTheme.space.sm }}>
        {modulesChildrenMap[`${type}`]}
      </div>
    );
  }

  return null;
};

export { NavItemWithChildren };
