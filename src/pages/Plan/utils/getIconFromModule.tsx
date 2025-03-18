import { getColor } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { ReactComponent as FunctionalTaskIcon } from 'src/assets/icons/functional-task-icon.svg';
import { components } from 'src/common/schema';

const getIconColor = (module: components['schemas']['Module']) => {
  const { type } = module;

  // TODO: implement error handling

  return getColor(appTheme.colors.primaryHue, 600);
};

const getIconFromModuleType = (
  type: components['schemas']['Module']['type']
) => {
  switch (type) {
    case 'dates':
    case 'age':
    case 'gender':
    case 'goal':
    case 'language':
    case 'literacy':
    case 'out_of_scope':
    case 'target':
    case 'tasks':
    case 'title':
      return <FunctionalTaskIcon />;
    default:
      return null;
  }
};

const getIconFromModule = (module: components['schemas']['Module']) => {
  const { type } = module;
  const color = getIconColor(module);

  return <div style={{ color }}>{getIconFromModuleType(type)}</div>;
};

export { getIconFromModule };
