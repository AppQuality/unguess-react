import {
  AccordionNew,
  Button,
  getColor,
  Label,
  MD,
  Modal,
  ModalClose,
  Notification,
  Span,
  useToast,
} from '@appquality/unguess-design-system';
import { FormikHelpers } from 'formik';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { ReactComponent as ProjectsIcon } from 'src/assets/icons/project-icon.svg';
import { ReactComponent as UsersIcon } from 'src/assets/icons/users-share.svg';
import { ReactComponent as WorkspacesIcon } from 'src/assets/icons/workspace-icon.svg';
import {
  useDeleteProjectsByPidUsersMutation,
  useGetProjectsByPidUsersQuery,
  useGetWorkspacesByWidUsersQuery,
  usePostProjectsByPidUsersMutation,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { getLocalizedProjectUrl } from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';
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

export const ProjectSettings = () => {
  const { permissionSettingsTitle, projectId } = useAppSelector(
    (state) => state.navigation
  );
  const { activeWorkspace } = useActiveWorkspace();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [addNewMember] = usePostProjectsByPidUsersMutation();
  const [removeUser] = useDeleteProjectsByPidUsersMutation();

  const {
    isLoading: isLoadingProjectUsers,
    isFetching: isFetchingProjectUsers,
    data: projectUsers,
    refetch: refetchProjectUsers,
  } = useGetProjectsByPidUsersQuery(
    {
      pid: projectId?.toString() || '0',
    },
    {
      skip: !projectId,
    }
  );

  const {
    isLoading: isLoadingWorkspaceUsers,
    isFetching: isFetchingWorkspaceUsers,
    data: workspaceUsers,
    refetch: refetchWorkspaceUsers,
    error: workspaceUsersError,
  } = useGetWorkspacesByWidUsersQuery(
    {
      wid: activeWorkspace?.id.toString() || '0',
    },
    {
      skip: !activeWorkspace?.id,
    }
  );

  const workspaceCount = workspaceUsers?.items.length || 0;
  const projectCount = projectUsers?.items.length || 0;
  const usersCount = projectCount + workspaceCount;

  const projectRoute = getLocalizedProjectUrl(projectId ?? 0, i18n.language);

  const onSubmitNewMember = (
    values: { email: string; message?: string },
    actions: FormikHelpers<{ email: string; message?: string }>
  ) => {
    addNewMember({
      pid: projectId?.toString() || '0',
      body: {
        email: values.email,
        redirect_url: projectRoute,
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
        refetchProjectUsers();
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
      pid: projectId?.toString() || '0',
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
      pid: projectId?.toString() || '0',
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
        refetchProjectUsers();
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
          <UsersIcon />
        </Button.StartIcon>
        {t('__PROJECT_SETTINGS_CTA_TEXT')}
        {usersCount > 0 && ` (${usersCount})`}
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
                values={{
                  users_count: usersCount,
                }}
                defaults="Already shared with <span>{{users_count}}</span> people"
              />
            </Label>
            <FlexContainer
              isLoading={
                isLoadingProjectUsers ||
                isLoadingWorkspaceUsers ||
                isFetchingProjectUsers ||
                isFetchingWorkspaceUsers
              }
            >
              {projectCount > 0 && (
                <>
                  <UsersLabel>
                    <ProjectsIcon
                      style={{
                        color: appTheme.palette.grey[600],
                        marginRight: appTheme.space.xs,
                      }}
                    />
                    <MD isBold>
                      {t('__PERMISSION_SETTINGS_PROJECT_USERS')}{' '}
                      <Span
                        isBold={false}
                        style={{ color: appTheme.palette.grey[600] }}
                      >
                        ({projectCount})
                      </Span>
                    </MD>
                  </UsersLabel>
                  <UsersContainer>
                    {projectUsers?.items.map((user) => (
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
              {workspaceUsersError && (
                <UsersLabel>
                  <WorkspacesIcon
                    style={{
                      color: appTheme.palette.grey[600],
                      marginRight: appTheme.space.xs,
                    }}
                  />
                  <MD isBold>
                    {t('__PERMISSION_SETTINGS_WORKSPACE_USERS_ALL')}
                  </MD>
                </UsersLabel>
              )}
              {workspaceCount > 0 && (
                <AccordionNew
                  level={3}
                  key="workspace_users_accordion"
                  defaultExpandedSections={[]}
                  isCompact
                >
                  <AccordionNew.Section>
                    <AccordionNew.Header
                      icon={
                        <WorkspacesIcon
                          style={{
                            color: appTheme.palette.grey[600],
                            marginRight: appTheme.space.xs,
                          }}
                        />
                      }
                    >
                      <AccordionNew.Label
                        label={`${t(
                          '__PERMISSION_SETTINGS_WORKSPACE_USERS'
                        )} (${workspaceCount})`}
                      />
                    </AccordionNew.Header>
                    <AccordionNew.Panel>
                      {workspaceUsers?.items.map((user) => (
                        <UserItem key={user.id} user={user} />
                      ))}
                    </AccordionNew.Panel>
                  </AccordionNew.Section>
                </AccordionNew>
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
