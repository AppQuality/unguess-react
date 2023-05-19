import { Button, Modal, ModalClose } from '@appquality/unguess-design-system';
import { useAppSelector } from 'src/app/hooks';
import styled from 'styled-components';
import { ReactComponent as GearIcon } from 'src/assets/icons/gear-fill.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetWorkspacesByWidUsersQuery } from 'src/features/api';
import { AddNewMemberInput } from './addNewMember';
import { UserItem } from './userItem';
import { PermissionSettingsFooter } from './modalFooter';

const PermissionSettingsContainer = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const FlexContainer = styled.div<{ loading?: boolean }>`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.space.base * 2}px;
  margin-bottom: ${({ theme }) => theme.space.base * 6}px;
  min-height: 0;
  opacity: ${({ loading }) => (loading ? 0.5 : 1)};
`;

const FixedBody = styled(Modal.Body)`
  display: inline-table;
  overflow: hidden;
  padding-bottom: 0;
`;

export const PermissionSettings = () => {
  const { activeWorkspace, permissionSettingsTitle, campaignId, projectId } =
    useAppSelector((state) => state.navigation);
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading, isFetching, data } = useGetWorkspacesByWidUsersQuery({
    wid: activeWorkspace?.id.toString() || '0',
  });

  if (!activeWorkspace) return null;

  const getModalTitle = () => {
    if (campaignId)
      return t('__CAMPAIGN_SETTINGS_MODAL_TITLE', {
        campaign: permissionSettingsTitle,
      });

    if (projectId)
      return t('__PROJECT_SETTINGS_MODAL_TITLE', {
        project: permissionSettingsTitle,
      });

    return t('__WORKSPACE_SETTINGS_MODAL_TITLE', {
      company: activeWorkspace.company,
    });
  };

  return (
    <PermissionSettingsContainer>
      <Button isBasic onClick={() => setIsModalOpen(true)}>
        <Button.StartIcon>
          <GearIcon />
        </Button.StartIcon>
        {t('__WORKSPACE_SETTINGS_CTA_TEXT')}
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Modal.Header>{getModalTitle()}</Modal.Header>
          <FixedBody>
            <AddNewMemberInput />
          </FixedBody>
          <Modal.Body style={{ paddingTop: 0 }}>
            <FlexContainer loading={isLoading || isFetching}>
              {data?.items.map((user) => (
                <UserItem user={user} />
              ))}
            </FlexContainer>
          </Modal.Body>
          <PermissionSettingsFooter />
          <ModalClose />
        </Modal>
      )}
    </PermissionSettingsContainer>
  );
};
