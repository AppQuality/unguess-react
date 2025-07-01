import { getColor } from '@appquality/unguess-design-system';
import { ReactComponent as BankIcon } from '@zendeskgarden/svg-icons/src/16/credit-card-stroke.svg';
import { ReactComponent as LocationIcon } from '@zendeskgarden/svg-icons/src/16/location-fill.svg';
import { ReactComponent as PhoneIcon } from '@zendeskgarden/svg-icons/src/16/phone-fill.svg';
import { ReactComponent as PlugIcon } from '@zendeskgarden/svg-icons/src/16/plug-fill.svg';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { ReactComponent as GasIcon } from 'src/assets/icons/gas_module_icon.svg';
import { ReactComponent as HomeInternetIcon } from 'src/assets/icons/home-internet.svg';
import { ReactComponent as LiteracyIcon } from 'src/assets/icons/literacy-icon.svg';
import { ReactComponent as TouchpointsIcon } from 'src/assets/icons/touchpoints-icon.svg';
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
    case 'literacy':
      return <LiteracyIcon color={color} />;
    case 'touchpoints':
      return <TouchpointsIcon color={color} />;
    case 'locality':
      return <LocationIcon color={color} />;
    case 'bank':
      return <BankIcon color={color} />;
    case 'elettricity_supply':
      return <PlugIcon color={color} />;
    case 'mobile_internet':
      return <PhoneIcon color={color} />;
    case 'home_internet':
      return <HomeInternetIcon color={color} />;
    case 'gas_supply':
      return <GasIcon color={color} />;
    case 'title':
    case 'dates':
    default:
      return icon || null;
  }
};

const getIconFromModule = (module: components['schemas']['Module']) => {
  const { type } = module;

  return getIconFromModuleType(type);
};

export { getIconFromModule, getIconFromModuleType };
