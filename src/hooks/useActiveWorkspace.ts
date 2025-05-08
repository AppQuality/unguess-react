import { useMemo } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { useGetWorkspacesQuery } from 'src/features/api';
import {
  getWorkspaceFromLS,
  saveWorkspaceToLs,
} from 'src/features/navigation/cachedStorage';

export const useActiveWorkspace = () => {
  const { data: workspaces, isLoading } = useGetWorkspacesQuery({
    orderBy: 'company',
  });

  const activeWorkspaceFromRedux = useAppSelector(
    (state) => state.navigation.activeWorkspace
  );

  const workspace = useMemo(() => {
    if (activeWorkspaceFromRedux) {
      return activeWorkspaceFromRedux;
    }

    if (!isLoading && workspaces?.items?.length) {
      const cached = getWorkspaceFromLS();

      const found = cached && workspaces.items.find((w) => w.id === cached.id);
      if (found) {
        return found;
      }

      // default fallback
      const first = workspaces.items[0];
      saveWorkspaceToLs(first);
      return first;
    }

    return undefined;
  }, [activeWorkspaceFromRedux, workspaces, isLoading]);

  return { activeWorkspace: workspace, isLoading };
};
