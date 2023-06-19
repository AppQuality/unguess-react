import { appTheme } from 'src/app/theme';
import {
  Label,
  Modal,
  ModalClose,
  Span,
  useToast,
  Notification,
  Button,
  getColor,
} from '@appquality/unguess-design-system';
import { useAppSelector } from 'src/app/hooks';
import { Trans, useTranslation } from 'react-i18next';
import {
  useDeleteWorkspacesByWidUsersMutation,
  useGetWorkspacesByWidUsersQuery,
  usePostWorkspacesByWidUsersMutation,
} from 'src/features/api';
import { FormikHelpers } from 'formik';
import { ReactComponent as UsersIcon } from 'src/assets/icons/users-share.svg';
import { ReactComponent as WorkspacesIcon } from 'src/assets/icons/workspace-icon.svg';
import { useState } from 'react';
import { AddNewMemberInput } from './addNewMember';
import { UserItem } from './userItem';
import { PermissionSettingsFooter } from './modalFooter';
import {
  FixedBody,
  FlexContainer,
  SettingsDivider,
  UsersLabel,
  UsersContainer,
} from './styled';

export const WorkspaceSettings = () => {
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [addNewMember] = usePostWorkspacesByWidUsersMutation();
  const [removeUser] = useDeleteWorkspacesByWidUsersMutation();

  const {
    isLoading: isLoadingWorkspaceUsers,
    isFetching: isFetchingWorkspaceUsers,
    data: workspaceUsers,
    refetch: refetchWorkspaceUsers,
  } = useGetWorkspacesByWidUsersQuery({
    wid: activeWorkspace?.id.toString() || '0',
  });

  const workspaceCount = workspaceUsers?.items.length || 0;
  const usersCount = workspaceCount;

  const onSubmitNewMember = (
    values: { email: string },
    actions: FormikHelpers<{ email: string }>
  ) => {
    addNewMember({
      wid: activeWorkspace?.id.toString() || '',
      body: {
        email: values.email,
      },
    })
      .then(() => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="success"
              message={t('__PERMISSION_SETTINGS_TOAST_ADD_NEW')}
              closeText={t('__PERMISSION_SETTINGS_TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
        actions.setSubmitting(false);
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
      wid: activeWorkspace?.id.toString() || '',
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
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  };

  const onRemoveUser = (id: number, includeShared?: boolean) => {
    removeUser({
      wid: activeWorkspace?.id.toString() || '',
      body: {
        user_id: id,
        ...(includeShared && { include_shared: true }),
      },
    })
      .unwrap()
      .then(() => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="success"
              message={t('__PERMISSION_SETTINGS_TOAST_REMOVE')}
              closeText={t('__PERMISSION_SETTINGS_TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
        refetchWorkspaceUsers();
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} isBasic>
        <Button.StartIcon>
          <UsersIcon style={{ height: appTheme.iconSizes.lg }} />
        </Button.StartIcon>
        {t('__WORKSPACE_SETTINGS_CTA_TEXT')}
        {usersCount > 0 && ` (${usersCount})`}
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Modal.Header>
            {t('__PERMISSION_SETTINGS_HEADER_TITLE')}{' '}
            <Span style={{ color: appTheme.palette.blue[600] }}>
              {`${activeWorkspace?.company || ''}'s workspace`}
            </Span>
          </Modal.Header>
          <FixedBody>
            <AddNewMemberInput onSubmit={onSubmitNewMember} />
          </FixedBody>
          <SettingsDivider />
          <Modal.Body style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Label>
              <Trans i18nKey="__PERMISSION_SETTINGS_BODY_TITLE">
                Already shared with{' '}
                <Span
                  isBold
                  style={{
                    color: getColor(appTheme.colors.primaryHue, 600),
                  }}
                >
                  {{
                    users_count: usersCount,
                  }}{' '}
                  people
                </Span>
              </Trans>
            </Label>
            <FlexContainer
              isLoading={isLoadingWorkspaceUsers || isFetchingWorkspaceUsers}
            >
              {workspaceCount > 0 && (
                <>
                  <UsersLabel>
                    <WorkspacesIcon
                      style={{
                        fill: appTheme.palette.grey[600],
                        marginRight: appTheme.space.xs,
                      }}
                    />
                    {t('__PERMISSION_SETTINGS_WORKSPACE_USERS')} (
                    {workspaceCount})
                  </UsersLabel>
                  <UsersContainer>
                    {workspaceUsers?.items.map((user) => (
                      <UserItem
                        key={user.id}
                        user={user}
                        onResendInvite={() => onResendInvite(user.email)}
                        onRemoveUser={(includeShared) =>
                          onRemoveUser(user.id, includeShared)
                        }
                        showRemoveConfirm
                      />
                    ))}
                  </UsersContainer>
                </>
              )}
            </FlexContainer>
          </Modal.Body>
          <PermissionSettingsFooter />
          <ModalClose />
        </Modal>
      )}
    </>
  );
};
