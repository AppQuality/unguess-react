import { components } from 'src/common/schema';

export type ModuleType = components['schemas']['Module']['type'];
export type ModuleGroup = { id: string; title: string; modules: ModuleType[] };
export type PlanTabName = 'setup' | 'target' | 'instructions' | 'summary';
export type PlanTab = { name: PlanTabName; order: number; title: string };

export const MODULE_GROUPS: Record<PlanTabName, ModuleGroup[]> = {
  setup: [
    {
      id: 'beforeStartingSetup',
      title: '__PLAN_PAGE_GROUP_TITLE_BEFORE_STARTING',
      modules: ['setup_note'],
    },
    {
      id: 'essentials',
      title: '__PLAN_PAGE_GROUP_TITLE_ESSENTIALS',
      modules: ['goal'],
    },
    {
      id: 'technicalRequirements',
      title: '__PLAN_PAGE_GROUP_TITLE_TECHNICAL_REQUIREMENTS',
      modules: ['touchpoints', 'browser'],
    },
  ],
  target: [
    {
      id: 'beforeStartingTargeting',
      title: '__PLAN_PAGE_GROUP_TITLE_BEFORE_STARTING',
      modules: ['target_note'],
    },
    {
      id: 'demographicCriteria',
      title: '__PLAN_PAGE_GROUP_TITLE_DEMOGRAPHIC_CRITERIA',
      modules: [
        'target',
        'language',
        'age',
        'gender',
        'locality',
        'employment',
        'annual_income_range',
      ],
    },
    {
      id: 'behaviouralData',
      title: '__PLAN_PAGE_GROUP_TITLE_BEHAVIOURAL_DATA',
      modules: ['literacy'],
    },
    {
      id: 'utilityCriteria',
      title: '__PLAN_PAGE_GROUP_TITLE_UTILITY_CRITERIA',
      modules: [
        'bank',
        'gas_supply',
        'elettricity_supply',
        'mobile_internet',
        'home_internet',
      ],
    },
    {
      id: 'advancedCriteria',
      title: '__PLAN_PAGE_GROUP_TITLE_ADVANCED_CRITERIA',
      modules: ['additional_target'],
    },
  ],
  instructions: [
    {
      id: 'beforeStartingInstructions',
      title: '__PLAN_PAGE_GROUP_TITLE_BEFORE_STARTING',
      modules: ['instruction_note'],
    },
    {
      id: 'activityScope',
      title: '__PLAN_PAGE_GROUP_TITLE_ACTIVITY_SCOPE',
      modules: ['tasks'],
    },
    {
      id: 'additionalDetails',
      title: '__PLAN_PAGE_GROUP_TITLE_ADDITIONAL_DETAILS',
      modules: ['out_of_scope'],
    },
  ],
  summary: [],
};

// Dummy usage for i18n key extraction
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const i18nPlanTitles = () => {
  // Only for i18n extraction tools, do not use in runtime
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const { t } = require('react-i18next');
  // Group titles
  t('__PLAN_PAGE_GROUP_TITLE_UTILITY_CRITERIA');
  t('__PLAN_PAGE_GROUP_TITLE_BEFORE_STARTING');
  t('__PLAN_PAGE_GROUP_TITLE_ESSENTIALS');
  t('__PLAN_PAGE_GROUP_TITLE_TECHNICAL_REQUIREMENTS');
  t('__PLAN_PAGE_GROUP_TITLE_DEMOGRAPHIC_CRITERIA');
  t('__PLAN_PAGE_GROUP_TITLE_BEHAVIOURAL_DATA');
  t('__PLAN_PAGE_GROUP_TITLE_ADVANCED_CRITERIA');
  t('__PLAN_PAGE_GROUP_TITLE_ACTIVITY_SCOPE');
  t('__PLAN_PAGE_GROUP_TITLE_ADDITIONAL_DETAILS');
  // Tab titles
  t('__PLAN_PAGE_TAB_SETUP_TAB_TITLE');
  t('__PLAN_PAGE_TAB_TARGET_TAB_TITLE');
  t('__PLAN_PAGE_TAB_INSTRUCTIONS_TAB_TITLE');
  t('__PLAN_PAGE_TAB_SUMMARY_TAB_TITLE');
};

// keep order updated for animations and navigation
export const PLAN_TABS: PlanTab[] = [
  { name: 'setup', order: 0, title: '__PLAN_PAGE_TAB_SETUP_TAB_TITLE' },
  { name: 'target', order: 1, title: '__PLAN_PAGE_TAB_TARGET_TAB_TITLE' },
  {
    name: 'instructions',
    order: 2,
    title: '__PLAN_PAGE_TAB_INSTRUCTIONS_TAB_TITLE',
  },
  { name: 'summary', order: 3, title: '__PLAN_PAGE_TAB_SUMMARY_TAB_TITLE' },
];
