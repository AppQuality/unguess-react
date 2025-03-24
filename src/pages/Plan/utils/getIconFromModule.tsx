import { getColor } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AgeIcon } from 'src/assets/icons/cake-icon-fill.svg';
import { ReactComponent as GenderIcon } from 'src/assets/icons/gender-icon.svg';
import { ReactComponent as GoalIcon } from 'src/assets/icons/flag-fill.svg';
import { ReactComponent as LanguageIcon } from 'src/assets/icons/languages.svg';
import { ReactComponent as LiteracyIcon } from 'src/assets/icons/literacy-icon.svg';
import { ReactComponent as OutOfScopeIcon } from 'src/assets/icons/x-circle.svg';
import { ReactComponent as TargetIcon } from 'src/assets/icons/user-follow.svg';
import { ReactComponent as TasksIcon } from 'src/assets/icons/tasks-icon.svg';
import { components } from 'src/common/schema';
import { useValidationContext } from 'src/features/modules/FormProvider';
import { useModule } from 'src/features/modules/useModule';

const getIconColor = (module_type: components['schemas']['Module']['type']) => {
  const { errors } = useValidationContext();
  const { value } = useModule(module_type);

  const hasErrors =
    (errors &&
      typeof errors === 'object' &&
      Object.keys(errors).some(
        (key) => key.startsWith(module_type) || key === module_type
      )) ??
    false;

  const hasValues = value && value.output;

  if (hasErrors) return getColor(appTheme.colors.dangerHue, 600);
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
