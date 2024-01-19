import {
  Bug,
  useGetCampaignsByCidUsersQuery,
  useGetProjectsByPidUsersQuery,
  useGetWorkspacesByWidUsersQuery,
} from 'src/features/api';

export type SuggestedUser = {
  id: number;
  name: string;
};

export const getMentionableUsers = async ({ query }: { query: string }) => {
  // const {
  //     isLoading: isLoadingCampaignUsers,
  //     isFetching: isFetchingCampaignUsers,
  //     data: campaignUsers,
  //     refetch: refetchCampaignUsers,
  //   } = useGetCampaignsByCidUsersQuery({
  //     cid: bug.campaign_id.toString(),
  //   });

  //   const {
  //     isLoading: isLoadingProjectUsers,
  //     isFetching: isFetchingProjectUsers,
  //     data: projectUsers,
  //     refetch: refetchProjectUsers,
  //   } = useGetProjectsByPidUsersQuery({
  //     pid: bug.projectId?.toString() || '0',
  //   });

  //   const {
  //     isLoading: isLoadingWorkspaceUsers,
  //     isFetching: isFetchingWorkspaceUsers,
  //     data: workspaceUsers,
  //     refetch: refetchWorkspaceUsers,
  //     error: workspaceUsersError,
  //   } = useGetWorkspacesByWidUsersQuery({
  //     wid: activeWorkspace?.id.toString() || '0',
  //   });

  console.log('getMentionableUsers', query);

  return [
    {
      id: 1,
      name: 'John Doe',
    },
    {
      id: 2,
      name: 'Jane Doe',
    },
  ].filter((item) => {
    if (!query) return item;
    return item.name.toLowerCase().startsWith(query.toLowerCase());
  });
};
