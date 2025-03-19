import { getColor } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AgeIcon } from 'src/assets/icons/cake-icon-fill.svg';
import { ReactComponent as GenderIcon } from '@zendeskgarden/svg-icons/src/16/user-group-fill.svg';
import { ReactComponent as GoalIcon } from 'src/assets/icons/flag-fill.svg';
import { ReactComponent as LanguageIcon } from 'src/assets/icons/languages.svg';
import { ReactComponent as LiteracyIcon } from '@zendeskgarden/svg-icons/src/16/book-closed-fill.svg';
import { ReactComponent as OutOfScopeIcon } from 'src/assets/icons/x-circle.svg';
import { ReactComponent as TargetIcon } from 'src/assets/icons/user-follow.svg';
import { ReactComponent as TasksIcon } from 'src/assets/icons/tasks-icon.svg';
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
    case 'age':
      return <AgeIcon />;
    case 'gender':
      return <GenderIcon />;
    case 'goal':
      return <GoalIcon />;
    case 'language':
      return <LanguageIcon />;
    case 'literacy':
      return <LiteracyIcon />;
    case 'out_of_scope':
      return <OutOfScopeIcon />;
    case 'target':
      return <TargetIcon />;
    case 'tasks':
      return <TasksIcon />;
    case 'title':
    case 'dates':
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
