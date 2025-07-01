import { useTranslation } from 'react-i18next';
import { components } from 'src/common/schema';
import { getModuleBySlug } from '../modules/Factory';

const getTitleFromModuleType = (
  type: components['schemas']['Module']['type']
) => {
  const { t } = useTranslation();
  let title;
  try {
    title = getModuleBySlug(type)?.useTitle?.();
  } catch (error) {
    console.error(`Error getting title for module type "${type}":`, error);
  }

  switch (type) {
    case 'dates':
      return t('__PLAN_PAGE_MODULE_DATES_BLOCK_TITLE');
    case 'touchpoints':
      return t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TITLE');
    case 'bank':
      return t('__PLAN_PAGE_MODULE_BANK_LABEL');
    case 'elettricity_supply':
      return t('__PLAN_PAGE_MODULE_ELECTRICITY_LABEL');
    case 'mobile_internet':
      return t('__PLAN_PAGE_MODULE_INTERNET_MOBILE_LABEL');
    case 'home_internet':
      return t('__PLAN_PAGE_MODULE_INTERNET_HOME_LABEL');
    case 'gas_supply':
      return t('__PLAN_PAGE_MODULE_GAS_LABEL');
    default:
      return title || '';
  }
};

export { getTitleFromModuleType };
