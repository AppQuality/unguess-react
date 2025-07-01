import { getColor } from '@appquality/unguess-design-system';
import { ReactComponent as PlugIcon } from '@zendeskgarden/svg-icons/src/16/plug-fill.svg';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { components } from 'src/common/schema';
import { getModuleBySlug } from '../modules/Factory';

const getIconColor = (module_type: components['schemas']['Module']['type']) => {
  const value = useAppSelector(
    (state) => state.planModules.records[`${module_type}`]?.output
  );
  const errorInThisModule = useAppSelector(
    (state) =>
      Object.fromEntries(
        Object.entries(state.planModules.errors).filter(([key]) => {
          if (key.startsWith(`${module_type}.`) || key === module_type) {
            return true;
          }
          return false;
        })
      ) || {},
    shallowEqual
  );

  const hasErrors =
    errorInThisModule && Object.keys(errorInThisModule).length > 0;

  const hasValues = !!value;

  if (hasErrors) return getColor(appTheme.palette.red[900]);
  if (!hasErrors && !hasValues) return getColor(appTheme.palette.grey, 600);

  return getColor(appTheme.colors.primaryHue, 600);
};

const getIconFromModuleType = (
  type: components['schemas']['Module']['type'],
  withValidation: boolean = true
) => {
  let icon;
  try {
    icon = getModuleBySlug(type)?.useIcon?.();
  } catch (error) {
    console.error(`Error getting icon for module type "${type}":`, error);
  }
  const color = withValidation
    ? getIconColor(type)
    : getColor(appTheme.colors.primaryHue, 600);

  switch (type) {
    case 'elettricity_supply':
      return <PlugIcon color={color} />;

    default:
      return icon || null;
  }
};

const getIconFromModule = (module: components['schemas']['Module']) => {
  const { type } = module;

  return getIconFromModuleType(type);
};

export { getIconFromModule, getIconFromModuleType };
