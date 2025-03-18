import { useTranslation } from 'react-i18next';
import { components } from 'src/common/schema';

const getTitleFromModule = (module: components['schemas']['Module']) => {
  const { type } = module;
  const { t } = useTranslation();

  switch (type) {
    case 'dates':
      return t('__PLAN_PAGE_MODULE_DATES_BLOCK_TITLE');
    case 'age':
      return t('__PLAN_PAGE_MODULE_AGE_BLOCK_TITLE');
    case 'gender':
      return t('__PLAN_PAGE_MODULE_GENDER_BLOCK_TITLE');
    case 'goal':
      return t('__PLAN_PAGE_MODULE_GOAL_BLOCK_TITLE');
    case 'language':
      return t('__PLAN_PAGE_MODULE_LANGUAGE_BLOCK_TITLE');
    case 'literacy':
      return t('__PLAN_PAGE_MODULE_LITERACY_BLOCK_TITLE');
    case 'out_of_scope':
      return t('__PLAN_PAGE_MODULE_OUT_OF_SCOPE_BLOCK_TITLE');
    case 'target':
      return t('__PLAN_PAGE_MODULE_TARGET_BLOCK_TITLE');
    case 'tasks':
      return t('__PLAN_PAGE_MODULE_TASKS_BLOCK_TITLE');
    case 'title':
      return t('__PLAN_PAGE_MODULE_TITLE_BLOCK_TITLE');
    default:
      return '';
  }
};

export { getTitleFromModule };
