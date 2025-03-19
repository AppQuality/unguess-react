import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { PlanTab } from './context/planContext';
import { modulesMap, MODULES_BY_TAB } from './modulesMap';

export const ModulesList = ({ tabId }: { tabId: PlanTab }) => {
  const { getModules } = useModuleConfiguration();
  const availableModules =
    MODULES_BY_TAB[tabId as keyof typeof MODULES_BY_TAB] || [];

  if (!availableModules.length) {
    return null;
  }

  return (
    <>
      {getModules().map((module) => {
        if (availableModules.includes(module.type)) {
          const Component = modulesMap[module.type];
          if (!Component) return null;
          return (
            <div id={`module-${module.type}`}>
              <Component key={module.type} />
            </div>
          );
        }
        return null;
      })}
    </>
  );
};
