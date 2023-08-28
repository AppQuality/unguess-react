import { useTranslation } from 'react-i18next';
import {
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidUxQuery,
} from 'src/features/api';

import { Insights } from './widgets/Insights';
import { CampaignInfo } from './widgets/General';

export const widgets = ({
  campaignId,
  isPreview,
}: {
  campaignId: number;
  isPreview?: boolean;
}) => {
  const { t } = useTranslation();
  const { data: campaign } = useGetCampaignsByCidQuery({
    cid: campaignId.toString(),
  });

  const { data: uxData } = useGetCampaignsByCidUxQuery({
    cid: campaignId.toString(),
    ...(!isPreview && { showAsCustomer: true }),
  });

  const showExperience = !!campaign?.outputs?.includes('media');

  if (!showExperience || !campaign) return [];

  const widgetsToShow = [];

  if (uxData && uxData.findings && uxData.findings.length > 0)
    widgetsToShow.push(
      {
        id: 'campaign-methodology',
        title: t('__CAMPAIGN_PAGE_NAVIGATION_MEDIA_ITEM_METHODOLOGY_LABEL'),
        content: (
          <CampaignInfo
            id="campaign-methodology"
            campaign={campaign}
            isPreview={isPreview}
          />
        ),
        type: 'item' as const,
      },
      {
        title: t('__CAMPAIGN_PAGE_NAVIGATION_MEDIA_GROUP_INSIGHTS_LABEL'),
        type: 'title' as const,
      },
      {
        id: 'campaign-insights',
        title: t('__CAMPAIGN_PAGE_NAVIGATION_MEDIA_ITEM_INSIGHTS_LABEL'),
        content: (
          <Insights
            id="campaign-insights"
            campaign={campaign}
            isPreview={isPreview}
          />
        ),
        type: 'item' as const,
      }
    );

  return widgetsToShow;
};
