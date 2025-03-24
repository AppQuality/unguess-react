import { getColor } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { ReactComponent as ExploratoryTaskIcon } from 'src/assets/icons/exploratory-task-icon.svg';
import { ReactComponent as FunctionalTaskIcon } from 'src/assets/icons/functional-task-icon.svg';
import { ReactComponent as SurveyTaskIcon } from 'src/assets/icons/survey-task-icon.svg';
import { ReactComponent as ThinkingAloudTaskIcon } from 'src/assets/icons/thinking-aloud-task-icon.svg';
import { components } from 'src/common/schema';
import { useModuleTasks } from '../hooks';

const getIconColor = (
  task: components['schemas']['OutputModuleTask'] & { key: number }
) => {
  const { key } = task;
  const { error } = useModuleTasks();
  const titleError =
    error && typeof error === 'object' && `tasks.${key}.title` in error
      ? error[`tasks.${key}.title`]
      : false;
  const descriptionError =
    error && typeof error === 'object' && `tasks.${key}.description` in error
      ? error[`tasks.${key}.description`]
      : false;

  const hasErrors = titleError || descriptionError;

  if (hasErrors) return getColor(appTheme.colors.dangerHue, 900);
  if (!hasErrors && (!task.title || !task.description))
    return getColor(appTheme.palette.grey, 600);
  return getColor(appTheme.colors.primaryHue, 600);
};

const getIconFromTaskOutput = (
  task: components['schemas']['OutputModuleTask'] & { key: number }
) => {
  const { kind } = task;
  const color = getIconColor(task);

  switch (kind) {
    case 'bug':
      return <FunctionalTaskIcon color={color} />;
    case 'explorative-bug':
      return <ExploratoryTaskIcon color={color} />;
    case 'video':
      return <ThinkingAloudTaskIcon color={color} />;
    case 'moderate-video':
      return <ThinkingAloudTaskIcon color={color} />;
    case 'survey':
      return <SurveyTaskIcon color={color} />;
    default:
      return null;
  }
};

export { getIconFromTaskOutput };
