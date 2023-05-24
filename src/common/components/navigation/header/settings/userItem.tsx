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
import { GetWorkspacesByWidUsersApiResponse } from 'src/features/api';
import styled from 'styled-components';
import { useState } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { useTranslation } from 'react-i18next';
import { theme as globalTheme } from 'src/app/theme';
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
  onResendInvite,
  onRemoveUser,
}: {
  user: GetWorkspacesByWidUsersApiResponse['items'][number];
  onResendInvite: () => void;
  onRemoveUser: () => void;
}) => {
  const { t } = useTranslation();
  const [rotated, setRotated] = useState<boolean>();
  const { userData } = useAppSelector((state) => state.user);

  const isMe = userData?.email === user.email;
  const displayName = user.name.length ? user.name : user.email;

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
                  <Span hue={globalTheme.palette.orange[600]}>
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
                <Item value="invite" onClick={onResendInvite}>
                  {t('__WORKSPACE_SETTINGS_MEMBER_RESEND_INVITE_ACTION')}
                </Item>
              )}
              <Item value="remove" onClick={onRemoveUser}>
                <Span hue={globalTheme.colors.dangerHue}>
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
