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
  MD,
} from '@appquality/unguess-design-system';
import { useAppSelector } from 'src/app/hooks';
import { Trans, useTranslation } from 'react-i18next';
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
import { ReactComponent as CampaignsIcon } from 'src/assets/icons/campaign-icon.svg';
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
    error: projectUsersError,
  } = useGetProjectsByPidUsersQuery({
    pid: campaign?.project.id.toString() || '0',
  });

  const {
    isLoading: isLoadingWorkspaceUsers,
    isFetching: isFetchingWorkspaceUsers,
    data: workspaceUsers,
    refetch: refetchWorkspaceUsers,
    error: workspaceUsersError,
  } = useGetWorkspacesByWidUsersQuery({
    wid: activeWorkspace?.id.toString() || '0',
  });

  const workspaceCount = workspaceUsers?.items.length || 0;
  const projectCount = projectUsers?.items.length || 0;
  const campaignCount = campaignUsers?.items.length || 0;
  const usersCount = campaignCount + projectCount + workspaceCount;

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
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
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
        refetchCampaignUsers();
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
            <Label style={{ color: appTheme.palette.grey[700] }}>
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
              {campaignCount > 0 && (
                <>
                  <UsersLabel>
                    <CampaignsIcon
                      style={{
                        color: appTheme.palette.grey[600],
                        marginRight: appTheme.space.xs,
                      }}
                    />
                    <MD isBold>
                      {t('__PERMISSION_SETTINGS_CAMPAIGN_USERS')}{' '}
                      <Span
                        isBold={false}
                        style={{ color: appTheme.palette.grey[600] }}
                      >
                        ({campaignCount})
                      </Span>
                    </MD>
                  </UsersLabel>
                  <UsersContainer>
                    {campaignUsers?.items.map((user) => (
                      <UserItem
                        key={user.id}
                        user={user}
                        onResendInvite={() => onResendInvite(user.email)}
                        onRemoveUser={() => onRemoveUser(user.id)}
                        showRemoveConfirm
                      />
                    ))}
                  </UsersContainer>
                </>
              )}
              {projectUsersError && (
                <UsersLabel>
                  <ProjectsIcon
                    style={{
                      color: appTheme.palette.grey[600],
                      marginRight: appTheme.space.xs,
                    }}
                  />
                  <MD isBold>{t('__PERMISSION_SETTINGS_PROJECT_USERS_ALL')}</MD>
                </UsersLabel>
              )}
              {projectCount > 0 && (
                <StyledAccordion
                  level={3}
                  key="project_users_accordion"
                  isAnimated
                  isExpandable
                  {...(projectCount === 0 && { isDisabled: true })}
                >
                  <StyledAccordion.Section>
                    <StyledAccordion.Header>
                      <StyledAccordion.Label style={{ padding: 0 }}>
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
                      </StyledAccordion.Label>
                    </StyledAccordion.Header>
                    <StyledAccordionPanel>
                      {projectUsers?.items.map((user) => (
                        <UserItem key={user.id} user={user} />
                      ))}
                    </StyledAccordionPanel>
                  </StyledAccordion.Section>
                </StyledAccordion>
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
