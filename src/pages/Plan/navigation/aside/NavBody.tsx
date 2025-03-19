import { appTheme } from 'src/app/theme';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { usePlanTab } from '../../context/planContext';
import { MODULES_BY_TAB } from '../../modulesMap';
import { AddBlockButton } from './AddBlockButton';
import { AddBlockModal } from './AddBlockModal';
import { NavItem } from './NavItem';

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
            <NavItem module={module} index={index} />
          ))}
      </div>
      <AddBlockButton />
      <AddBlockModal />
    </div>
  );
};

export { NavBody };
