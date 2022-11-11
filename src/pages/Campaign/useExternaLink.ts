import { Campaign } from 'src/features/api';
import {
  getLocalizedCustomerDashboardUrl,
  getLocalizedUXDashboardUrl,
} from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';

export function useExternalLink(aCampaign?: Campaign): string | undefined {
  if (!aCampaign) return undefined;
  if (aCampaign.type.name === 'functional')
    return getLocalizedCustomerDashboardUrl(aCampaign.id, i18n.language);
  if (aCampaign.type.name === 'exp')
    return getLocalizedUXDashboardUrl(aCampaign.id, i18n.language);
  return undefined;
}
