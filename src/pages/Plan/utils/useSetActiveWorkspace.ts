import { useEffect } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { useGetWorkspacesByWidQuery } from 'src/features/api';
import { setWorkspace } from 'src/features/navigation/navigationSlice';

export const useSetActiveWorkspace = (workspaceId?: number) => {
  const dispatch = useAppDispatch();
  const { data: workspace } = useGetWorkspacesByWidQuery(
    {
      wid: (workspaceId || 0).toString(),
    },
    {
      skip: !workspaceId,
    }
  );

  useEffect(() => {
    if (workspace) {
      dispatch(setWorkspace(workspace));
    }
  }, [workspace, dispatch]);
};
