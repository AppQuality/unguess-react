import { useAppSelector } from 'src/app/hooks';
import { WorkspaceSettings } from './workspaceSettings';
import { ProjectSettings } from './projectSettings';
import { CampaignSettings } from './campaignSettings';

export const SettingsButton = () => {
  const { projectId, campaignId, activeWorkspace } = useAppSelector(
    (state) => state.navigation
  );

  const isWorkspace = !projectId && !campaignId && activeWorkspace;
  const isProject = projectId && !campaignId;
  const isCampaign = !!campaignId;

  return (
    <>
      {isWorkspace && <WorkspaceSettings />}
      {isProject && <ProjectSettings />}
      {isCampaign && <CampaignSettings />}
    </>
  );
};
