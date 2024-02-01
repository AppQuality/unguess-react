import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import {
  Tenant,
  useGetCampaignsByCidUsersQuery,
  useGetProjectsByPidUsersQuery,
  useGetWorkspacesByWidUsersQuery,
} from 'src/features/api';
import { useGetCampaignWithWorkspaceQuery } from 'src/features/api/customEndpoints/getCampaignWithWorkspace';

export type SuggestedUser = {
  id: number;
  name: string;
};

export const useGetMentionableUsers = () => {
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const { campaignId } = useParams();
  const { data: { campaign } = {} } = useGetCampaignWithWorkspaceQuery({
    cid: campaignId || '0',
  });

  const {
    data: workspaceUsers,
    isLoading: isLoadingWorkspaceUsers,
    isFetching: isFetchingWorkspaceUsers,
  } = useGetWorkspacesByWidUsersQuery({
    wid: activeWorkspace?.id.toString() || '0',
  });

  const {
    data: campaignUsers,
    isLoading: isLoadingCampaignUsers,
    isFetching: isFetchingCampaignUsers,
  } = useGetCampaignsByCidUsersQuery({ cid: campaignId || '0' });

  const {
    data: projectUsers,
    isLoading: isLoadingProjectUsers,
    isFetching: isFetchingProjectUsers,
  } = useGetProjectsByPidUsersQuery({
    pid: campaign?.project.id.toString() || '0',
  });

  const isLoading =
    isLoadingWorkspaceUsers || isLoadingCampaignUsers || isLoadingProjectUsers;

  const isFetching =
    isFetchingWorkspaceUsers ||
    isFetchingCampaignUsers ||
    isFetchingProjectUsers;

  if (isLoading || isFetching)
    return { isLoading, isFetching, isError: false, items: [] };

  // Combine all users and filter out pendingInvitation users
  const allUsers = [
    ...(campaignUsers?.items || []),
    ...(workspaceUsers?.items || []),
    ...(projectUsers?.items || []),
  ].filter((user) => !user.invitationPending);

  if (!allUsers.length)
    return {
      isLoading: false,
      isFetching: false,
      items: [],
    };

  // Remove duplicated ids
  const users = allUsers.reduce((acc: Tenant[], user) => {
    if (!acc.find((u) => u.profile_id === user.profile_id)) {
      acc.push(user);
    }
    return acc;
  }, []);

  return {
    isLoading,
    isFetching,
    items: users.map((user) => ({
      id: user.profile_id,
      name: user.name,
      email: user.email,
    })),
  };
};
