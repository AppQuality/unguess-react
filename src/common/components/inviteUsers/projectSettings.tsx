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
  useDeleteProjectsByPidUsersMutation,
  useGetProjectsByPidUsersQuery,
  useGetWorkspacesByWidUsersQuery,
  usePostProjectsByPidUsersMutation,
} from 'src/features/api';
import { FormikHelpers } from 'formik';
import { ReactComponent as UsersIcon } from 'src/assets/icons/users-share.svg';
import { useState } from 'react';
import { ReactComponent as ProjectsIcon } from 'src/assets/icons/project-icon.svg';
import { ReactComponent as WorkspacesIcon } from 'src/assets/icons/workspace-icon.svg';
import { AddNewMemberInput } from './addNewMember';
import { UserItem } from './userItem';
import { PermissionSettingsFooter } from './modalFooter';
import {
  FixedBody,
  FlexContainer,
  SettingsDivider,
  StyledAccordion,
  UsersLabel,
  UsersContainer,
  StyledAccordionPanel,
} from './styled';

export const ProjectSettings = () => {
  const { permissionSettingsTitle, projectId, activeWorkspace } =
    useAppSelector((state) => state.navigation);
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
  } = useGetProjectsByPidUsersQuery({
    pid: projectId?.toString() || '0',
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
  const usersCount = projectCount + workspaceCount;

  const onSubmitNewMember = (
    values: { email: string },
    actions: FormikHelpers<{ email: string }>
  ) => {
    addNewMember({
      pid: projectId?.toString() || '0',
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
              closeText={t('__PERMISSION_SETTINGS_TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
        refetchProjectUsers();
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
              {permissionSettingsTitle}
            </Span>
          </Modal.Header>
          <FixedBody>
            <AddNewMemberInput onSubmit={onSubmitNewMember} />
          </FixedBody>
          <SettingsDivider />
          <Modal.Body style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Label>
              {t('__PERMISSION_SETTINGS_BODY_TITLE')} {usersCount}
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
                    {t('__PERMISSION_SETTINGS_PROJECT_USERS')} ({projectCount})
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
              {workspaceCount > 0 && (
                <StyledAccordion
                  level={3}
                  key="workspace_users_accordion"
                  isAnimated
                  isExpandable
                  {...(workspaceCount === 0 && { isDisabled: true })}
                >
                  <StyledAccordion.Section>
                    <StyledAccordion.Header>
                      <StyledAccordion.Label style={{ padding: 0 }}>
                        <UsersLabel>
                          <WorkspacesIcon
                            style={{
                              color: appTheme.palette.grey[600],
                              marginRight: appTheme.space.xs,
                            }}
                          />
                          {t('__PERMISSION_SETTINGS_WORKSPACE_USERS')} (
                          {workspaceCount})
                        </UsersLabel>
                      </StyledAccordion.Label>
                    </StyledAccordion.Header>
                    <StyledAccordionPanel>
                      {workspaceUsers?.items.map((user) => (
                        <UserItem key={user.id} user={user} />
                      ))}
                    </StyledAccordionPanel>
                  </StyledAccordion.Section>
                </StyledAccordion>
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
