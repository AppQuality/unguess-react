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

const ModuleItem = styled.div<{
  $isTasksOrTarget: boolean;
}>`
  margin-bottom: ${({ theme }) => theme.space.lg};
  padding-left: ${({ $isTasksOrTarget, theme }) =>
    $isTasksOrTarget ? 0 : theme.space.xs};
  padding-right: ${({ $isTasksOrTarget, theme }) =>
    $isTasksOrTarget ? 0 : theme.space.xs};
  [data-garden-id='accordions.section'],
  [data-garden-id='notifications.well'] {
    background-color: ${appTheme.palette.white};
    border: 1px solid ${appTheme.palette.grey['300']};
  }
  &.newly-added-module {
    [data-garden-id='accordions.section'],
    [data-garden-id='notifications.well'] {
      animation: highlight 3.4s ease-out;
    }
  }
`;

const GroupsWrapper = styled.div`
  > div {
    &:not(:last-child) {
      border-bottom: 1px solid ${appTheme.palette.grey['200']};
    }
  }
  @keyframes highlight {
    0% {
      background-color: ${appTheme.palette.yellow[100]};
      border-color: ${appTheme.palette.yellow['500']};
    }
    30% {
      background-color: ${appTheme.palette.yellow[100]};
      border-color: ${appTheme.palette.yellow['500']};
    }
    100% {
      background-color: ${appTheme.palette.white};
      border-color: ${appTheme.palette.grey['300']};
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

  // Track previous modules to detect additions
  const prevModulesRef = useRef<string[]>(currentModules);
  // Refs for each module type
  const moduleRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    prevOrderRef.current = activeTab.order;
  }, [activeTab.order]);

  // Find newly added module
  useEffect(() => {
    const prev = prevModulesRef.current;
    if (currentModules.length > prev.length) {
      const newModule = currentModules.find((m) => !prev.includes(m));

      if (newModule && moduleRefs.current[`${newModule}`]) {
        moduleRefs.current[`${newModule}`]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        // add here a class to highlight the newly added module with an animation
        moduleRefs.current[`${newModule}`]?.classList.add('newly-added-module');
        setTimeout(() => {
          moduleRefs.current[`${newModule}`]?.classList.remove(
            'newly-added-module'
          );
        }, 3500); // Remove highlight after 2.5 seconds
      }
    }
    prevModulesRef.current = currentModules;
  }, [currentModules]);

  if (!availableModules.length) {
    return null;
  }

  const groupConfig = MODULE_GROUPS[`${activeTab.name}`] || [];

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
                {groupModules.map((type) => {
                  const isTasksOrTarget = type === 'tasks' || type === 'target';
                  const Component = getModuleBySlug(type)?.Component;
                  if (!Component) return null;
                  return (
                    <ModuleItem
                      key={`module-${type}`}
                      id={`module-${type}`}
                      ref={(el) => {
                        moduleRefs.current[`${type}`] = el;
                      }}
                      $isTasksOrTarget={isTasksOrTarget}
                    >
                      <Component id={type} />
                    </ModuleItem>
                  );
                })}
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
