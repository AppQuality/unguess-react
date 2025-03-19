import { useEffect, useState } from 'react';
import {
  CampaignWithOutput,
  GetWorkspacesByWidPlansApiResponse,
  useGetWorkspacesByWidCampaignsQuery,
  useGetWorkspacesByWidPlansQuery,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';

export const useCampaignsAndPlans = (maxItems: number = 5) => {
  const { activeWorkspace } = useActiveWorkspace();
  const canSeePlans = useCanAccessToActiveWorkspace();

  const [items, setItems] = useState<{
    plans: GetWorkspacesByWidPlansApiResponse;
    campaigns: CampaignWithOutput[];
  }>({
    plans: [],
    campaigns: [],
  });

  const {
    data: campaigns,
    isLoading: campaignsLoading,
    isFetching: campaignsIsFetching,
    isError: campaignsError,
  } = useGetWorkspacesByWidCampaignsQuery(
    {
      wid: activeWorkspace?.id.toString() || '',
      orderBy: 'start_date',
      order: 'DESC',
      limit: maxItems,
    },
    {
      skip: !canSeePlans || !activeWorkspace,
    }
  );

  const {
    data: plans,
    isLoading: plansLoading,
    isFetching: plansIsFetching,
    isError: plansError,
  } = useGetWorkspacesByWidPlansQuery(
    {
      wid: activeWorkspace?.id.toString() || '',
      orderBy: 'start_date',
      order: 'DESC',
      limit: maxItems,
    },
    {
      skip: !canSeePlans || !activeWorkspace,
    }
  );

  useEffect(() => {
    if (canSeePlans && (campaigns || plans)) {
      setItems({
        plans: plans || [],
        campaigns: campaigns?.items || [],
      });
    }
  }, [campaigns, plans]);

  return {
    isLoading: campaignsLoading || plansLoading,
    isFetching: campaignsIsFetching || plansIsFetching,
    isError: campaignsError || plansError,
    items: {
      plans: items.plans,
      campaigns: [...items.campaigns.slice(0, maxItems - items.plans.length)],
    },
  };
};
