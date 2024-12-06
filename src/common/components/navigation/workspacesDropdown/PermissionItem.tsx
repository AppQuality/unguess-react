import { appTheme } from 'src/app/theme';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';
import { WorkspaceSettings } from '../../inviteUsers/workspaceSettings';

export const PermissionItem = () => {
  const canManageUsers = useCanAccessToActiveWorkspace();

  return canManageUsers ? (
    <div style={{ marginLeft: appTheme.space.sm }}>
      <WorkspaceSettings />
    </div>
  ) : null;
};
