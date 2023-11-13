import { TFunction } from 'i18next';
import { BugCustomStatusPhase } from 'src/features/api';

export const getCustomStatusPhaseName = (
  phase: BugCustomStatusPhase,
  t: TFunction
) => {
  switch (phase.id) {
    case 1:
      return t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_PHASE_1_NAME');
    case 2:
      return t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_PHASE_2_NAME');
    default:
      return '';
  }
};
