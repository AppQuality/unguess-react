import { useTranslation } from 'react-i18next';
import { useGetCampaignsByCidQuery } from 'src/features/api';
import { Insights } from './widgets/Insights';

export const widgets = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();
  const { data: campaign } = useGetCampaignsByCidQuery({
    cid: campaignId.toString(),
  });

  const showExperience = !!campaign?.outputs?.includes('media');

  if (!showExperience || !campaign) return [];

  return [
    {
      title: t('__CAMPAIGN_PAGE_NAVIGATION_MEDIA_GROUP_INSIGHTS_LABEL'),
      type: 'title' as const,
    },
    {
      id: 'campaign-insights',
      title: t('__CAMPAIGN_PAGE_NAVIGATION_MEDIA_ITEM_INSIGHTS_LABEL'),
      content: <Insights id="campaign-insights" campaign={campaign} />,
      type: 'item' as const,
    },
  ];
};
