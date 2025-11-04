import {
  Avatar,
  Ellipsis,
  getColor,
  IconButton,
  MD,
  SM,
  Tooltip,
  useToast,
} from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as XStroke } from 'src/assets/icons/x-stroke.svg';
import { getInitials } from 'src/common/components/navigation/header/utils';
import { prepareGravatar } from 'src/common/utils';
import { usePlanIsApproved } from 'src/hooks/usePlan';
import styled from 'styled-components';
import { useIsLastOne } from './hooks/useIsLastOne';
import { useRemoveWatcher } from './hooks/useRemoveWatcher';

const StyledEllipsis = styled(Ellipsis)``;

const UserListItem = styled.div`
  display: flex;
  padding: ${({ theme }) => `${theme.space.xs} 0`};
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};

  ${StyledEllipsis} {
    width: 250px;
  }
`;

const UserAvatar = ({
  image,
  name,
  isInternal,
}: {
  image?: string;
  name: string;
  isInternal: boolean;
}) => {
  if (isInternal) {
    return <Avatar avatarType="system" />;
  }
  return (
    <Avatar avatarType={image ? 'image' : 'text'}>
      {image ? prepareGravatar(image, 64) : getInitials(name)}
    </Avatar>
  );
};

const UserItem = ({
  planId,
  user,
}: {
  planId: string;
  user: {
    id: number;
    name: string;
    email: string;
    image?: string;
    isInternal: boolean;
    isMe?: boolean;
  };
}) => {
  const { isMe } = user;
  const { addToast } = useToast();
  const isLastOne = useIsLastOne({ planId });
  const isApproved = usePlanIsApproved(planId);

  const { removeWatcher } = useRemoveWatcher();

  const iconButton = (
    <IconButton
      disabled={isLastOne}
      onClick={() => removeWatcher({ planId, profileId: user.id.toString() })}
    >
      <XStroke />
    </IconButton>
  );

  return (
    <UserListItem>
      <div style={{ paddingLeft: '2px' }}>
        <UserAvatar
          image={user.image}
          name={user.name.length ? user.name : user.email}
          isInternal={user.isInternal}
        />
      </div>
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
      <div>
        {isLastOne
          ? !isApproved && (
              <Tooltip
                placement="top"
                type="light"
                size="medium"
                content={t(
                  '__PLAN_PAGE_WATCHER_LIST_MODAL_REMOVE_BUTTON_DISABLED_TOOLTIP'
                )}
              >
                {/* the following div is necessary to make Tooltip work with disabled IconButton */}
                <div>{iconButton}</div>
              </Tooltip>
            )
          : !isApproved && iconButton}
      </div>
    </UserListItem>
  );
};

export { UserItem };
