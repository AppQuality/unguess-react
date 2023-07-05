import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/app/hooks';
import API from 'src/common/api';
import { Workspace } from 'src/features/api';
import { getWorkspaceFromLS } from 'src/features/navigation/cachedStorage';

export const useActiveWorkspace = () => {
  const [result, setResult] = useState<Workspace>();
  const activeWorkspace = useAppSelector(
    (state) => state.navigation.activeWorkspace
  );

  useEffect(() => {
    if (result) return;

    if (activeWorkspace) {
      setResult(activeWorkspace);
      return;
    }

    const cachedWorkspace = getWorkspaceFromLS();
    if (cachedWorkspace) {
      setResult(cachedWorkspace);
      return;
    }

    API.workspaces(undefined, { orderBy: 'company' }).then((res) => {
      if (res?.items && res.items.length > 0) {
        setResult(res.items[0]);
      }
    });
  }, [activeWorkspace]);

  return { activeWorkspace: result };
};
