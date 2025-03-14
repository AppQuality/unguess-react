import { useEffect, useState } from 'react';
import {
  CampaignWithOutput,
  GetWorkspacesByWidPlansApiResponse,
  useGetWorkspacesByWidCampaignsQuery,
  useGetWorkspacesByWidPlansQuery,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';

export const useCampaignsAndPlans = (maxItems: number = 5) => {
  const { activeWorkspace } = useActiveWorkspace();
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
      skip: !activeWorkspace,
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
      skip: !activeWorkspace,
    }
  );

  useEffect(() => {
    if (campaigns || plans) {
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
