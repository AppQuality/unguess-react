import { useAppSelector } from 'src/app/hooks';
import {
  useGetCampaignsByCidQuery,
  useGetProjectsByPidQuery,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

export const useCampaign = (campaignId: number) => {
  const { status: userStatus } = useAppSelector((state) => state.user);

  const {
    isLoading: isCampaignLoading,
    isFetching: isCampaignFetching,
    isError: isCampaignError,
    data: campaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId?.toString() ?? '0',
  });

  const {
    isLoading: isProjectLoading,
    isFetching: isProjectFetching,
    isError: isProjectError,
    data: project,
  } = useGetProjectsByPidQuery({
    pid: campaign?.project.id ?? 0,
  });

  const projectRoute = useLocalizeRoute(
    `projects/${campaign?.project.id ?? 0}`
  );

  if (
    isCampaignLoading ||
    isProjectLoading ||
    isCampaignFetching ||
    isProjectFetching ||
    !project ||
    !campaign
  ) {
    return {
      isLoading: true as const,
    };
  }

  if (isCampaignError || isProjectError) {
    return {
      isError: true as const,
    };
  }

  return {
    isLoading: false as const,
    isError: false as const,
    isUserLoading: userStatus === 'idle' || userStatus === 'loading',
    campaign,
    project: {
      ...project,
      route: projectRoute,
    },
  };
};
