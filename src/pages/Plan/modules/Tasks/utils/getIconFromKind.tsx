import { components } from 'src/common/schema';
import { ReactComponent as ExploratoryTaskIcon } from 'src/assets/icons/exploratory-task-icon.svg';
import { ReactComponent as FunctionalTaskIcon } from 'src/assets/icons/functional-task-icon.svg';
import { ReactComponent as ThinkingAloudTaskIcon } from 'src/assets/icons/thinking-aloud-task-icon.svg';
import { ReactComponent as SurveyTaskIcon } from 'src/assets/icons/survey-task-icon.svg';

const getIconFromKind = (
  kind: components['schemas']['OutputModuleTask']['kind']
) => {
  switch (kind) {
    case 'bug':
      return <FunctionalTaskIcon />;
    case 'explorative-bug':
      return <ExploratoryTaskIcon />;
    case 'video':
      return <ThinkingAloudTaskIcon />;
    case 'moderate-video':
      return <ThinkingAloudTaskIcon />;
    case 'survey':
      return <SurveyTaskIcon />;
    default:
      return null;
  }
};

export { getIconFromKind };
