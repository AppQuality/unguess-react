/* eslint-disable no-debugger */
import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { Workspace, useGetWorkspacesQuery } from 'src/features/api';
import { getWorkspaceFromLS } from 'src/features/navigation/cachedStorage';

export const useActiveWorkspace = () => {
  const [result, setResult] = useState<Workspace>();
  const { data: workspaces, isLoading } = useGetWorkspacesQuery({
    orderBy: 'company',
  });
  const activeWorkspace = useAppSelector(
    (state) => state.navigation.activeWorkspace
  );

  useEffect(() => {
    if (activeWorkspace) {
      setResult(activeWorkspace);
      return;
    }

    if (result) return;

    if (
      isLoading ||
      !workspaces ||
      !workspaces?.items ||
      workspaces.items.length === 0
    )
      return;

    const cachedWorkspace = getWorkspaceFromLS();
    if (
      cachedWorkspace &&
      workspaces.items.map((w) => w.id).includes(cachedWorkspace.id)
    ) {
      setResult(cachedWorkspace);
      return;
    }

    if (
      !isLoading &&
      workspaces &&
      workspaces.items &&
      workspaces.items.length > 0
    ) {
      setResult(workspaces.items[0]);
    }
  }, [activeWorkspace, workspaces, isLoading]);

  return { activeWorkspace: result };
};
