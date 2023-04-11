import { TFunction } from 'i18next';

export const getExcludeNotABugInfo = (t?: TFunction) => ({
  customStatusId: 7,
  customStatusName: 'not a bug',
  actionIdentifier: 'excludeNotABug',
  recapTitle: t ? t('__BUGS_EXCLUDED_NOT_A_BUG') : '',
});
