import {
  Avatar,
  HeaderItem,
  HeaderItemIcon,
  IconButton,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { prepareGravatar } from 'src/common/utils';
import { toggleProfileModal } from 'src/features/navigation/navigationSlice';
import { ReactComponent as ChevronIcon } from 'src/assets/icons/chevron-down-stroke.svg';
import { ReactComponent as Crown } from 'src/assets/icons/crown.svg';
import styled from 'styled-components';
import { getInitials } from './utils';

const ChevronButton = styled(IconButton)`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export const ProfileAvatar = () => {
  const dispatch = useAppDispatch();
  const { userData: user } = useAppSelector((state) => state.user);
  const { isProfileModalOpen } = useAppSelector((state) => state.navigation);

  const toggleProfileModalState = () => {
    dispatch(toggleProfileModal());
  };

  return (
    <HeaderItem isRound onClick={toggleProfileModalState}>
      <HeaderItemIcon>
        {!user ? (
          <Skeleton
            width="32px"
            height="32px"
            style={{ borderRadius: '100%' }}
          />
        ) : (
          <>
            {user.role === 'administrator' && (
              <Crown
                style={{
                  maxHeight: '40px',
                  maxWidth: '40px',
                  marginRight: '15px',
                }}
              />
            )}
            <Avatar avatarType={user.picture ? 'image' : 'text'}>
              {user.picture
                ? prepareGravatar(user.picture, 64)
                : getInitials(user.name)}
            </Avatar>
            <ChevronButton size="small" isRotated={isProfileModalOpen}>
              <ChevronIcon />
            </ChevronButton>
          </>
        )}
      </HeaderItemIcon>
    </HeaderItem>
  );
};
