import {
  Avatar,
  Span,
  Trigger,
  Menu,
  Button,
  Dropdown,
  Item,
  Ellipsis,
} from '@appquality/unguess-design-system';
import { ReactComponent as ChevronIcon } from 'src/assets/icons/chevron-down-stroke.svg';
import {
  GetWorkspacesByWidUsersApiResponse,
  useDeleteWorkspacesByWidUsersMutation,
  usePostWorkspacesByWidUsersMutation,
} from 'src/features/api';
import styled from 'styled-components';
import { useState } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { getInitials } from '../utils';

const StyledEllipsis = styled(Ellipsis)``;
const UserListItem = styled.div`
  display: flex;
  padding: ${({ theme }) => `${theme.space.xs} 0`};
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};

  div.actions {
    margin-left: auto;
  }

  ${StyledEllipsis} {
    width: 300px;
  }
`;

export const UserItem = ({
  user,
}: {
  user: GetWorkspacesByWidUsersApiResponse['items'][number];
}) => {
  const { t } = useTranslation();
  const [rotated, setRotated] = useState<boolean>();
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const { userData } = useAppSelector((state) => state.user);
  const [removeUser] = useDeleteWorkspacesByWidUsersMutation();
  const [addNewMember] = usePostWorkspacesByWidUsersMutation();

  const isMe = userData?.email === user.email;
  const displayName = user.name.length ? user.name : user.email;

  if (!activeWorkspace) return null;

  return (
    <UserListItem key={`profile_${user.profile_id}`}>
      <Avatar avatarType="text">{getInitials(displayName)}</Avatar>
      <div>
        <StyledEllipsis>
          {displayName}{' '}
          {isMe && t('__WORKSPACE_SETTINGS_CURRENT_MEMBER_YOU_LABEL')}
        </StyledEllipsis>
      </div>
      <div className="actions">
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
                    {t('__WORKSPACE_SETTINGS_MEMBER_INVITATION_PENDING_LABEL')}
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
                <Item
                  value="invite"
                  onClick={() =>
                    addNewMember({
                      wid: activeWorkspace.id.toString() || '0',
                      body: {
                        email: user.email,
                      },
                    }).unwrap()
                  }
                >
                  {t('__WORKSPACE_SETTINGS_MEMBER_RESEND_INVITE_ACTION')}
                </Item>
              )}
              <Item
                value="remove"
                onClick={() =>
                  removeUser({
                    wid: activeWorkspace.id.toString() || '0',
                    body: {
                      user_id: user.id,
                    },
                  }).unwrap()
                }
              >
                <Span hue={appTheme.colors.dangerHue}>
                  {t('__WORKSPACE_SETTINGS_MEMBER_REMOVE_USER_ACTION')}
                </Span>
              </Item>
            </Menu>
          </Dropdown>
        )}
      </div>
    </UserListItem>
  );
};
