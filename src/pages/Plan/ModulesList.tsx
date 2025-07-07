import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { ModulesBottomNavigation } from './common/ModulesBottomNavigation';
import { TabTitle } from './common/TabTitle';
import { PlanTab } from './context/planContext';
import { getModuleBySlug, getModulesByTab } from './modules/Factory';

export const ModulesList = ({ tabId }: { tabId: PlanTab }) => {
  const currentModules = useAppSelector(
    (state) => state.planModules.currentModules
  );

  const availableModules = getModulesByTab(tabId);

  if (!availableModules.length) {
    return null;
  }

  return (
    <>
      <TabTitle tabId={tabId} />
      {currentModules.map((type) => {
        const isVisible = availableModules.includes(type);

        const Component = getModuleBySlug(type)?.Component;
        if (!Component) return null;
        return (
          <div
            id={`module-${type}`}
            style={{
              marginBottom: appTheme.space.lg,
              paddingLeft:
                type === 'tasks' || type === 'target' ? 0 : appTheme.space.xs,
              paddingRight:
                type === 'tasks' || type === 'target' ? 0 : appTheme.space.xs,
              display: isVisible ? 'block' : 'none',
            }}
          >
            <Component key={type} />
          </div>
        );
      })}
      {tabId !== 'summary' && <ModulesBottomNavigation tabId={tabId} />}
      <div
        className="scroll-spacer"
        style={{
          height: `calc(100vh - 510px)`,
        }}
      />
    </>
  );
};
