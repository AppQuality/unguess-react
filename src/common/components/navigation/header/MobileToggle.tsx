import {
  HeaderItem,
  HeaderItemIcon,
  HeaderItemText,
  retrieveComponentStyles,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { ReactComponent as MenuIcon } from 'src/assets/icons/menu-stroke.svg';
import { toggleSidebar } from 'src/features/navigation/navigationSlice';
import styled from 'styled-components';

export const LogoIconContainer = styled(HeaderItem)`
  margin-right: 2px;
  border-right: none;
  cursor: pointer;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    right: 0;
    left: 0;
    margin-right: auto;
    margin-left: auto;
    position: absolute;
  }
`;

const MenuItem = styled(HeaderItem)`
  ${(props) => retrieveComponentStyles('text.primary', props)};
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const MobileToggle = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const toggleSidebarState = () => {
    dispatch(toggleSidebar());
  };

  return (
    <MenuItem onClick={toggleSidebarState}>
      <HeaderItemIcon>
        <MenuIcon />
      </HeaderItemIcon>
      <HeaderItemText>
        {t('__APP_MOBILE_NAVIGATION_MENU_LABEL MAX:5')}
      </HeaderItemText>
    </MenuItem>
  );
};
