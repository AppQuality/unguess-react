import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { selectWorkspaces } from 'src/features/workspaces/selectors';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { WorkspaceSettings } from '../../inviteUsers/workspaceSettings';

export const PermissionItem = () => {
  const { activeWorkspace } = useActiveWorkspace();
  const workspaces = useAppSelector(selectWorkspaces);

  const [canManageUsers, setCanManageUsers] = useState(false);

  useEffect(() => {
    if (activeWorkspace) {
      const personalWorkspaces = workspaces.filter((ws) => !ws.isShared);
      const activeWorkspaceInPersonal = !!personalWorkspaces.find(
        (ws) => ws.id === activeWorkspace?.id
      );

      setCanManageUsers(activeWorkspaceInPersonal);
    }
  }, [activeWorkspace]);

  return canManageUsers ? (
    <div style={{ marginLeft: appTheme.space.sm }}>
      <WorkspaceSettings />
    </div>
  ) : null;
};
