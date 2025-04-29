import { useTranslation } from 'react-i18next';
import { useGetCampaignsByCidQuery } from 'src/features/api';
import {
  getLocalizedFunctionalDashboardUrl,
  getLocalizedPlanUrl,
} from 'src/hooks/useLocalizeDashboardUrl';
import { ExternalLink } from '../../ExternalLink';
import { CampaignOverview } from './CampaignOverview';
import { DevicesAndTypes } from './DevicesAndTypes';
import { UniqueBugsSection } from './UniqueBugsSection';

export const widgets = ({ campaignId }: { campaignId: number }) => {
  const { t, i18n } = useTranslation();
  const { data: campaign } = useGetCampaignsByCidQuery({
    cid: campaignId.toString(),
  });

  const showFunctional = !!campaign?.outputs?.includes('bugs');

  if (!showFunctional || !campaign) return [];

  // TODO: Check if widgets contain data before returning navigation items (Check Experience/widgets.tsx for example)
  return [
    {
      id: 'campaign-overview',
      content: <CampaignOverview id="campaign-overview" campaign={campaign} />,
      title: t('__CAMPAIGN_PAGE_NAVIGATION_BUG_ITEM_OVERVIEW_LABEL'),
      type: 'item' as const,
    },
    {
      title: t('__CAMPAIGN_PAGE_NAVIGATION_BUG_GROUP_DETAILS_LABEL'),
      type: 'title' as const,
    },
    {
      id: 'unique-bug-distribution',
      content: (
        <UniqueBugsSection id="unique-bug-distribution" campaign={campaign} />
      ),
      title: t('__CAMPAIGN_PAGE_NAVIGATION_BUG_ITEM_DETAILS_UNIQUE_BUGS_LABEL'),
      type: 'item' as const,
    },
    {
      id: 'devices-and-types',
      content: <DevicesAndTypes id="devices-and-types" campaign={campaign} />,
      type: 'item' as const,
      title: t('__CAMPAIGN_PAGE_NAVIGATION_BUG_ITEM_DETAILS_DEVICES_LABEL'),
    },
    {
      content: (
        <>
          {campaign.plan && (
            <ExternalLink
              id="anchor-plan-navigation"
              url={getLocalizedPlanUrl(campaign.plan, i18n.language)}
            >
              {t('__CAMPAIGN_PAGE_NAVIGATION_PLAN_EXTERNAL_LINK_LABEL')}
            </ExternalLink>
          )}
          <ExternalLink
            id="anchor-bugs-list-navigation"
            url={getLocalizedFunctionalDashboardUrl(
              campaign.id ?? 0,
              i18n.language
            )}
          >
            {t('__CAMPAIGN_PAGE_NAVIGATION_BUG_EXTERNAL_LINK_LABEL')}
          </ExternalLink>
        </>
      ),
      type: 'footer' as const,
    },
  ];
};
