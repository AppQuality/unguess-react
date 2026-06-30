import { useGetCampaignWithWorkspaceQuery } from 'src/features/api/customEndpoints/getCampaignWithWorkspace';
import { useGetHubWithWorkspaceQuery } from 'src/features/api/customEndpoints/getHubWithWorkspace';

/**
 * Fetches the active entity (campaign or hub) together with its workspace and
 * exposes a unified loading/error state. This is the single place that knows
 * how entity data is loaded: if the hub+workspace fetching strategy changes,
 * only this hook needs to be updated.
 */
export const useEntityData = ({
  entityId,
  isHub,
  skip,
}: {
  entityId?: string;
  isHub: boolean;
  skip: boolean;
}) => {
  const {
    data: campaignData,
    isLoading: isCampaignLoading,
    isFetching: isCampaignFetching,
    isError: isCampaignError,
  } = useGetCampaignWithWorkspaceQuery(
    { cid: entityId ?? '0' },
    { skip: skip || isHub }
  );

  const {
    data: hubData,
    isLoading: isHubLoading,
    isFetching: isHubFetching,
    isError: isHubError,
  } = useGetHubWithWorkspaceQuery(
    { hid: entityId ?? '0' },
    { skip: skip || !isHub }
  );

  const campaign = campaignData?.campaign;
  const hub = hubData?.hub;
  const workspace = isHub ? hubData?.workspace : campaignData?.workspace;

  const isLoading = isHub
    ? isHubLoading || isHubFetching
    : isCampaignLoading || isCampaignFetching;
  const isError = isHub ? isHubError : isCampaignError;

  return { campaign, hub, workspace, isLoading, isError };
};
