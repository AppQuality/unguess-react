import { useGetProjectsByPidQuery } from 'src/features/api';
import { useArchivedCampaigns } from '../campaigns-list/useArchivedCampaigns';
import { useCampaignsGroupedByProject } from '../campaigns-list/useCampaignsGroupedByProject';

export const useSelectCampaigns = (project_id?: number) => {
  const { data, isLoading, isFetching, isError } = useGetProjectsByPidQuery(
    {
      pid: project_id?.toString() || '',
    },
    { skip: !project_id }
  );
  const campaignGroupedByProject = useCampaignsGroupedByProject();
  const archivedCampaigns = useArchivedCampaigns();

  if (!project_id) {
    return campaignGroupedByProject;
  }

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
    return campaignGroupedByProject;
  }

  return archivedCampaigns;
};
