import {
  Avatar,
  Span,
  Trigger,
  Menu,
  Button,
  Dropdown,
  Item,
  Ellipsis,
  SM,
  MD,
  getColor,
} from '@appquality/unguess-design-system';
import { ReactComponent as ChevronIcon } from 'src/assets/icons/chevron-down-stroke.svg';
import { GetWorkspacesByWidUsersApiResponse } from 'src/features/api';
import styled from 'styled-components';
import { useState } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
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
  const [rotated, setRotated] = useState<boolean>();
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
          <StyledEllipsis>
            <MD
              isBold
              style={{
                color: getColor(appTheme.colors.primaryHue, 600),
              }}
            >
              {user.name.length ? user.name : user.email}{' '}
              {isMe && t('__WORKSPACE_SETTINGS_CURRENT_MEMBER_YOU_LABEL')}
            </MD>
          </StyledEllipsis>
          {user.name.length > 0 && (
            <StyledEllipsis>
              <SM
                style={{
                  color: appTheme.palette.grey[700],
                }}
              >
                {user.email}
              </SM>
            </StyledEllipsis>
          )}
        </div>
        {onResendInvite && onRemoveUser ? (
          <div style={{ marginLeft: 'auto' }}>
            {!isMe && (
              <Dropdown
                onStateChange={(options) =>
                  Object.hasOwn(options, 'isOpen') && setRotated(options.isOpen)
                }
              >
                <Trigger>
                  <Button isBasic aria-label="user management actions">
                    {user.invitationPending ? (
                      <Span hue={appTheme.palette.orange[600]}>
                        {t(
                          '__WORKSPACE_SETTINGS_MEMBER_INVITATION_PENDING_LABEL'
                        )}
                      </Span>
                    ) : (
                      t('__WORKSPACE_SETTINGS_MEMBER_ACTIONS_LABEL')
                    )}
                    <Button.EndIcon isRotated={rotated}>
                      <ChevronIcon />
                    </Button.EndIcon>
                  </Button>
                </Trigger>
                <Menu placement="bottom-end">
                  {user.invitationPending && (
                    <Item value="invite" onClick={onResendInvite}>
                      {t('__WORKSPACE_SETTINGS_MEMBER_RESEND_INVITE_ACTION')}
                    </Item>
                  )}
                  <Item
                    value="remove"
                    onClick={
                      showRemoveConfirm
                        ? handleRemoveUser
                        : () => onRemoveUser()
                    }
                  >
                    <Span hue={appTheme.components.text.dangerColor}>
                      {t('__WORKSPACE_SETTINGS_MEMBER_REMOVE_USER_ACTION')}
                    </Span>
                  </Item>
                </Menu>
              </Dropdown>
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
