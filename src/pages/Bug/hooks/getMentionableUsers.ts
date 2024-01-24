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
    isLoadingWorkspaceUsers ||
    isLoadingCampaignUsers ||
    isLoadingProjectUsers ||
    isFetchingWorkspaceUsers ||
    isFetchingCampaignUsers ||
    isFetchingProjectUsers;

  if (isLoading) return { isLoading, items: [] };

  const allUsers = [
    ...(campaignUsers?.items || []),
    ...(workspaceUsers?.items || []),
    ...(projectUsers?.items || []),
  ];

  if (!allUsers) return { isLoading, items: [] };

  const users = allUsers.reduce((acc: Tenant[], user) => {
    if (!acc.find((u) => u.id === user.id)) {
      acc.push(user);
    }
    return acc;
  }, []);

  return {
    isLoading,
    items: users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    })),
  };
};
