import {
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidBugsQuery,
} from 'src/features/api';

export const useCampaignBugs = (id: number) => {
  const {
    isLoading: isCampaignLoading,
    isFetching: isCampaignFetching,
    isError: isErrorCampaign,
    data: campaign,
  } = useGetCampaignsByCidQuery({
    cid: id?.toString() ?? '0',
  });

  const {
    isLoading: isCampaignBugsLoading,
    isFetching: isCampaignBugsFetching,
    isError: isErrorCampaignBugs,
    data: bugs,
  } = useGetCampaignsByCidBugsQuery({
    cid: id?.toString() ?? '0',
    filterBy: {
      is_duplicated: '0',
    },
  });

  if (!campaign || isCampaignLoading || isCampaignBugsLoading) {
    return {
      isCampaignLoading: true,
      isCampaignFetching: true,
      isCampaignBugsLoading: true,
      isCampaignBugsFetching: true,
      isCampaignError: isErrorCampaign,
      isCampaignBugsError: isErrorCampaignBugs,
    };
  }

  const severities: Record<Severities, number> = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  };

  if (bugs && bugs.items) {
    bugs.items.forEach((bug) => {
      if (bug.severity?.name) {
        const severity = bug.severity.name.toLowerCase() as Severities;
        if (!severities[severity as Severities]) {
          severities[severity as Severities] = 0;
        }
        severities[severity as Severities] += 1;
      }
    });
  }

  return {
    isCampaignLoading,
    isCampaignFetching,
    isCampaignBugsLoading,
    isCampaignBugsFetching,
    isCampaignError: isErrorCampaign,
    isCampaignBugsError: isErrorCampaignBugs,
    status: campaign.status,
    severities,
  };
};
