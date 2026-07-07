import { useMemo } from 'react';
import { Hub, useGetWorkspacesByWidHubsQuery } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';

export type HubGroup = {
  projectId: number;
  projectName: string;
  hubs: Hub[];
};

export const useHubsGroupedByProjects = ({
  projectId,
}: {
  projectId?: number;
} = {}) => {
  const { activeWorkspace } = useActiveWorkspace();
  const wid = activeWorkspace?.id.toString() ?? '';

  const { data, isLoading, isFetching, isError } =
    useGetWorkspacesByWidHubsQuery({ wid }, { skip: !wid });

  const groups = useMemo<HubGroup[]>(() => {
    const items = data?.items ?? [];
    const filtered = projectId
      ? items.filter((h) => h.project.id === projectId)
      : items;

    return filtered.reduce<HubGroup[]>((acc, hub) => {
      const existing = acc.find((g) => g.projectId === hub.project.id);
      if (existing) {
        existing.hubs.push(hub);
        return acc;
      }
      return [
        ...acc,
        {
          projectId: hub.project.id,
          projectName: hub.project.name,
          hubs: [hub],
        },
      ];
    }, []);
  }, [data, projectId]);

  return { groups, isLoading, isFetching, isError };
};
