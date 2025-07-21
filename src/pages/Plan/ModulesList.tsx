import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { MODULE_GROUPS } from './common/constants';
import { GroupTitle } from './common/GroupTitle';
import { ModulesBottomNavigation } from './common/ModulesBottomNavigation';
import { TabTitle } from './common/TabTitle';
import { usePlanContext } from './context/planContext';
import { getModuleBySlug, getModulesByTab } from './modules/Factory';

const ModuleItem = styled(motion.div)<{
  $isTasksOrTarget: boolean;
  $isVisible: boolean;
}>`
  margin-bottom: ${({ theme }) => theme.space.lg};
  padding-left: ${({ $isTasksOrTarget, theme }) =>
    $isTasksOrTarget ? 0 : theme.space.xs};
  padding-right: ${({ $isTasksOrTarget, theme }) =>
    $isTasksOrTarget ? 0 : theme.space.xs};
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  [data-garden-id='accordions.section'] {
    background-color: var(--backgroundColor, ${appTheme.palette.white});
  }
`;

const GroupsWrapper = styled.div`
  > div {
    &:not(:last-child) {
      border-bottom: 1px solid ${appTheme.palette.grey['200']};
    }
  }
`;

export const ModulesList = () => {
  const currentModules = useAppSelector(
    (state) => state.planModules.currentModules
  );
  const { activeTab } = usePlanContext();
  const { t } = useTranslation();
  const availableModules = getModulesByTab(activeTab.name);

  // Use a ref to track previous order and calculate direction synchronously
  const prevOrderRef = useRef(activeTab.order);
  // Calculate direction before updating ref
  const initialX = activeTab.order > prevOrderRef.current ? 10 : -10;

  useEffect(() => {
    prevOrderRef.current = activeTab.order;
  }, [activeTab.order]);

  if (!availableModules.length) {
    return null;
  }

  const groupConfig = MODULE_GROUPS[activeTab.name] || [];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab.name}
        initial={{ x: initialX, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        <TabTitle />
        <GroupsWrapper>
          {groupConfig.map((group) => {
            const groupModules = group.modules.filter((module) =>
              currentModules.includes(module)
            );
            if (groupModules.length === 0) return null;
            return (
              <div key={group.id}>
                <GroupTitle>{t(group.title)}</GroupTitle>
                <AnimatePresence>
                  {groupModules.map((type) => {
                    const isVisible = availableModules.includes(type);
                    const isTasksOrTarget =
                      type === 'tasks' || type === 'target';
                    const Component = getModuleBySlug(type)?.Component;
                    if (!Component) return null;
                    return (
                      <ModuleItem
                        key={`module-${type}`}
                        id={`module-${type}`}
                        $isTasksOrTarget={isTasksOrTarget}
                        $isVisible={isVisible}
                        initial={{
                          '--backgroundColor': appTheme.palette.white,
                        }}
                        animate={{
                          '--backgroundColor': [
                            appTheme.palette.yellow[200],
                            appTheme.palette.yellow[100],
                            appTheme.palette.yellow[100],
                            appTheme.palette.white,
                          ],
                        }}
                        transition={{
                          duration: 2,
                          times: [0, 0.2, 0.8, 1],
                        }}
                      >
                        <Component id={type} />
                      </ModuleItem>
                    );
                  })}
                </AnimatePresence>
              </div>
            );
          })}
        </GroupsWrapper>
        {activeTab.name !== 'summary' && <ModulesBottomNavigation />}
        <div
          className="scroll-spacer"
          style={{
            height: `calc(100vh - 510px)`,
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};
