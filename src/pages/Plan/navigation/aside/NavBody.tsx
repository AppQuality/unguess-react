import { appTheme } from 'src/app/theme';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { usePlanTab } from '../../context/planContext';
import { MODULES_BY_TAB } from '../../modulesMap';
import { AddBlockButton } from './AddBlockButton';
import { AddBlockModal } from './AddBlockModal';
import { MODULES_WITH_OUTPUT } from './const';
import { NavItem } from './NavItem';
import { NavItemWithChildren } from './NavItemWithChildren';

const NavBody = () => {
  const { activeTab } = usePlanTab();
  const availableModules =
    MODULES_BY_TAB[activeTab as keyof typeof MODULES_BY_TAB] || [];
  const { getModules } = useModuleConfiguration();

  return (
    <div data-qa="plans-nav" style={{ marginBottom: appTheme.space.md }}>
      <div data-qa={`plans-nav-${activeTab}`}>
        {getModules()
          .filter((module) => availableModules.includes(module.type))
          .map((module, index) => (
            <NavItem index={index} module={module}>
              {MODULES_WITH_OUTPUT.includes(module.type) && (
                <NavItemWithChildren key={module.type} module={module} />
              )}
            </NavItem>
          ))}
      </div>
      <AddBlockButton />
      <AddBlockModal />
    </div>
  );
};

export { NavBody };
