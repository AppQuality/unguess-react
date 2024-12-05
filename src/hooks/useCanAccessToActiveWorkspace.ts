import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { selectWorkspaces } from 'src/features/workspaces/selectors';
import { useActiveWorkspace } from './useActiveWorkspace';

const useCanAccessToActiveWorkspace = () => {
  const { activeWorkspace } = useActiveWorkspace();
  const workspaces = useAppSelector(selectWorkspaces);

  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (activeWorkspace) {
      const personalWorkspaces = workspaces.filter((ws) => !ws.isShared);
      const activeWorkspaceInPersonal = !!personalWorkspaces.find(
        (ws) => ws.id === activeWorkspace?.id
      );

      setHasAccess(activeWorkspaceInPersonal);
    }
  }, [activeWorkspace]);

  return hasAccess;
};

export { useCanAccessToActiveWorkspace };
