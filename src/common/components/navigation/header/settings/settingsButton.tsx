import { useState } from 'react';
import { appTheme } from 'src/app/theme';
import { Button } from '@appquality/unguess-design-system';
import { ReactComponent as UsersIcon } from 'src/assets/icons/users-share.svg';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { WorkspaceSettings } from './workspaceSettings';
import { ProjectSettings } from './projectSettings';
import { CampaignSettings } from './campaignSettings';

export const SettingsButton = () => {
  const { projectId, campaignId } = useAppSelector((state) => state.navigation);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        style={{ marginLeft: appTheme.space.xs }}
        isBasic
      >
        <Button.StartIcon>
          <UsersIcon style={{ height: appTheme.iconSizes.lg }} />
        </Button.StartIcon>
        {t('__WORKSPACE_SETTINGS_CTA_TEXT')}
      </Button>
      {!projectId && !campaignId && isModalOpen && (
        <WorkspaceSettings onClose={() => setIsModalOpen(false)} />
      )}
      {projectId && isModalOpen && (
        <ProjectSettings onClose={() => setIsModalOpen(false)} />
      )}
      {campaignId && isModalOpen && (
        <CampaignSettings onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};
