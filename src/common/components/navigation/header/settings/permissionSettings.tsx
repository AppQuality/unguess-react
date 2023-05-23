import { getColor } from '@zendeskgarden/react-theming';
import { theme as globalTheme } from 'src/app/theme';
import {
  Button,
  Label,
  Modal,
  ModalClose,
  Span,
} from '@appquality/unguess-design-system';
import { useAppSelector } from 'src/app/hooks';
import styled from 'styled-components';
import { ReactComponent as GearIcon } from 'src/assets/icons/gear-fill.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetWorkspacesByWidUsersQuery } from 'src/features/api';
import { AddNewMemberInput } from './addNewMember';
import { UserItem } from './userItem';
import { PermissionSettingsFooter } from './modalFooter';

const FlexContainer = styled.div<{ loading?: boolean }>`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.space.base * 4}px;
  min-height: 0;
  opacity: ${({ loading }) => (loading ? 0.5 : 1)};
`;

const FixedBody = styled(Modal.Body)`
  display: inline-table;
  overflow: hidden;
  padding-bottom: ${({ theme }) => theme.space.base * 2}px;
`;

const Divider = styled.div`
  border-top: 1px solid ${({ theme }) => getColor(theme.colors.neutralHue, 200)};
  padding-top: ${({ theme }) => theme.space.base * 6}px;
`;

export const PermissionSettings = () => {
  const { activeWorkspace, permissionSettingsTitle, campaignId, projectId } =
    useAppSelector((state) => state.navigation);
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading, isFetching, data } = useGetWorkspacesByWidUsersQuery({
    wid: activeWorkspace?.id.toString() || '0',
    // }, { skip: !!campaignId || !!projectId });
  });

  // const {
  //   isLoading: isProjectLoading,
  //   isFetching: isProjectFetching,
  //   data: projectMember
  // } = useGetProjectByWidUsersQuery({
  //   wid: projectId,
  // }, { skip: !projectId });

  // const {
  //   isLoading: isCampaignLoading,
  //   isFetching: isCampaignFetching,
  //   data: campaignMember
  // } = useGetCampaignByWidUsersQuery({
  //   wid: campaignId,
  // }, { skip: !campaignId });

  // const getMemberList = () => {
  //   if (projectId)
  //     return projectMember?.items;
  //   if (campaignId)
  //     return campaignMember?.items;

  //   return data?.items;
  // }

  if (!activeWorkspace) return null;

  const getModalTitle = () => {
    if (!campaignId && !projectId)
      return `${activeWorkspace.company}'s workspace`;

    return permissionSettingsTitle;
  };

  return (
    <>
      <Button isBasic onClick={() => setIsModalOpen(true)}>
        <Button.StartIcon>
          <GearIcon />
        </Button.StartIcon>
        {t('__WORKSPACE_SETTINGS_CTA_TEXT')}
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Modal.Header>
            {t('__PERMISSION_SETTINGS_HEADER_TITLE')}{' '}
            <Span style={{ color: globalTheme.palette.blue[600] }}>
              {getModalTitle()}
            </Span>
          </Modal.Header>
          <FixedBody>
            <AddNewMemberInput />
          </FixedBody>
          <Divider />
          <Modal.Body style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Label>{t('__PERMISSION_SETTINGS_BODY_TITLE')}</Label>
            <FlexContainer
              loading={
                isLoading || isFetching
                // || isProjectLoading
                // || isCampaignLoading
                // || isCampaignFetching
              }
            >
              {data?.items.map((user) => (
                <UserItem user={user} />
              ))}
            </FlexContainer>
          </Modal.Body>
          <PermissionSettingsFooter />
          <ModalClose />
        </Modal>
      )}
    </>
  );
};
