import { appTheme } from 'src/app/theme';
import {
  Label,
  Modal,
  ModalClose,
  Span,
  useToast,
  Notification,
  Button,
} from '@appquality/unguess-design-system';
import { useAppSelector } from 'src/app/hooks';
import { useTranslation } from 'react-i18next';
import {
  useDeleteCampaignsByCidUsersMutation,
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidUsersQuery,
  useGetProjectsByPidUsersQuery,
  useGetWorkspacesByWidUsersQuery,
  usePostCampaignsByCidUsersMutation,
} from 'src/features/api';
import { FormikHelpers } from 'formik';
import { ReactComponent as UsersIcon } from 'src/assets/icons/users-share.svg';
import { useState } from 'react';
import { AddNewMemberInput } from './addNewMember';
import { UserItem } from './userItem';
import { PermissionSettingsFooter } from './modalFooter';
import { FixedBody, FlexContainer, SettingsDivider } from './styled';

export const CampaignSettings = () => {
  const { permissionSettingsTitle, campaignId, activeWorkspace } =
    useAppSelector((state) => state.navigation);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [addNewMember] = usePostCampaignsByCidUsersMutation();
  const [removeUser] = useDeleteCampaignsByCidUsersMutation();

  const {
    isLoading: isLoadingCampaign,
    isFetching: isFetchingCampaign,
    data: campaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId?.toString() || '0',
  });

  const {
    isLoading: isLoadingCampaignUsers,
    isFetching: isFetchingCampaignUsers,
    data: campaignUsers,
    refetch: refetchCampaignUsers,
  } = useGetCampaignsByCidUsersQuery({
    cid: campaignId?.toString() || '0',
  });

  const {
    isLoading: isLoadingProjectUsers,
    isFetching: isFetchingProjectUsers,
    data: projectUsers,
    refetch: refetchProjectUsers,
  } = useGetProjectsByPidUsersQuery({
    pid: campaign?.project.id.toString() || '0',
  });

  const {
    isLoading: isLoadingWorkspaceUsers,
    isFetching: isFetchingWorkspaceUsers,
    data: workspaceUsers,
    refetch: refetchWorkspaceUsers,
  } = useGetWorkspacesByWidUsersQuery({
    wid: activeWorkspace?.id.toString() || '0',
  });

  const workspaceCount = workspaceUsers?.items.length || 0;
  const projectCount = projectUsers?.items.length || 0;
  const campaignCount = campaignUsers?.items.length || 0;
  const campaignUsersCount = campaignCount + projectCount + workspaceCount;

  const onSubmitNewMember = (
    values: { email: string },
    actions: FormikHelpers<{ email: string }>
  ) => {
    addNewMember({
      cid: campaignId?.toString() || '0',
      body: {
        email: values.email,
      },
    })
      .then(() => {
        actions.setSubmitting(false);
        refetchCampaignUsers();
        refetchProjectUsers();
        refetchWorkspaceUsers();
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        actions.setSubmitting(false);
      });
  };

  const onResendInvite = (email: string) => {
    addNewMember({
      cid: campaignId?.toString() || '0',
      body: {
        email,
      },
    })
      .unwrap()
      .then(() => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="success"
              message={t('__PERMISSION_SETTINGS_TOAST_RESEND')}
              closeText={t('__PERMISSION_SETTINGS_TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
      });
  };

  const onRemoveUser = (id: number) => {
    removeUser({
      cid: campaignId?.toString() || '0',
      body: {
        user_id: id,
      },
    })
      .unwrap()
      .then(() => {
        refetchCampaignUsers();
        refetchProjectUsers();
        refetchWorkspaceUsers();
      });
  };

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
        {campaignUsersCount > 0
          ? ` +${campaignUsersCount}`
          : t('__WORKSPACE_SETTINGS_CTA_TEXT')}
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Modal.Header>
            {t('__PERMISSION_SETTINGS_HEADER_TITLE')}{' '}
            <Span style={{ color: appTheme.palette.blue[600] }}>
              {permissionSettingsTitle}
            </Span>
          </Modal.Header>
          <FixedBody>
            <AddNewMemberInput onSubmit={onSubmitNewMember} />
          </FixedBody>
          <SettingsDivider />
          <Modal.Body style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Label>{t('__PERMISSION_SETTINGS_BODY_TITLE')}</Label>
            <FlexContainer
              isLoading={
                isLoadingCampaign ||
                isLoadingCampaignUsers ||
                isLoadingProjectUsers ||
                isLoadingWorkspaceUsers ||
                isFetchingCampaign ||
                isFetchingCampaignUsers ||
                isFetchingProjectUsers ||
                isFetchingWorkspaceUsers
              }
            >
              {campaignUsers?.items.map((user) => (
                <UserItem
                  key={user.id}
                  user={user}
                  onResendInvite={() => onResendInvite(user.email)}
                  onRemoveUser={() => onRemoveUser(user.id)}
                />
              ))}
              {projectUsers?.items.map((user) => (
                <UserItem key={user.id} user={user} />
              ))}
              {workspaceUsers?.items.map((user) => (
                <UserItem key={user.id} user={user} />
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
