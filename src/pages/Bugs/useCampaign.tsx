import { useEffect, useState } from 'react';
import {
  Output,
  useGetCampaignsByCidBugTypesQuery,
  useGetCampaignsByCidCustomStatusesQuery,
  useGetCampaignsByCidDevicesQuery,
  useGetCampaignsByCidOsQuery,
  useGetCampaignsByCidPrioritiesQuery,
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidReplicabilitiesQuery,
  useGetCampaignsByCidSeveritiesQuery,
  useGetCampaignsByCidTagsQuery,
  useGetCampaignsByCidUsecasesQuery,
} from 'src/features/api';
import { TypeFilterType } from 'src/features/bugsPage/typeFilter';
import { SeverityFilterType } from 'src/features/bugsPage/severityFilter';
import { TagFilterType } from 'src/features/bugsPage/tagFilter';
import { UseCaseFilterType } from 'src/features/bugsPage/useCaseFilter';
import { DeviceFilterType } from 'src/features/bugsPage/deviceFilter';
import { OsFilterType } from 'src/features/bugsPage/osFilter';
import { ReplicabilityFilterType } from 'src/features/bugsPage/replicabilityFilter';
import { PriorityFilterType } from 'src/features/bugsPage/priorityFilter';
import { CustomStatusFilterType } from 'src/features/bugsPage/customStatusFilter';

export const useCampaign = (cid: number) => {
  const [campaignData, setCampaignData] = useState<{
    cp_id: number;
    filters: {
      types?: TypeFilterType['types']['available'];
      severities?: SeverityFilterType['severities']['available'];
      priorities?: PriorityFilterType['priorities']['available'];
      customStatuses?: CustomStatusFilterType['customStatuses']['available'];
      tags?: TagFilterType['tags']['available'];
      useCases?: UseCaseFilterType['useCases']['available'];
      devices?: DeviceFilterType['devices']['available'];
      os?: OsFilterType['os']['available'];
      replicabilities?: ReplicabilityFilterType['replicabilities']['available'];
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

  const { data: campaignPriorities } = useGetCampaignsByCidPrioritiesQuery({
    cid: cid.toString(),
  });

  const { data: campaignCustomStatuses } = useGetCampaignsByCidCustomStatusesQuery({
    cid: cid.toString(),
  });

  const { data: campaignTags } = useGetCampaignsByCidTagsQuery({
    cid: cid.toString(),
  });

  const { data: campaignUseCases } = useGetCampaignsByCidUsecasesQuery({
    cid: cid.toString(),
  });

  const { data: campaignDevices } = useGetCampaignsByCidDevicesQuery({
    cid: cid.toString(),
  });

  const { data: campaignOs } = useGetCampaignsByCidOsQuery({
    cid: cid.toString(),
  });

  const { data: campaignReplicabilities } =
    useGetCampaignsByCidReplicabilitiesQuery({
      cid: cid.toString(),
    });

  useEffect(() => {
    if (campaign) {
      setCampaignData({
        cp_id: campaign.id,
        filters: {
          types: campaignTypes,
          severities: campaignSeverities,
          priorities: campaignPriorities,
          customStatuses: campaignCustomStatuses,
          tags: campaignTags,
          useCases: campaignUseCases,
          devices: campaignDevices,
          os: campaignOs,
          replicabilities: campaignReplicabilities,
        },
        outputs: campaign.outputs,
      });
    }
  }, [
    campaign,
    campaignTypes,
    campaignSeverities,
    campaignPriorities,
    campaignCustomStatuses,
    campaignTags,
    campaignUseCases,
    campaignDevices,
    campaignOs,
    campaignReplicabilities,
  ]);

  return {
    isLoading: isLoadingCampaign || isFetchingCampaign,
    isError: isErrorCampaign,
    campaign: campaignData,
  };
};
