import { getColor } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AccessibilityTaskIcon } from 'src/assets/icons/accessibility-task-icon.svg';
import { ReactComponent as ExploratoryTaskIcon } from 'src/assets/icons/exploratory-task-icon.svg';
import { ReactComponent as FunctionalTaskIcon } from 'src/assets/icons/functional-task-icon.svg';
import { ReactComponent as SurveyTaskIcon } from 'src/assets/icons/survey-task-icon.svg';
import { ReactComponent as ThinkingAloudTaskIcon } from 'src/assets/icons/thinking-aloud-task-icon.svg';

import { TTask, useModuleTasks } from '../hooks';

const getIconColor = (task: TTask) => {
  const { error } = useModuleTasks();
  const titleError =
    error && typeof error === 'object' && `tasks.${task.id}.title` in error
      ? error[`tasks.${task.id}.title`]
      : false;
  const descriptionError =
    error &&
    typeof error === 'object' &&
    `tasks.${task.id}.description` in error
      ? error[`tasks.${task.id}.description`]
      : false;
  const invalidUrlError =
    error && typeof error === 'object' && `tasks.${task.id}.url` in error
      ? error[`tasks.${task.id}.url`]
      : false;

  const hasErrors = titleError || descriptionError || invalidUrlError;

  if (hasErrors) return getColor(appTheme.colors.dangerHue, 900);
  if (!hasErrors && (!task.title || !task.description))
    return getColor(appTheme.palette.grey, 600);
  return getColor(appTheme.colors.primaryHue, 600);
};

const getIconFromTaskOutput = (task: TTask) => {
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
    case 'accessibility':
      return <AccessibilityTaskIcon color={color} />;
    default:
      return null;
  }
};

export { getIconFromTaskOutput };
