import { useEffect, useState } from 'react';
import {
  useGetCampaignsByCidBugTypesQuery,
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidSeveritiesQuery,
} from 'src/features/api';
import { TypeFilterType } from 'src/features/bugsPage/typeFilters';
import { SeverityFilterType } from 'src/features/bugsPage/severityFilter';

export const useCampaign = (cid: number) => {
  const [campaignData, setCampaignData] = useState<{
    cp_id: number;
    filters: {
      types?: TypeFilterType['types']['available'];
      severities?: SeverityFilterType['severities']['available'];
    };
  }>();
  const {
    isLoading: isLoadingCampaign,
    isFetching: isFetchingCampaign,
    isError: isErrorCampaign,
    data: campaign,
  } = useGetCampaignsByCidQuery({
    cid: cid.toString(),
  });

  const { data: campaignTypes } = useGetCampaignsByCidBugTypesQuery({
    cid: cid.toString(),
  });
  const { data: campaignSeverities } = useGetCampaignsByCidSeveritiesQuery({
    cid: cid.toString(),
  });

  useEffect(() => {
    if (campaign) {
      setCampaignData({
        cp_id: campaign.id,
        filters: {
          types: campaignTypes,
          severities: campaignSeverities,
        },
      });
    }
  }, [campaign, campaignTypes, campaignSeverities]);

  return {
    isLoading: isLoadingCampaign || isFetchingCampaign,
    isError: isErrorCampaign,
    campaign: campaignData,
  };
};
