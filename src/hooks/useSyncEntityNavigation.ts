import { useEffect } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import type {
  GetCampaignsByCidApiResponse,
  GetHubsByHidApiResponse,
  GetWorkspacesByWidApiResponse,
} from 'src/features/api';
import {
  setCampaignId,
  setHubId,
  setIsHub,
  setPermissionSettingsTitle,
  setWorkspace,
} from 'src/features/navigation/navigationSlice';
import { useCampaignAnalytics } from 'src/hooks/useCampaignAnalytics';

/**
 * Syncs the resolved entity (campaign or hub) and its workspace into the
 * navigation slice, and marks the campaign as read once. These are pure
 * side-effects: the caller owns data fetching and passes the already-resolved
 * entities, so the hook is independent of how they are loaded.
 */
export const useSyncEntityNavigation = ({
  isHub,
  campaign,
  hub,
  workspace,
  analyticsCampaignId,
}: {
  isHub: boolean;
  campaign?: GetCampaignsByCidApiResponse;
  hub?: GetHubsByHidApiResponse;
  workspace?: GetWorkspacesByWidApiResponse;
  analyticsCampaignId?: string;
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (workspace) {
      dispatch(setWorkspace(workspace));
    }
  }, [workspace, dispatch]);

  useEffect(() => {
    if (isHub && hub) {
      dispatch(setPermissionSettingsTitle(hub.customer_title ?? hub.title));
      dispatch(setHubId(hub.id));
      dispatch(setIsHub(true));
      return () => {
        dispatch(setPermissionSettingsTitle(undefined));
        dispatch(setCampaignId(undefined));
        dispatch(setHubId(undefined));
        dispatch(setIsHub(undefined));
      };
    }

    if (campaign) {
      dispatch(setPermissionSettingsTitle(campaign.customer_title));
      dispatch(setCampaignId(campaign.id));
      dispatch(setIsHub(false));
    }

    return () => {
      dispatch(setPermissionSettingsTitle(undefined));
      dispatch(setCampaignId(undefined));
      dispatch(setHubId(undefined));
      dispatch(setIsHub(undefined));
    };
  }, [campaign, hub, isHub, dispatch]);

  // Mark campaign as read once at wrapper level.
  useCampaignAnalytics(analyticsCampaignId);
};
