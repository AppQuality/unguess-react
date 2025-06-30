import { getColor } from '@appquality/unguess-design-system';
import { ReactComponent as BrowserIcon } from '@zendeskgarden/svg-icons/src/16/globe-fill.svg';
import { ReactComponent as LocationIcon } from '@zendeskgarden/svg-icons/src/16/location-fill.svg';
import { ReactComponent as PlugIcon } from '@zendeskgarden/svg-icons/src/16/plug-fill.svg';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AdditionalTargetIcon } from 'src/assets/icons/additional-target-icon.svg';
import { ReactComponent as ArrowTrending } from 'src/assets/icons/arrow-trending.svg';
import { ReactComponent as AgeIcon } from 'src/assets/icons/cake-icon-fill.svg';
import { ReactComponent as GoalIcon } from 'src/assets/icons/flag-fill.svg';
import { ReactComponent as GenderIcon } from 'src/assets/icons/gender-icon.svg';
import { ReactComponent as LanguageIcon } from 'src/assets/icons/languages.svg';
import { ReactComponent as LiteracyIcon } from 'src/assets/icons/literacy-icon.svg';
import { ReactComponent as NotificationIcon } from 'src/assets/icons/notification.svg';
import { ReactComponent as TasksIcon } from 'src/assets/icons/tasks-icon.svg';
import { ReactComponent as TouchpointsIcon } from 'src/assets/icons/touchpoints-icon.svg';
import { ReactComponent as TargetIcon } from 'src/assets/icons/user-follow.svg';
import { ReactComponent as EmploymentIcon } from 'src/assets/icons/work.svg';
import { ReactComponent as OutOfScopeIcon } from 'src/assets/icons/x-circle.svg';
import { ReactComponent as BankIcon } from '@zendeskgarden/svg-icons/src/16/credit-card-stroke.svg';
import { ReactComponent as PhoneIcon } from '@zendeskgarden/svg-icons/src/16/phone-fill.svg';
import { ReactComponent as HomeInternetIcon } from 'src/assets/icons/home-internet.svg';
import { components } from 'src/common/schema';

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
  const color = withValidation
    ? getIconColor(type)
    : getColor(appTheme.colors.primaryHue, 600);

  switch (type) {
    case 'age':
      return <AgeIcon color={color} />;
    case 'gender':
      return <GenderIcon color={color} />;
    case 'goal':
      return <GoalIcon color={color} />;
    case 'language':
      return <LanguageIcon color={color} />;
    case 'literacy':
      return <LiteracyIcon color={color} />;
    case 'out_of_scope':
      return <OutOfScopeIcon color={color} />;
    case 'target':
      return <TargetIcon color={color} />;
    case 'tasks':
      return <TasksIcon color={color} />;
    case 'browser':
      return <BrowserIcon color={color} />;
    case 'setup_note':
      return <NotificationIcon color={color} />;
    case 'instruction_note':
      return <NotificationIcon color={color} />;
    case 'target_note':
      return <NotificationIcon color={color} />;
    case 'touchpoints':
      return <TouchpointsIcon color={color} />;
    case 'additional_target':
      return <AdditionalTargetIcon color={color} />;
    case 'employment':
      return <EmploymentIcon color={color} />;
    case 'locality':
      return <LocationIcon color={color} />;
    case 'annual_income_range':
      return <ArrowTrending color={color} />;
    case 'bank':
      return <BankIcon color={color} />;
    case 'elettricity_supply':
      return <PlugIcon color={color} />;
    case 'mobile_internet':
      return <PhoneIcon color={color} />;
    case 'home_internet':
      return <HomeInternetIcon color={color} />;
    case 'title':
    case 'dates':
    default:
      return null;
  }
};

const getIconFromModule = (module: components['schemas']['Module']) => {
  const { type } = module;

  return getIconFromModuleType(type);
};

export { getIconFromModule, getIconFromModuleType };
