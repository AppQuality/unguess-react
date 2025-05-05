import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { ModulesBottomNavigation } from './common/ModulesBottomNavigation';
import { TabTitle } from './common/TabTitle';
import { PlanTab } from './context/planContext';
import { modulesMap, MODULES_BY_TAB } from './modulesMap';

export const ModulesList = ({ tabId }: { tabId: PlanTab }) => {
  const currentModules = useAppSelector(
    (state) => state.planModules.currentModules
  );

  const availableModules =
    MODULES_BY_TAB[tabId as keyof typeof MODULES_BY_TAB] || [];

  if (!availableModules.length) {
    return null;
  }

  return (
    <>
      <TabTitle tabId={tabId} />
      {currentModules.map((type) => {
        const isVisible = availableModules.includes(type);

        const Component = modulesMap[`${type}`];
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
