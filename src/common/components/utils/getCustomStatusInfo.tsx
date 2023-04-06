import { TFunction } from 'react-i18next';

type CustomStatusInfo = {
	text: string;
};

export const getCustomStatusInfo = (
	CustomStatus: CustomStatus,
	t: TFunction
): CustomStatusInfo => {
	switch (CustomStatus.toLowerCase().replace(/\s+/g, '_')) {

		case 'not_a_bug':
			return {
				text: t('__BUG_CUSTOM_STATUS_NOT_A_BUG'),
			};
		case 'solved':
			return {
				text: t('__BUG_CUSTOM_STATUS_SOLVED'),
			};
		case 'to_be_retested':
			return {
				text: t('__BUG_CUSTOM_STATUS_TO_BE_REGISTERED'),
			};
		case 'open':
			return {
				text: t('__BUG_CUSTOM_STATUS_OPEN'),
			};
		case 'to_be_imported':
			return {
				text: t('__BUG_CUSTOM_STATUS_TO_BE_IMPORTED'),
			};
		case 'pending':
			return {
				text: t('__BUG_CUSTOM_STATUS_PENDING'),
			};
		case 'to_do':
			return {
				text: t('__BUG_CUSTOM_STATUS_TO_DO'),
			};
		default:
			return {
				text: t('__BUG_CUSTOM_STATUS_TO_DO'),
			};
	}
};
