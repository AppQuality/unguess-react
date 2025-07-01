import { useTranslation } from 'react-i18next';
import { components } from 'src/common/schema';
import { getModuleBySlug } from '../modules/Factory';

const getSubtitleFromModuleType = (
  type: components['schemas']['Module']['type']
) => {
  const { t } = useTranslation();
  let subtitle = '';
  try {
    subtitle = getModuleBySlug(type)?.useSubtitle?.() || '';
    console.log(`Subtitle for module type "${type}":`, subtitle);
  } catch (error) {
    console.error(`Error getting subtitle for module type "${type}":`, error);
  }

  switch (type) {
    case 'dates':
      return t('__ASIDE_NAVIGATION_MODULE_DATES_BLOCK_SUBTITLE');

    case 'gender':
      return t('__ASIDE_NAVIGATION_MODULE_GENDER_ACCORDION_SUBTITLE');
    case 'language':
      return t('__ASIDE_NAVIGATION_MODULE_LANGUAGE_SUBTITLE');
    case 'locality':
      return t('__ASIDE_NAVIGATION_MODULE_LOCALITY_SUBTITLE');
    case 'literacy':
      return t('__ASIDE_NAVIGATION_MODULE_DIGITAL_LITERACY_ACCORDION_SUBTITLE');
    case 'out_of_scope':
      return t('__ASIDE_NAVIGATION_MODULE_OUT_OF_SCOPE_SUBTITLE');
    case 'target':
      return t('__ASIDE_NAVIGATION_MODULE_TARGET_SUBTITLE');
    case 'target_note':
      return t('__ASIDE_NAVIGATION_MODULE_TARGET_NOTE_BLOCK_SUBTITLE');
    case 'title':
      return t('__ASIDE_NAVIGATION_MODULE_SUBTITLE_BLOCK_SUBTITLE');
    case 'setup_note':
      return t('__ASIDE_NAVIGATION_MODULE_SETUP_NOTE_BLOCK_SUBTITLE');
    case 'instruction_note':
      return t('__ASIDE_NAVIGATION_MODULE_INSTRUCTIONS_NOTE_BLOCK_SUBTITLE');
    case 'touchpoints':
      return t('__ASIDE_NAVIGATION_MODULE_TOUCHPOINTS_SUBTITLE');
    default:
      return subtitle || '';
  }
};

export { getSubtitleFromModuleType };
