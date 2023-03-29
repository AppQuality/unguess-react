import { AppHeader } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import i18n from 'src/i18n';
import API from 'src/common/api';
import { isMaxMedia, prepareGravatar } from 'src/common/utils';
import { theme } from 'src/app/theme';
import { selectWorkspaces } from 'src/features/workspaces/selectors';
import { Changelog } from 'src/features/navigation/Changelog';
import { usePathWithoutLocale } from 'src/features/navigation/usePathWithoutLocale';
import {
  getWorkspaceFromLS,
  saveWorkspaceToLs,
} from 'src/features/navigation/cachedStorage';
import {
  setWorkspace,
  toggleProfileModal,
  toggleSidebar,
} from 'src/features/navigation/navigationSlice';
import TagManager from 'react-gtm-module';

export const Header = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pathWithoutLocale = usePathWithoutLocale();
  const { userData: user } = useAppSelector((state) => state.user);
  const { isProfileModalOpen } = useAppSelector((state) => state.navigation);
  const workspaces = useAppSelector(selectWorkspaces);
  const { isSidebarOpen, activeWorkspace } = useAppSelector(
    (state) => state.navigation
  );

  const navigateTo = (requiredRoute: string, routeParameter?: string) => {
    let localizedRoute = '';
    if (requiredRoute === 'home') {
      localizedRoute = i18n.language === 'en' ? '/' : `/${i18n.language}`;
    } else {
      localizedRoute =
        i18n.language === 'en'
          ? `/${requiredRoute}`
          : `/${i18n.language}/${requiredRoute}`;

      if (routeParameter) {
        localizedRoute += `/${routeParameter}`;
      }
    }

    if (isMaxMedia(theme.breakpoints.sm)) {
      dispatch(toggleSidebar());
    }

    navigate(localizedRoute, { replace: true });
  };

  const toggleGtmWorkspaceChange = (workspaceName: string) => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'workspace_change',
        role: user.role,
        wp_user_id: user.tryber_wp_user_id,
        tester_id: user.id,
        name: user.name,
        email: user.email,
        company: workspaceName,
      },
    });

    // Navigate to home
    navigateTo('home');
  };

  // Get initials from name
  const getInitials = (name: string) => {
    const names = name.split(' ');
    const initials = names[0][0] + names[names.length - 1][0];
    return initials;
  };

  const toggleSidebarState = () => {
    dispatch(toggleSidebar());
  };

  const toggleProfileModalState = () => {
    dispatch(toggleProfileModal());
  };

  return (
    <AppHeader
      isStandalone
      hasChangelog
      changelogItem={<Changelog />}
      brand={{
        brandName: `${activeWorkspace?.company}'s Workspace`,
        menuLabel: t('__APP_MOBILE_NAVIGATION_MENU_LABEL MAX:5'),
        activeWorkspace,
        workspaces,
        onWorkspaceChange: (workspace: any) => {
          if (workspace.id !== activeWorkspace?.id) {
            saveWorkspaceToLs(workspace);
            API.workspacesById(workspace.id).then((ws) => {
              dispatch(setWorkspace(ws));
              toggleGtmWorkspaceChange(ws.company);
            });
          }
          // saveWorkspaceToLs(workspace);
          // dispatch(setWorkspace(workspace));
          // window.location.reload();
        },
        onClick: () => navigateTo('home'),
      }}
      avatar={{
        avatarType: user.picture ? 'image' : 'text',
        children: user.picture
          ? prepareGravatar(user.picture, 32)
          : getInitials(user.name),
      }}
      onSidebarMenuToggle={toggleSidebarState}
      isProfileModalOpen={isProfileModalOpen}
      onProfileModalToggle={toggleProfileModalState}
      onLogoItemClick={() => navigateTo('home')}
    />
  );
};
