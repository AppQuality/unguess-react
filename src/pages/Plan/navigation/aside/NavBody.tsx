import { appTheme } from 'src/app/theme';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import styled from 'styled-components';
import { usePlanTab } from '../../context/planContext';
import { MODULES_BY_TAB } from '../../modulesMap';
import { AddBlockButton } from './AddBlockButton';
import { AddBlockModal } from './modal/AddBlockModal';
import { MODULES_WITH_OUTPUT } from './const';
import { NavItem } from './NavItem';
import { NavItemChildren } from './NavItemChildren';

const StickyContainer = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.space.md};
  max-height: calc(
    100vh - ${({ theme }) => theme.components.chrome.header.height} -
      ${({ theme }) => theme.space.xxl} - ${({ theme }) => theme.space.xxl}
  );
  overflow-y: auto;
  padding: ${({ theme }) => theme.space.sm};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavBody = () => {
  const { activeTab } = usePlanTab();
  const availableModules =
    MODULES_BY_TAB[activeTab as keyof typeof MODULES_BY_TAB] || [];
  const { getModules } = useModuleConfiguration();

  return (
    <StickyContainer
      data-qa="plans-nav"
      style={{ marginBottom: appTheme.space.md }}
    >
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
