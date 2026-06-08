import {
  useGetCampaignsByCidQuery,
  useGetHubsByHidQuery,
  useGetProjectsByPidQuery,
  useGetUsersMeQuery,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

export const useCampaign = (campaignId: number) => {
  const { isLoading: isUserLoading, isFetching: isUserFetching } =
    useGetUsersMeQuery();

  const {
    isLoading: isCampaignLoading,
    isError: isCampaignError,
    data: campaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId?.toString() ?? '0',
  });

  const { isLoading: isProjectLoading, currentData: project } =
    useGetProjectsByPidQuery({
      pid: campaign?.project.id.toString() ?? '0',
    });

  const projectRoute = useLocalizeRoute(
    `projects/${campaign?.project.id ?? 0}`
  );

  if (isCampaignLoading || isProjectLoading || !campaign) {
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

/**
 * Hook that supports both campaigns and hubs
 * Use this when you need to support both entity types
 */
export const useCampaignOrHub = (entityId: string, isHub: boolean) => {
  const { isLoading: isUserLoading, isFetching: isUserFetching } =
    useGetUsersMeQuery();

  // Query for campaign
  const {
    isLoading: isCampaignLoading,
    isError: isCampaignError,
    data: campaign,
  } = useGetCampaignsByCidQuery(
    {
      cid: entityId,
    },
    {
      skip: isHub,
    }
  );

  // Query for hub
  const {
    isLoading: isHubLoading,
    isError: isHubError,
    data: hub,
  } = useGetHubsByHidQuery(
    {
      hid: entityId,
    },
    {
      skip: !isHub,
    }
  );

  // Use campaign or hub data based on isHub flag
  const entity = isHub ? hub : campaign;
  const entityLoading = isHub ? isHubLoading : isCampaignLoading;
  const entityError = isHub ? isHubError : isCampaignError;

  // Query for project (both campaigns and hubs have project)
  const { isLoading: isProjectLoading, currentData: project } =
    useGetProjectsByPidQuery(
      {
        pid: entity?.project.id.toString() ?? '0',
      },
      {
        skip: !entity,
      }
    );

  const projectRoute = useLocalizeRoute(`projects/${entity?.project.id ?? 0}`);

  if (entityLoading || isProjectLoading || !entity) {
    return {
      isLoading: true as const,
    };
  }

  if (entityError) {
    return {
      isError: true as const,
    };
  }

  // Map hub data to campaign-like structure for compatibility
  const normalizedCampaign = isHub
    ? {
        id: hub!.id,
        customer_title: hub!.title,
        description: hub!.description,
        project: hub!.project,
        workspace: hub!.workspace,
        isArchived: false, // Hubs don't have archive status
      }
    : campaign;

  return {
    isLoading: false as const,
    isError: false as const,
    isUserLoading: isUserLoading || isUserFetching,
    campaign: normalizedCampaign,
    project: {
      ...(entity && { ...entity.project, hasAccess: false }),
      ...(project && {
        ...project,
        hasAccess: true,
        is_archive: isHub ? false : campaign?.isArchived,
      }),
      route: projectRoute,
    },
  };
};
