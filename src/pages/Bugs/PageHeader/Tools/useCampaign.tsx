import {
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidBugsQuery,
} from 'src/features/api';

export const useCampaign = (id: number) => {
  const {
    isLoading: isCampaignLoading,
    isFetching: isCampaignFetching,
    data: campaign,
  } = useGetCampaignsByCidQuery({
    cid: id?.toString() ?? '0',
  });
  const {
    isLoading: isCampaignBugsLoading,
    isFetching: isCampaignBugsFetching,
    data: bugs,
  } = useGetCampaignsByCidBugsQuery({
    cid: id?.toString() ?? '0',
  });

  if (
    isCampaignLoading ||
    isCampaignFetching ||
    isCampaignBugsLoading ||
    isCampaignBugsFetching ||
    !campaign
  ) {
    return { isLoading: true };
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
    isLoading: false,
    status: campaign.status,
    severities,
  };
};
