import { useTranslation } from 'react-i18next';
import { components } from 'src/common/schema';

const getTitleFromModuleType = (
  type: components['schemas']['Module']['type']
) => {
  const { t } = useTranslation();

  switch (type) {
    case 'dates':
      return t('__PLAN_PAGE_MODULE_DATES_BLOCK_TITLE');
    case 'age':
      return t('__PLAN_PAGE_MODULE_AGE_LABEL');
    case 'gender':
      return t('__PLAN_PAGE_MODULE_GENDER_ACCORDION_LABEL');
    case 'goal':
      return t('__PLAN_PAGE_MODULE_GOAL_TITLE');
    case 'language':
      return t('__PLAN_PAGE_MODULE_LANGUAGE_TITLE');
    case 'locality':
      return t('__PLAN_PAGE_MODULE_LOCALITY_TITLE');
    case 'literacy':
      return t('__PLAN_PAGE_MODULE_DIGITAL_LITERACY_ACCORDION_LABEL');
    case 'out_of_scope':
      return t('__PLAN_PAGE_MODULE_OUT_OF_SCOPE_TITLE');
    case 'target':
      return t('__PLAN_PAGE_MODULE_TARGET_TITLE');
    case 'target_note':
      return t('__PLAN_PAGE_MODULE_TARGET_NOTE_BLOCK_TITLE');
    case 'tasks':
      return t('__PLAN_PAGE_MODULE_TASKS_TITLE');
    case 'title':
      return t('__PLAN_PAGE_MODULE_TITLE_BLOCK_TITLE');
    case 'setup_note':
      return t('__PLAN_PAGE_MODULE_SETUP_NOTE_BLOCK_TITLE');
    case 'instruction_note':
      return t('__PLAN_PAGE_MODULE_INSTRUCTIONS_NOTE_BLOCK_TITLE');
    case 'browser':
      return t('__PLAN_PAGE_MODULE_BROWSER_LABEL');
    case 'touchpoints':
      return t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TITLE');
    case 'additional_target':
      return t('__PLAN_PAGE_MODULE_ADDITIONAL_TARGET_TITLE');
    case 'employment':
      return t('__PLAN_PAGE_MODULE_EMPLOYMENT_TITLE');
    case 'annual_income_range':
      return t('__PLAN_PAGE_MODULE_INCOME_LABEL');
    case 'bank':
      return t('__PLAN_PAGE_MODULE_BANK_LABEL');
    case 'elettricity_supply':
      return t('__PLAN_PAGE_MODULE_ELECTRICITY_LABEL');
    case 'mobile_internet':
      return t('__PLAN_PAGE_MODULE_INTERNET_MOBILE_LABEL');
    case 'home_internet':
      return t('__PLAN_PAGE_MODULE_INTERNET_HOME_LABEL');
    default:
      return '';
  }
};

export { getTitleFromModuleType };
