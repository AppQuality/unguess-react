import { useTranslation } from 'react-i18next';
import { useGetCampaignsByCidQuery } from 'src/features/api';
import { getLocalizedUXDashboardUrl } from 'src/hooks/useLocalizeDashboardUrl';
import { ExternalLink } from '../../ExternalLink';

export const widgets = ({ campaignId }: { campaignId: number }) => {
  const { t, i18n } = useTranslation();
  const { data: campaign } = useGetCampaignsByCidQuery({
    cid: campaignId.toString(),
  });

  const showExperience = !!campaign?.outputs?.includes('media');

  if (!showExperience || !campaign) return [];

  return [
    {
      content: (
        <ExternalLink
          id="anchor-media-list-navigation"
          url={getLocalizedUXDashboardUrl(campaignId, i18n.language)}
        >
          {t('__CAMPAIGN_PAGE_NAVIGATION_MEDIA_EXTERNAL_LINK_LABEL')}
        </ExternalLink>
      ),
      type: 'footer' as const,
    },
  ];
};
