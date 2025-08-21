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
  padding-left: ${({ $isTasksOrTarget, theme }) =>
    $isTasksOrTarget ? 0 : theme.space.xs};
  padding-right: ${({ $isTasksOrTarget, theme }) =>
    $isTasksOrTarget ? 0 : theme.space.xs};
  [data-garden-id='accordions.section'],
  [data-garden-id='notifications.well'] {
    background-color: var(--ug-plan-modules-highlight-final-bg);
    border-width: 1px;
    border-style: solid;
    border-color: ${(p) => p.theme.palette.grey['300']};
    margin-bottom: ${(p) =>
      p.theme.space.md}; // override internal component default margin
    &:last-child {
      margin-bottom: ${(p) => p.theme.space.xl};
    }
  }
  [data-garden-id='accordions.section'] {
    border-color: var(--semantic-color);
  }
  [data-garden-id='accordions.section'],
  [data-garden-id='notifications.well'] {
    --ug-plan-modules-highlight-final-bg: ${(p) => p.theme.palette.white};
  }
  .neutral-bg {
    --ug-plan-modules-highlight-final-bg: ${(p) => p.theme.palette.grey[100]};
  }
  &.newly-added-module {
    [data-garden-id='accordions.section'],
    [data-garden-id='notifications.well'] {
      animation: highlight 3.4s ease-out;
    }
  }
`;

const GroupsWrapper = styled.div`
  > div:not(:first-child) {
    border-top: 1px solid ${appTheme.palette.grey['200']};
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
      background-color: var(--ug-plan-modules-highlight-final-bg);
      border-color: ${appTheme.palette.grey['300']};
    }
  }
`;

export const ModulesList = () => {
  const currentModules = useAppSelector(
    (state) => state.planModules.currentModules
  );
  const { activeTab, newModule, setNewModule } = usePlanContext();
  const { t } = useTranslation();
  const availableModules = getModulesByTab(activeTab.name);

  // Use a ref to track previous order and calculate direction synchronously
  const prevOrderRef = useRef(activeTab.order);
  // Calculate direction before updating ref
  const initialX = activeTab.order > prevOrderRef.current ? 10 : -10;

  // Refs for each module type
  const moduleRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    prevOrderRef.current = activeTab.order;
  }, [activeTab.order]);

  // Scroll and highlight when newModule is set in context
  useEffect(() => {
    if (newModule && moduleRefs.current[`${newModule}`]) {
      moduleRefs.current[`${newModule}`]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      moduleRefs.current[`${newModule}`]?.classList.add('newly-added-module');
      setTimeout(() => {
        moduleRefs.current[`${newModule}`]?.classList.remove(
          'newly-added-module'
        );
        setNewModule(null);
      }, 3500);
    }
  }, [newModule, setNewModule]);

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
