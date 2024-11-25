import {
  Button,
  Label,
  MD,
  Modal,
  ModalClose,
  Notification,
  Span,
  getColor,
  useToast,
} from '@appquality/unguess-design-system';
import { FormikHelpers } from 'formik';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as UsersIcon } from 'src/assets/icons/users-share.svg';
import { ReactComponent as WorkspacesIcon } from 'src/assets/icons/workspace-icon.svg';
import {
  useDeleteWorkspacesByWidUsersMutation,
  useGetWorkspacesByWidUsersQuery,
  usePostWorkspacesByWidUsersMutation,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { AddNewMemberInput } from './addNewMember';
import { PermissionSettingsFooter } from './modalFooter';
import {
  FixedBody,
  FlexContainer,
  SettingsDivider,
  UsersContainer,
  UsersLabel,
} from './styled';
import { UserItem } from './userItem';

export const WorkspaceSettings = () => {
  const { activeWorkspace } = useActiveWorkspace();
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
  } = useGetWorkspacesByWidUsersQuery(
    {
      wid: activeWorkspace?.id.toString() || '0',
    },
    {
      skip: !activeWorkspace?.id,
    }
  );

  const workspaceCount = workspaceUsers?.items.length || 0;
  const usersCount = workspaceCount;

  const onSubmitNewMember = (
    values: { email: string; message?: string },
    actions: FormikHelpers<{ email: string; message?: string }>
  ) => {
    addNewMember({
      wid: activeWorkspace?.id.toString() || '',
      body: {
        email: values.email,
        ...(values.message && { message: values.message }),
      },
    })
      .unwrap()
      .then(() => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="success"
              message={t('__PERMISSION_SETTINGS_TOAST_ADD_NEW')}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
        actions.setSubmitting(false);
        actions.resetForm({
          values: {
            email: '',
            message: '',
          },
        });
        refetchWorkspaceUsers();
      })
      .catch((err) => {
        if (err.status === 400) {
          addToast(
            ({ close }) => (
              <Notification
                onClose={close}
                type="warning"
                message={t('__PERMISSION_SETTINGS_TOAST_ADD_NEW_EXISTING')}
                closeText={t('__TOAST_CLOSE_TEXT')}
                isPrimary
              />
            ),
            { placement: 'top' }
          );
        } else {
          addToast(
            ({ close }) => (
              <Notification
                onClose={close}
                type="error"
                message={t('__TOAST_GENERIC_ERROR_MESSAGE')}
                closeText={t('__TOAST_CLOSE_TEXT')}
                isPrimary
              />
            ),
            { placement: 'top' }
          );
          // eslint-disable-next-line no-console
          console.error(err);
        }
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
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
      })
      .catch((err) => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              message={t('__TOAST_GENERIC_ERROR_MESSAGE')}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
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
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
        refetchWorkspaceUsers();
      })
      .catch((err) => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              message={t('__TOAST_GENERIC_ERROR_MESSAGE')}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
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
            <Label style={{ color: appTheme.palette.grey[700] }}>
              <Trans
                i18nKey="__PERMISSION_SETTINGS_BODY_TITLE"
                components={{
                  span: (
                    <Span
                      isBold
                      style={{
                        color: getColor(appTheme.colors.primaryHue, 600),
                      }}
                    />
                  ),
                }}
                defaults="Already shared with <span>{{users_count}}</span> people"
                values={{
                  users_count: usersCount,
                }}
              />
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
                    <MD isBold>
                      {t('__PERMISSION_SETTINGS_WORKSPACE_USERS')}{' '}
                      <Span
                        isBold={false}
                        style={{ color: appTheme.palette.grey[600] }}
                      >
                        ({workspaceCount})
                      </Span>
                    </MD>
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
