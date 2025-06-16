import { useTranslation } from 'react-i18next';
import { components } from 'src/common/schema';

const getSubtitleFromModuleType = (
  type: components['schemas']['Module']['type']
) => {
  const { t } = useTranslation();

  switch (type) {
    case 'dates':
      return t('__ASIDE_NAVIGATION_MODULE_DATES_BLOCK_SUBTITLE');
    case 'age':
      return t('__ASIDE_NAVIGATION_MODULE_AGE_SUBTITLE');
    case 'gender':
      return t('__ASIDE_NAVIGATION_MODULE_GENDER_ACCORDION_SUBTITLE');
    case 'goal':
      return t('__ASIDE_NAVIGATION_MODULE_GOAL_SUBTITLE');
    case 'language':
      return t('__ASIDE_NAVIGATION_MODULE_LANGUAGE_SUBTITLE');
    // @ts-ignore
    case 'locality':
      return t('__ASIDE_NAVIGATION_MODULE_LOCATION_SUBTITLE');
    case 'literacy':
      return t('__ASIDE_NAVIGATION_MODULE_DIGITAL_LITERACY_ACCORDION_SUBTITLE');
    case 'out_of_scope':
      return t('__ASIDE_NAVIGATION_MODULE_OUT_OF_SCOPE_SUBTITLE');
    case 'target':
      return t('__ASIDE_NAVIGATION_MODULE_TARGET_SUBTITLE');
    case 'target_note':
      return t('__ASIDE_NAVIGATION_MODULE_TARGET_NOTE_BLOCK_SUBTITLE');
    case 'tasks':
      return t('__ASIDE_NAVIGATION_MODULE_TASKS_SUBTITLE');
    case 'title':
      return t('__ASIDE_NAVIGATION_MODULE_SUBTITLE_BLOCK_SUBTITLE');
    case 'setup_note':
      return t('__ASIDE_NAVIGATION_MODULE_SETUP_NOTE_BLOCK_SUBTITLE');
    case 'instruction_note':
      return t('__ASIDE_NAVIGATION_MODULE_INSTRUCTIONS_NOTE_BLOCK_SUBTITLE');
    case 'browser':
      return t('__ASIDE_NAVIGATION_MODULE_BROWSER_SUBTITLE');
    case 'touchpoints':
      return t('__ASIDE_NAVIGATION_MODULE_TOUCHPOINTS_SUBTITLE');
    case 'additional_target':
      return t('__ASIDE_NAVIGATION_MODULE_ADDITIONAL_TARGET_SUBTITLE');
    case 'employment':
    default:
      return '';
  }
};

export { getSubtitleFromModuleType };
