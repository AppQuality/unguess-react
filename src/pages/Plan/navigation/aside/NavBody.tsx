import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import styled from 'styled-components';
import { StickyContainer } from '../../common/StickyContainer';
import { usePlanTab } from '../../context/planContext';
import { MODULES_BY_TAB } from '../../modulesMap';
import { AddBlockButton } from './AddBlockButton';
import { MODULES_WITH_OUTPUT } from './const';
import { AddBlockModal } from './modal/AddBlockModal';
import { NavItem } from './NavItem';
import { NavItemChildren } from './NavItemChildren';

const NavBody = () => {
  const { activeTab } = usePlanTab();
  const availableModules =
    MODULES_BY_TAB[activeTab as keyof typeof MODULES_BY_TAB] || [];
  const { getModules } = useModuleConfiguration();

  return (
    <StickyContainer data-qa="plans-nav">
      <div data-qa={`plans-nav-${activeTab}`}>
        {getModules()
          .filter((module) => availableModules.includes(module.type))
          .map((module, index) => (
            <NavItem index={index} module={module}>
              {MODULES_WITH_OUTPUT.includes(module.type) && (
                <NavItemChildren key={module.type} module={module} />
              )}
            </NavItem>
          ))}
      </div>
      <AddBlockButton />
      <AddBlockModal />
    </StickyContainer>
  );
};

export { NavBody };
