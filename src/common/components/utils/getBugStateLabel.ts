/* eslint-disable security/detect-object-injection */
import { TFunction } from 'react-i18next';

export const getBugStateLabel = (state: BugState, t: TFunction): string => {
  switch (state.toLowerCase()) {
    case 'to do':
      return t('__BUG_STATE_TO_DO');
    case 'pending':
      return t('__BUG_STATE_PENDING');
    case 'to be imported':
      return t('__BUG_STATE_TO_BE_IMPORTED');
    case 'open':
      return t('__BUG_STATE_OPEN');
    case 'to be retested':
      return t('__BUG_STATE_TO_BE_RETESTED');
    case 'solved':
      return t('__BUG_STATE_SOLVED');
    case 'not a bug':
      return t('__BUG_STATE_NOT_A_BUG');
    default:
      return t('__BUG_STATE_TO_DO');
  }
};
