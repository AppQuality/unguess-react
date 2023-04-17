import { TFunction } from 'i18next';
import { DEFAULT_NOT_A_BUG_CUSTOM_STATUS } from 'src/constants';

export const getExcludeNotABugInfo = (t: TFunction) => ({
  customStatusId: DEFAULT_NOT_A_BUG_CUSTOM_STATUS.id,
  customStatusName: DEFAULT_NOT_A_BUG_CUSTOM_STATUS.name,
  actionIdentifier: 'excludeNotABug',
  recapTitle: t('__BUGS_EXCLUDED_NOT_A_BUG'),
  drawerTitle: t('__BUGS_EXCLUDE_NOT_A_BUG'),
});
