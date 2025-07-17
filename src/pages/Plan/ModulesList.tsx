import { AnimatePresence, motion } from 'motion/react';
import { useAppSelector } from 'src/app/hooks';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { ModulesBottomNavigation } from './common/ModulesBottomNavigation';
import { TabTitle } from './common/TabTitle';
import { usePlanContext } from './context/planContext';
import { getModuleBySlug, getModulesByTab } from './modules/Factory';
import { i } from 'motion/dist/react-client';

const ModuleItem = styled.div<{
  $isTasksOrTarget: boolean;
  $isVisible: boolean;
}>`
  margin-bottom: ${({ theme }) => theme.space.lg};
  padding-left: ${({ $isTasksOrTarget, theme }) =>
    $isTasksOrTarget ? 0 : theme.space.xs};
  padding-right: ${({ $isTasksOrTarget, theme }) =>
    $isTasksOrTarget ? 0 : theme.space.xs};
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
`;

export const ModulesList = () => {
  const currentModules = useAppSelector(
    (state) => state.planModules.currentModules
  );
  const { activeTab } = usePlanContext();
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
        {currentModules.map((type) => {
          const isVisible = availableModules.includes(type);
          const isTasksOrTarget = type === 'tasks' || type === 'target';
          const Component = getModuleBySlug(type)?.Component;
          if (!Component) return null;
          return (
            <ModuleItem
              key={`module-${type}`}
              id={`module-${type}`}
              $isTasksOrTarget={isTasksOrTarget}
              $isVisible={isVisible}
            >
              <Component id={type} />
            </ModuleItem>
          );
        })}
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
