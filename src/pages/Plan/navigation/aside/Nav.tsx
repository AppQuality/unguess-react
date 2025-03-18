import { appTheme } from 'src/app/theme';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { usePlanTab } from '../../context/planContext';
import { MODULES_BY_TAB } from '../../modulesMap';
import { NavItem } from './NavItem';

const Nav = () => {
  const { activeTab } = usePlanTab();
  const { getModules } = useModuleConfiguration();
  const modules: any[] = [];
  const availableModules =
    MODULES_BY_TAB[activeTab as keyof typeof MODULES_BY_TAB] || [];

  getModules().forEach((module) => {
    if (availableModules.includes(module.type)) {
      modules.push(module);
    }
  });

  return (
    <div data-qa="plans-nav" style={{ marginBottom: appTheme.space.md }}>
      <div data-qa={`plans-nav-${activeTab}`}>
        {modules.map((module, index) => (
          <NavItem module={module} index={index} />
        ))}
      </div>
    </div>
  );
};

export { Nav };
