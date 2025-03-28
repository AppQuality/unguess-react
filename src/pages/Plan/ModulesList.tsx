import { appTheme } from 'src/app/theme';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { ModulesBottomNavigation } from './common/ModulesBottomNavigation';
import { TabTitle } from './common/TabTitle';
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
      <TabTitle tabId={tabId} />
      {getModules().map((module) => {
        const isVisible = availableModules.includes(module.type);

        const Component = modulesMap[module.type];
        if (!Component) return null;
        return (
          <div
            id={`module-${module.type}`}
            style={{
              marginBottom: appTheme.space.md,
              display: isVisible ? 'block' : 'none',
            }}
          >
            <Component key={module.type} />
          </div>
        );
      })}
      {tabId !== 'summary' && <ModulesBottomNavigation tabId={tabId} />}
    </>
  );
};
