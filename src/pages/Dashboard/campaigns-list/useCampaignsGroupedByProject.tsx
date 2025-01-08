import { useAppSelector } from 'src/app/hooks';
import { useGetWorkspacesByWidCampaignsQuery } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';

const useCampaignsGroupedByProject = () => {
  const { activeWorkspace } = useActiveWorkspace();
  const filters = useAppSelector((state) => state.filters);

  const { data, isLoading, isFetching, isError } =
    useGetWorkspacesByWidCampaignsQuery({
      wid: activeWorkspace?.id.toString() || '',
      orderBy: 'start_date',
      order: 'DESC',
    });

  if (!data || isLoading || isFetching || isError) {
    return {
      campaigns: [],
      isLoading,
      isFetching,
      isError,
      count: 0,
    };
  }

  if (!data.items) {
    return {
      campaigns: [],
      isLoading,
      isFetching,
      isError,
      count: 0,
    };
  }

  const filtered = data.items.filter(
    ({ project, status, family, type, customer_title }) => {
      if (filters.projectId && filters.projectId !== project.id) return false;

      // Check status
      if (
        filters.status !== 'all' &&
        status.name &&
        status.name !== filters.status
      )
        return false;

      // Check Type
      if (filters.type !== 'all' && family.name.toLowerCase() !== filters.type)
        return false;

      if (
        filters.testType.label !== 'all' &&
        type.id !== Number.parseInt(filters.testType.value, 10)
      )
        return false;

      // Check Search
      if (
        filters.search &&
        customer_title.toLowerCase().indexOf(filters.search.toLowerCase()) ===
          -1
      )
        return false;

      // All conditions met
      return true;
    }
  );

  const grouped = filtered.reduce(
    (
      acc: { [key: string]: (typeof filtered)[number][] },
      campaign: (typeof filtered)[number]
    ) => {
      if (campaign.project.id in acc) {
        acc[campaign.project.id].push(campaign);
      } else {
        acc[campaign.project.id] = [campaign];
      }
      return acc;
    },
    {} as { [key: string]: (typeof filtered)[number][] }
  );
  const sorted = Object.entries(grouped)
    .sort(([, a], [, b]) => {
      const maxDateA = Math.max(
        ...a.map((item) => new Date(item.start_date).getTime())
      );
      const maxDateB = Math.max(
        ...b.map((item) => new Date(item.start_date).getTime())
      );
      return maxDateB - maxDateA;
    })
    .map(([projectId, items]) => ({
      project: {
        id: projectId,
        name: items[0].project.name,
      },
      items,
    }));

  return {
    campaigns: sorted,
    isLoading,
    isFetching,
    isError,
    count: sorted.flatMap((campaign) => campaign.items).length,
  };
};

export { useCampaignsGroupedByProject };
