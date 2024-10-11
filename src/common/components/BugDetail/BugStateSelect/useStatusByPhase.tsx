import { useGetCampaignsByCidCustomStatusesQuery } from 'src/features/api';

const useStatusByPhase = ({ campaignId }: { campaignId: string }) => {
  const {
    currentData: cpCustomStatus,
    isLoading,
    isError,
  } = useGetCampaignsByCidCustomStatusesQuery({
    cid: campaignId,
  });

  const customStatusesByPhase = cpCustomStatus?.reduce((acc, cs) => {
    const phase = acc.find((p) => p.id === cs.phase.id);
    if (phase) {
      phase.statuses.push({
        ...cs,
        color: `#${cs.color}`,
      });
    } else {
      acc.push({
        id: cs.phase.id,
        name: cs.phase.name,
        statuses: [
          {
            ...cs,
            color: `#${cs.color}`,
          },
        ],
      });
    }
    return acc;
  }, [] as { id: number; name: string; statuses: typeof cpCustomStatus }[]);

  return {
    data: customStatusesByPhase,
    isLoading,
    isError,
  };
};

export default useStatusByPhase;
