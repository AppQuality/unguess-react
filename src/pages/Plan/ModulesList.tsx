import { appTheme } from 'src/app/theme';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { Button } from '@appquality/unguess-design-system';
import { ReactComponent as ChevronLeftIcon } from '@zendeskgarden/svg-icons/src/12/chevron-left-stroke.svg';
import { ReactComponent as ChevronRightIcon } from '@zendeskgarden/svg-icons/src/12/chevron-right-stroke.svg';
import { MODULE_TABS_ORDER } from 'src/constants';
import { useTranslation } from 'react-i18next';
import { PlanTab, usePlanTab } from './context/planContext';
import { MODULES_BY_TAB, modulesMap } from './modulesMap';

const ModulesBottomNavigation = ({ tabId }: { tabId: PlanTab }) => {
  const { setActiveTab } = usePlanTab();
  const { t } = useTranslation();
  let leftLabel = '';
  let rightLabel = '';
  const previousTab = MODULE_TABS_ORDER[MODULE_TABS_ORDER.indexOf(tabId) - 1];
  const nextTab = MODULE_TABS_ORDER[MODULE_TABS_ORDER.indexOf(tabId) + 1];

  switch (tabId) {
    case 'setup':
      rightLabel = t('__MODULES_BOTTOM_NAVIGATION_SETUP_TAB_RIGHT_LABEL');
      break;
    case 'target':
      leftLabel = t('__MODULES_BOTTOM_NAVIGATION_TARGET_TAB_LEFT_LABEL');
      rightLabel = t('__MODULES_BOTTOM_NAVIGATION_TARGET_TAB_RIGHT_LABEL');
      break;
    case 'instructions':
      leftLabel = t('__MODULES_BOTTOM_NAVIGATION_TASKS_TAB_LEFT_LABEL');
      rightLabel = t('__MODULES_BOTTOM_NAVIGATION_TASKS_TAB_RIGHT_LABEL');
      break;
    default:
      break;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: tabId === 'setup' ? 'flex-end' : 'space-between',
      }}
    >
      {tabId !== 'setup' && (
        <Button
          isBasic
          size="small"
          onClick={() => {
            setActiveTab(previousTab);
          }}
        >
          <Button.StartIcon>
            <ChevronLeftIcon />
          </Button.StartIcon>
          {leftLabel}
        </Button>
      )}

      <Button
        isBasic
        size="small"
        onClick={() => {
          setActiveTab(nextTab);
        }}
      >
        {rightLabel}
        <Button.EndIcon>
          <ChevronRightIcon />
        </Button.EndIcon>
      </Button>
    </div>
  );
};

export const ModulesList = ({ tabId }: { tabId: PlanTab }) => {
  const { getModules } = useModuleConfiguration();
  const availableModules =
    MODULES_BY_TAB[tabId as keyof typeof MODULES_BY_TAB] || [];

  if (!availableModules.length) {
    return null;
  }

  return (
    <>
      {getModules().map((module) => {
        const isVisible = availableModules.includes(module.type);

        const Component = modulesMap[module.type];
        if (!Component) return null;
        return (
          <div
            id={`module-${module.type}`}
            style={{
              marginBottom: appTheme.space.md,
              display: isVisible ? 'block' : 'none',
            }}
          >
            <Component key={module.type} />
          </div>
        );
      })}
      {tabId === 'target' && <ModulesBottomNavigation tabId={tabId} />}
      {tabId === 'setup' && <ModulesBottomNavigation tabId={tabId} />}
      {tabId === 'instructions' && <ModulesBottomNavigation tabId={tabId} />}
    </>
  );
};
