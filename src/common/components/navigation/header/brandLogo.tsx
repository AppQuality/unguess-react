import {
  HeaderItem,
  HeaderItemIcon,
  HeaderItemText,
  Logo,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { toggleSidebar } from 'src/features/navigation/navigationSlice';
import { retrieveComponentStyles } from '@zendeskgarden/react-theming';
import { ReactComponent as MenuIcon } from 'src/assets/icons/menu-stroke.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { WorkspacesDropdown } from './workspaceDropdown';

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
  position: absolute;
  left: 0;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const BrandLogo = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleSidebarState = () => {
    dispatch(toggleSidebar());
  };

  const handleLogoClick = () => {
    navigate('/'); // Navigate to the root route
  };

  return (
    <>
      <MenuItem onClick={toggleSidebarState}>
        <HeaderItemIcon>
          <MenuIcon />
        </HeaderItemIcon>
        <HeaderItemText>
          {t('__APP_MOBILE_NAVIGATION_MENU_LABEL MAX:5')}
        </HeaderItemText>
      </MenuItem>
      <LogoIconContainer hasLogo>
        <HeaderItemIcon onClick={handleLogoClick}>
          <Logo type="icon" size={150} />
        </HeaderItemIcon>
      </LogoIconContainer>
      <WorkspacesDropdown />
    </>
  );
};
