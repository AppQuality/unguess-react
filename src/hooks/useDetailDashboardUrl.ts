import i18n from 'src/i18n';
import { Campaign } from 'src/features/api';
import { getLocalizedFunctionalDashboardUrl } from './useLocalizeDashboardUrl';

export function getDashboardDetailUrl(campaign: Campaign): string {
  const { id, family } = campaign;
  switch (family.name.toLocaleLowerCase()) {
    case 'functional':
      return getLocalizedFunctionalDashboardUrl(id, i18n.language);
    default:
      return '';
  }
}
