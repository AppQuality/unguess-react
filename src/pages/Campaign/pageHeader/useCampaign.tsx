import {
  useGetCampaignsByCidQuery,
  useGetProjectsByPidQuery,
  useGetUsersMeQuery,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

export const useCampaign = (campaignId: number) => {
  const { isLoading: isUserLoading, isFetching: isUserFetching } =
    useGetUsersMeQuery();

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
    currentData: project,
  } = useGetProjectsByPidQuery({
    pid: campaign?.project.id.toString() ?? '0',
  });

  const projectRoute = useLocalizeRoute(
    `projects/${campaign?.project.id ?? 0}`
  );

  if (
    isCampaignLoading ||
    isProjectLoading ||
    isCampaignFetching ||
    isProjectFetching ||
    !campaign
  ) {
    return {
      isLoading: true as const,
    };
  }

  if (isCampaignError) {
    return {
      isError: true as const,
    };
  }

  return {
    isLoading: false as const,
    isError: false as const,
    isUserLoading: isUserLoading || isUserFetching,
    campaign,
    project: {
      ...(campaign && { ...campaign.project, hasAccess: false }),
      ...(project && {
        ...project,
        hasAccess: true,
        is_archive: campaign.isArchived,
      }),
      route: projectRoute,
    },
  };
};
