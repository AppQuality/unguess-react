import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { ModulesBottomNavigation } from './common/ModulesBottomNavigation';
import { TabTitle } from './common/TabTitle';
import { PlanTab } from './context/planContext';
import { MODULES_BY_TAB, modulesMap } from './modulesMap';

const BodyContainer = styled.div`
  height: 100%;
  min-height: 100%;
`;

const ModulesWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: ${({ theme }) => theme.space.md};

  // Hide scrollbar
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

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
    <BodyContainer>
      <ModulesWrapper id="modules-list-scrollable">
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
                display: isVisible ? 'block' : 'none',
              }}
            >
              <Component key={type} />
            </div>
          );
        })}
        {tabId !== 'summary' && <ModulesBottomNavigation tabId={tabId} />}
        <div className="scroll-spacer" style={{ height: '400px' }} />
      </ModulesWrapper>
    </BodyContainer>
  );
};
