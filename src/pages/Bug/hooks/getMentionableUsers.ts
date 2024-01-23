import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
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

export const useGetMentionableUsers = () => {
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const { campaignId } = useParams();
  const { data: workspaceUsers, isLoading: isLoadingWorkspaceUsers } =
    useGetWorkspacesByWidUsersQuery({
      wid: activeWorkspace?.id.toString() || '0',
    });
  const { data: campaignUsers, isLoading: isLoadingCampaignUsers } =
    useGetCampaignsByCidUsersQuery({ cid: campaignId || '0' });

  const users = [
    ...(campaignUsers?.items || []),
    ...(workspaceUsers?.items || []),
  ];
  if (!users) return [];

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));
};
