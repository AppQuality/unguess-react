import { useEffect, useState } from 'react';
import {
  Output,
  useGetCampaignsByCidBugTypesQuery,
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidSeveritiesQuery,
  useGetCampaignsByCidTagsQuery,
  useGetCampaignsByCidUsecasesQuery,
} from 'src/features/api';
import { TypeFilterType } from 'src/features/bugsPage/typeFilter';
import { SeverityFilterType } from 'src/features/bugsPage/severityFilter';
import { TagFilterType } from 'src/features/bugsPage/tagFilter';
import { UseCaseFilterType } from 'src/features/bugsPage/useCaseFilter';

export const useCampaign = (cid: number) => {
  const [campaignData, setCampaignData] = useState<{
    cp_id: number;
    filters: {
      types?: TypeFilterType['types']['available'];
      severities?: SeverityFilterType['severities']['available'];
      tags?: TagFilterType['tags']['available'];
      useCases?: UseCaseFilterType['useCases']['available'];
      // TODO: add new filter
    };
    outputs?: Output[];
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

  const { data: campaignTags } = useGetCampaignsByCidTagsQuery({
    cid: cid.toString(),
  });

  const { data: campaignUseCases } = useGetCampaignsByCidUsecasesQuery({
    cid: cid.toString(),
  });

  useEffect(() => {
    if (campaign) {
      setCampaignData({
        cp_id: campaign.id,
        filters: {
          types: campaignTypes,
          severities: campaignSeverities,
          tags: campaignTags,
          useCases: campaignUseCases,
          // TODO: add new filter
        },
        outputs: campaign.outputs,
      });
    }
  }, [
    campaign,
    campaignTypes,
    campaignSeverities,
    campaignTags,
    campaignUseCases,
    // TODO: add new filter
  ]);

  return {
    isLoading: isLoadingCampaign || isFetchingCampaign,
    isError: isErrorCampaign,
    campaign: campaignData,
  };
};
