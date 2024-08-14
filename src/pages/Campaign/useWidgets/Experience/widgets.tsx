import { useTranslation } from 'react-i18next';
import { useGetCampaignsByCidQuery } from 'src/features/api';
import { useAppDispatch } from 'src/app/hooks';
import { useEffect } from 'react';
import { selectUxCampaign } from 'src/features/uxFilters';
import { Insights } from './widgets/Insights';
import { CampaignInfo } from './widgets/General';
import { Overview } from './widgets/Overview';
import { useUxData } from './useUxData';

export const widgets = ({
  campaignId,
  isPreview,
}: {
  campaignId: number;
  isPreview?: boolean;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // TODO: create hook for this with selectCampaign dispatch
  const { data: campaign } = useGetCampaignsByCidQuery({
    cid: campaignId.toString(),
  });

  const { data: { cid, filters, uxData } = {} } = useUxData({
    campaignId,
    isPreview,
  });

  useEffect(() => {
    if (filters && cid) {
      dispatch(
        selectUxCampaign({
          campaignId: cid,
          filters,
        })
      );
    }
  }, [filters, cid]);

  if (!campaign || !uxData) return [];

  const widgetsToShow = [];
  if (uxData?.methodology)
    widgetsToShow.push({
      id: 'exp-campaign-methodology',
      title: t('__CAMPAIGN_PAGE_NAVIGATION_MEDIA_ITEM_METHODOLOGY_LABEL'),
      content: (
        <CampaignInfo
          id="exp-campaign-methodology"
          campaign={campaign}
          isPreview={isPreview}
        />
      ),
      type: 'item' as const,
    });

  if (
    (uxData.findings && uxData.findings.length > 0) ||
    (uxData.sentiment && uxData.sentiment.length > 0)
  ) {
    widgetsToShow.push({
      title: t('__CAMPAIGN_PAGE_NAVIGATION_MEDIA_GROUP_INSIGHTS_LABEL'),
      type: 'title' as const,
    });
  }

  if (uxData?.sentiment && uxData.sentiment.length > 0) {
    widgetsToShow.push({
      id: 'exp-campaign-overview',
      title: t('__CAMPAIGN_PAGE_NAVIGATION_MEDIA_ITEM_OVERVIEW_LABEL'),
      content: (
        <Overview
          id="exp-campaign-overview"
          campaign={campaign}
          isPreview={isPreview}
        />
      ),
      type: 'item' as const,
    });
  }

  if (uxData.findings && uxData.findings.length > 0) {
    widgetsToShow.push({
      id: 'exp-campaign-insights',
      title: t('__CAMPAIGN_PAGE_NAVIGATION_MEDIA_ITEM_INSIGHTS_LABEL'),
      content: (
        <Insights
          id="exp-campaign-insights"
          campaign={campaign}
          isPreview={isPreview}
        />
      ),
      type: 'item' as const,
    });
  }

  return widgetsToShow;
};
