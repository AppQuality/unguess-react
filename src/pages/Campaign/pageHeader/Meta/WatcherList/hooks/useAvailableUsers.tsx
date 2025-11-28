import {
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidUsersQuery,
  useGetProjectsByPidUsersQuery,
  useGetWorkspacesByWidUsersQuery,
} from 'src/features/api';

export const useAvailableUsers = ({ campaignId }: { campaignId: string }) => {
  const { data, isLoading } = useGetCampaignsByCidQuery({ cid: campaignId });

  if (isLoading || !data) return { data: [], isLoading };

  const { project, workspace } = data;
  const { id: workspaceId } = workspace;
  const { id: projectId } = project;

  const { data: campaignUsers, isLoading: isLoadingCampaignUsers } =
    useGetCampaignsByCidUsersQuery(
      {
        cid: campaignId,
      },
      {
        skip: !campaignId,
      }
    );

  const { data: workspaceUsers, isLoading: isLoadingWorkspaceUsers } =
    useGetWorkspacesByWidUsersQuery(
      {
        wid: workspaceId.toString(),
      },
      {
        skip: !workspaceId,
      }
    );

  const { data: projectUsers, isLoading: isLoadingProjectUsers } =
    useGetProjectsByPidUsersQuery(
      {
        pid: projectId.toString(),
      },
      {
        skip: !projectId,
      }
    );

  if (
    isLoadingCampaignUsers ||
    isLoadingWorkspaceUsers ||
    isLoadingProjectUsers
  ) {
    return { data: [], isLoading: true };
  }

  const combinedUsers = [
    ...(campaignUsers?.items || []),
    ...(workspaceUsers?.items || []),
    ...(projectUsers?.items || []),
  ].filter((user) => !user.invitationPending);

  // Remove duplicates
  const uniqueUsers = Array.from(
    new Map(combinedUsers.map((user) => [user.profile_id, user])).values()
  );

  return { data: uniqueUsers, isLoading: false };
};
