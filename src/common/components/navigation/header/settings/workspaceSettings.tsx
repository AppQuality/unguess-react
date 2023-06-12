import { appTheme } from 'src/app/theme';
import {
  Label,
  Modal,
  ModalClose,
  Span,
  useToast,
  Notification,
  Button,
  MD,
} from '@appquality/unguess-design-system';
import { useAppSelector } from 'src/app/hooks';
import { useTranslation } from 'react-i18next';
import {
  useDeleteWorkspacesByWidUsersMutation,
  useGetWorkspacesByWidUsersQuery,
  usePostWorkspacesByWidUsersMutation,
} from 'src/features/api';
import { FormikHelpers } from 'formik';
import { ReactComponent as UsersIcon } from 'src/assets/icons/users-share.svg';
import { useState } from 'react';
import { AddNewMemberInput } from './addNewMember';
import { UserItem } from './userItem';
import { PermissionSettingsFooter } from './modalFooter';
import {
  FixedBody,
  FlexContainer,
  SettingsDivider,
  StyledAccordion,
} from './styled';

export const WorkspaceSettings = () => {
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [addNewMember] = usePostWorkspacesByWidUsersMutation();
  const [removeUser] = useDeleteWorkspacesByWidUsersMutation();

  if (!activeWorkspace) return null;

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
      wid: activeWorkspace?.id.toString(),
      body: {
        email: values.email,
      },
    })
      .then(() => {
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
      wid: activeWorkspace.id.toString(),
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

  const onRemoveUser = (id: number) => {
    removeUser({
      wid: activeWorkspace.id.toString(),
      body: {
        user_id: id,
      },
    }).unwrap();
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
        {usersCount > 0
          ? ` +${usersCount}`
          : t('__WORKSPACE_SETTINGS_CTA_TEXT')}
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Modal.Header>
            {t('__PERMISSION_SETTINGS_HEADER_TITLE')}{' '}
            <Span style={{ color: appTheme.palette.blue[600] }}>
              {`${activeWorkspace.company}'s workspace`}
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
              isLoading={isLoadingWorkspaceUsers || isFetchingWorkspaceUsers}
            >
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
                      <MD isBold>
                        <UsersIcon
                          style={{
                            color: appTheme.palette.grey[600],
                            marginRight: appTheme.space.xs,
                          }}
                        />
                        {t('__PERMISSION_SETTINGS_WORKSPACE_USERS')} (
                        {workspaceCount})
                      </MD>
                    </StyledAccordion.Label>
                  </StyledAccordion.Header>
                  <StyledAccordion.Panel
                    style={{ padding: 0, paddingTop: appTheme.space.sm }}
                  >
                    {workspaceUsers?.items.map((user) => (
                      <UserItem
                        key={user.id}
                        user={user}
                        onResendInvite={() => onResendInvite(user.email)}
                        onRemoveUser={() => onRemoveUser(user.id)}
                      />
                    ))}
                  </StyledAccordion.Panel>
                </StyledAccordion.Section>
              </StyledAccordion>
            </FlexContainer>
          </Modal.Body>
          <PermissionSettingsFooter />
          <ModalClose />
        </Modal>
      )}
    </>
  );
};
