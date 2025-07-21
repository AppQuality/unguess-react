import { Button } from '@appquality/unguess-design-system';
import { ReactComponent as ChevronLeftIcon } from '@zendeskgarden/svg-icons/src/12/chevron-left-stroke.svg';
import { ReactComponent as ChevronRightIcon } from '@zendeskgarden/svg-icons/src/12/chevron-right-stroke.svg';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { usePlanContext } from '../context/planContext';
import { PLAN_TABS } from './constants';

export const ModulesBottomNavigation = () => {
  const { setActiveTab, activeTab } = usePlanContext();
  const { t } = useTranslation();
  const { getPlanStatus } = useModuleConfiguration();
  let leftLabel = '';
  let rightLabel = '';
  // Find current tab index
  const currentIndex = PLAN_TABS.findIndex(
    (tab) => tab.name === activeTab.name
  );
  const previousTab = PLAN_TABS[currentIndex - 1];
  const nextTab = PLAN_TABS[currentIndex + 1];
  const isFirstTab = currentIndex === 0;
  const isInstructionsTabRightButtonDisabled =
    getPlanStatus() === 'draft' && activeTab.name === 'instructions';
  const main = document.getElementById('main');

  switch (activeTab.name) {
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
    case 'summary':
      leftLabel = t('__MODULES_BOTTOM_NAVIGATION_SUMMARY_TAB_LEFT_LABEL');
      break;
    default:
      break;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isFirstTab ? 'flex-end' : 'space-between',
        marginTop: appTheme.space.xl,
      }}
    >
      {!isFirstTab && (
        <Button
          isBasic
          size="small"
          onClick={() => {
            setActiveTab(previousTab);
            if (main) {
              main.scrollTop = 0;
            }
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
          if (main) {
            main.scrollTop = 0;
          }
        }}
        disabled={isInstructionsTabRightButtonDisabled}
      >
        {rightLabel}
        <Button.EndIcon>
          <ChevronRightIcon />
        </Button.EndIcon>
      </Button>
    </div>
  );
};
