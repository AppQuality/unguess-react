export const useCampaignBugStates = (campaignId: number) => {
  const { data, error, isFetching } = useGetCampaignsByCidStatesQuery({
    cid: campaignId.toString() ?? '0',
  });

  return {
    bugStates: data || [],
    bugStatesError: error,
    bugStatesFetching: isFetching,
  };
};
