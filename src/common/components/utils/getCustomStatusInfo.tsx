import { TFunction } from 'react-i18next';

type CustomStatusInfo = {
  text: string;
};

export const getCustomStatusInfo = (
  CustomStatus: BugState,
  t: TFunction
): CustomStatusInfo => {
  switch (CustomStatus.toLowerCase()) {
    case 'not a bug':
      return {
        text: t('__BUG_CUSTOM_STATUS_NOT_A_BUG'),
      };
    case 'solved':
      return {
        text: t('__BUG_CUSTOM_STATUS_SOLVED'),
      };
    case 'to be retested':
      return {
        text: t('__BUG_CUSTOM_STATUS_TO_BE_REGISTERED'),
      };
    case 'open':
      return {
        text: t('__BUG_CUSTOM_STATUS_OPEN'),
      };
    case 'to be imported':
      return {
        text: t('__BUG_CUSTOM_STATUS_TO_BE_IMPORTED'),
      };
    case 'pending':
      return {
        text: t('__BUG_CUSTOM_STATUS_PENDING'),
      };
    case 'to do':
      return {
        text: t('__BUG_CUSTOM_STATUS_TO_DO'),
      };
    default:
      return {
        text: CustomStatus,
      };
  }
};
