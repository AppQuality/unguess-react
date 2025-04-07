import { useAppSelector } from 'src/app/hooks';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled from 'styled-components';
import { NavContainer } from '../../common/NavContainer';
import { usePlanTab } from '../../context/planContext';
import { MODULES_BY_TAB } from '../../modulesMap';
import { AddBlockButton } from './AddBlockButton';
import { MODULES_WITH_OUTPUT } from './const';
import { AddBlockModal } from './modal/AddBlockModal';
import { NavItem } from './NavItem';
import { NavItemChildren } from './NavItemChildren';

const BodyContainer = styled.div`
  max-height: calc(100vh - ${({ theme }) => theme.space.xxl});
  overflow-y: auto;
  margin-bottom: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.lg} 0;
`;

const NavBody = () => {
  const { activeTab } = usePlanTab();
  const availableModules =
    MODULES_BY_TAB[activeTab as keyof typeof MODULES_BY_TAB] || [];
  const { getPlanStatus } = useModuleConfiguration();
  const { currentModules } = useAppSelector((state) => state.planModules);
  const { hasFeatureFlag } = useFeatureFlag();

  return (
    <NavContainer data-qa="plans-nav">
      <BodyContainer data-qa={`plans-nav-${activeTab}`}>
        {currentModules
          .filter((module) => availableModules.includes(module))
          .map((module, index) => (
            <NavItem index={index} type={module}>
              {MODULES_WITH_OUTPUT.includes(module) && (
                <NavItemChildren key={module} type={module} />
              )}
            </NavItem>
          ))}
      </BodyContainer>
      {getPlanStatus() === 'draft' &&
        hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) && (
          <div style={{ marginTop: 'auto' }}>
            <AddBlockButton />
            <AddBlockModal />
          </div>
        )}
    </NavContainer>
  );
};

export { NavBody };
