import { useGetProjectsByPidQuery } from 'src/features/api';
import { useCampaignsGroupedByProject } from '../campaigns-list/useCampaignsGroupedByProject';
import { useArchivedCampaigns } from '../campaigns-list/useArchivedCampaigns';

export const useSelectCampaigns = (project_id?: number) => {
  const { data, isLoading, isFetching, isError } = useGetProjectsByPidQuery(
    {
      pid: project_id?.toString() || '',
    },
    { skip: !project_id }
  );

  if (!data || isLoading || isFetching || isError) {
    return {
      campaigns: [],
      isLoading,
      isFetching,
      isError,
      count: 0,
    };
  }
  if (!data.is_archive) {
    return useCampaignsGroupedByProject();
  }

  return useArchivedCampaigns();
};
