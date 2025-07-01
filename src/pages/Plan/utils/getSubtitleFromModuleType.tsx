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
    case 'touchpoints':
      return t('__ASIDE_NAVIGATION_MODULE_TOUCHPOINTS_SUBTITLE');
    default:
      return subtitle || '';
  }
};

export { getSubtitleFromModuleType };
