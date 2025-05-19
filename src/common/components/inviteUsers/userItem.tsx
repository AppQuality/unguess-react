import {
  Avatar,
  ButtonMenu,
  Ellipsis,
  getColor,
  MD,
  SM,
  Span,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { GetWorkspacesByWidUsersApiResponse } from 'src/features/api';
import styled from 'styled-components';
import { getInitials } from '../navigation/header/utils';
import RemoveConfirmModal from './modals/RemoveConfirmModal';

const StyledEllipsis = styled(Ellipsis)``;
const UserListItem = styled.div`
  display: flex;
  padding: ${({ theme }) => `${theme.space.xs} 0`};
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};

  ${StyledEllipsis} {
    width: 300px;
  }
`;

export const UserItem = ({
  user,
  onResendInvite,
  onRemoveUser,
  showRemoveConfirm,
}: {
  user: GetWorkspacesByWidUsersApiResponse['items'][number];
  onResendInvite?: () => void;
  onRemoveUser?: (includeShared?: boolean) => void;
  showRemoveConfirm?: boolean;
}) => {
  const { t } = useTranslation();
  const { userData } = useAppSelector((state) => state.user);
  const [showRemoveConfirmModal, setShowRemoveConfirmModal] = useState(false);

  const handleRemoveUser = () => {
    setShowRemoveConfirmModal(true);
  };

  const isMe = userData?.email === user.email;

  return (
    <>
      <UserListItem key={`profile_${user.profile_id}`}>
        <Avatar avatarType="text" style={{ flexShrink: 0 }}>
          {getInitials(user.name.length ? user.name : user.email)}
        </Avatar>
        <div>
          <MD
            isBold
            style={{
              color: getColor(appTheme.colors.primaryHue, 600),
            }}
          >
            <StyledEllipsis>
              {user.name.length ? user.name : user.email}{' '}
              {isMe && t('__WORKSPACE_SETTINGS_CURRENT_MEMBER_YOU_LABEL')}
            </StyledEllipsis>
          </MD>
          {user.name.length > 0 && (
            <SM
              style={{
                color: appTheme.palette.grey[700],
              }}
            >
              <StyledEllipsis>{user.email}</StyledEllipsis>
            </SM>
          )}
        </div>
        {onResendInvite && onRemoveUser ? (
          <div style={{ marginLeft: 'auto' }}>
            {!isMe && (
              <ButtonMenu
                label={
                  user.invitationPending
                    ? t('__WORKSPACE_SETTINGS_MEMBER_INVITATION_PENDING_LABEL')
                    : t('__WORKSPACE_SETTINGS_MEMBER_ACTIONS_LABEL')
                }
                buttonProps={{
                  style: user.invitationPending
                    ? { color: appTheme.palette.orange[600] }
                    : {},
                }}
                onSelect={(value) => {
                  if (value === 'invite') {
                    onResendInvite();
                    return;
                  }

                  if (value === 'remove') {
                    if (showRemoveConfirm) {
                      handleRemoveUser();
                    } else {
                      onRemoveUser();
                    }
                  }
                }}
              >
                {user.invitationPending && (
                  <ButtonMenu.Item value="invite">
                    {t('__WORKSPACE_SETTINGS_MEMBER_RESEND_INVITE_ACTION')}
                  </ButtonMenu.Item>
                )}
                <ButtonMenu.Item value="remove">
                  <Span hue={appTheme.components.text.dangerColor}>
                    {t('__WORKSPACE_SETTINGS_MEMBER_REMOVE_USER_ACTION')}
                  </Span>
                </ButtonMenu.Item>
              </ButtonMenu>
            )}
          </div>
        ) : (
          <>
            {user.invitationPending && (
              <Span
                style={{ marginLeft: 'auto' }}
                hue={appTheme.palette.orange[600]}
              >
                {t('__WORKSPACE_SETTINGS_MEMBER_INVITATION_PENDING_LABEL')}
              </Span>
            )}
            {!user.invitationPending && (
              <Span
                style={{ marginLeft: 'auto' }}
                hue={appTheme.palette.grey[700]}
              >
                {t('__WORKSPACE_SETTINGS_MEMBER_ACTIONS_LABEL')}
              </Span>
            )}
          </>
        )}
      </UserListItem>
      {showRemoveConfirmModal && onRemoveUser && (
        <RemoveConfirmModal
          onClose={(includeShared) => onRemoveUser(includeShared)}
          handleCancel={() => setShowRemoveConfirmModal(false)}
        />
      )}
    </>
  );
};
