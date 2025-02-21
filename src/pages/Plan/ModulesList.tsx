import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { PlanTab } from './context/planContext';
import { Dates } from './modules/Dates';
import { Tasks } from './modules/Tasks';
import { Title } from './modules/Title';

const MODULES_BY_TAB = {
  setup: ['title', 'dates'],
  target: ['age'],
  instructions: ['tasks'],
};

export const ModulesList = ({ tabId }: { tabId: PlanTab }) => {
  const { getModules } = useModuleConfiguration();
  const availableModules =
    MODULES_BY_TAB[tabId as keyof typeof MODULES_BY_TAB] || [];
  const getModule = (type: string) => {
    switch (type) {
      case 'title':
        return <Title key="title" />;
      case 'tasks':
        return <Tasks key="tasks" />;
      case 'dates':
        return <Dates key="dates" />;
      default:
        return null;
    }
  };

  if (!availableModules.length) {
    return null;
  }

  return (
    <>
      {getModules().map(
        (module) =>
          availableModules.includes(module.type) && getModule(module.type)
      )}
    </>
  );
};
