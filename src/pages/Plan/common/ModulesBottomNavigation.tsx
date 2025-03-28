import { Button } from '@appquality/unguess-design-system';
import { ReactComponent as ChevronLeftIcon } from '@zendeskgarden/svg-icons/src/12/chevron-left-stroke.svg';
import { ReactComponent as ChevronRightIcon } from '@zendeskgarden/svg-icons/src/12/chevron-right-stroke.svg';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { MODULE_TABS_ORDER } from 'src/constants';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { PlanTab, usePlanTab } from '../context/planContext';

export const ModulesBottomNavigation = ({ tabId }: { tabId: PlanTab }) => {
  const { setActiveTab } = usePlanTab();
  const { t } = useTranslation();
  const { getPlanStatus } = useModuleConfiguration();
  let leftLabel = '';
  let rightLabel = '';
  const previousTab = MODULE_TABS_ORDER[MODULE_TABS_ORDER.indexOf(tabId) - 1];
  const nextTab = MODULE_TABS_ORDER[MODULE_TABS_ORDER.indexOf(tabId) + 1];
  const isFirstTab = MODULE_TABS_ORDER.indexOf(tabId) === 0;
  const isInstructionsTabRightButtonDisabled =
    getPlanStatus() === 'draft' && tabId === ('instructions' as PlanTab);

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
