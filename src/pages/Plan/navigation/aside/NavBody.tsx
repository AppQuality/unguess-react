import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled from 'styled-components';
import { usePlanTab } from '../../context/planContext';
import { MODULES_BY_TAB } from '../../modulesMap';
import { AddBlockButton } from './AddBlockButton';
import { MODULES_WITH_OUTPUT } from './const';
import { AddBlockModal } from './modal/AddBlockModal';
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
  z-index: ${({ theme }) => theme.levels.front};
  padding-bottom: ${({ theme }) => theme.space.xxl};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavBody = () => {
  const { activeTab } = usePlanTab();
  const availableModules =
    MODULES_BY_TAB[activeTab as keyof typeof MODULES_BY_TAB] || [];
  const { getModules, getPlanStatus } = useModuleConfiguration();
  const { hasFeatureFlag } = useFeatureFlag();

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
      {getPlanStatus() === 'draft' &&
        hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) && (
          <>
            <AddBlockButton />
            <AddBlockModal />
          </>
        )}
    </StickyContainer>
  );
};

export { NavBody };
