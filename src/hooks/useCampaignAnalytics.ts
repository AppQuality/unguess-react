import { useEffect } from 'react';
import { usePostAnalyticsViewsCampaignsByCidMutation } from 'src/features/api';

export const useCampaignAnalytics = (campaignId?: string) => {
  const [postAnalytics] = usePostAnalyticsViewsCampaignsByCidMutation();

  useEffect(() => {
    if (campaignId) {
      postAnalytics({
        cid: campaignId,
      });
    }
  }, [campaignId]);
};
