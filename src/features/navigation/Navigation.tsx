import {
  AppHeader,
  Content,
  Sidebar,
  ProfileModal,
  PageLoader,
  theme,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  toggleSidebar,
  setWorkspace,
  toggleProfileModal,
  setProfileModalOpen,
} from 'src/features/navigation/navigationSlice';
import WPAPI from 'src/common/wpapi';
import i18n from 'src/i18n';
import { useNavigate, useParams } from 'react-router-dom';
import { prepareGravatar, isMaxMedia } from 'src/common/utils';
import { Changelog } from './Changelog';
import { useGetWorkspacesByWidProjectsQuery } from '../api';
import { saveWorkspaceToLs } from './cachedStorage';
import { isValidWorkspace } from './utils';

export const Navigation = ({
  children,
  route,
}: {
  children: React.ReactNode;
  route: string;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userData: user } = useAppSelector((state) => state.user);
  const { isProfileModalOpen } = useAppSelector((state) => state.navigation);
  const { isSidebarOpen, activeWorkspace } = useAppSelector(
    (state) => state.navigation
  );

  const { workspaces } = user;

  if (!activeWorkspace || !isValidWorkspace(activeWorkspace, workspaces)) {
    // dispatch(getWorkspaces());
    if (workspaces.length) dispatch(setWorkspace(workspaces[0]));
  }
  // Set current params
  const params = useParams();

  let parameter = '';

  if (params) {
    Object.keys(params).forEach((key) => {
      if (key !== 'language') {
        parameter = params[`${key}`] ?? '';
      }
    });
  }

  const projects = useGetWorkspacesByWidProjectsQuery({
    wid: activeWorkspace?.id || 0,
  });

  if (projects.isFetching || projects.isLoading) {
    return <PageLoader />;
  }

  const projectsList =
    !projects.data || !projects.data.items
      ? []
      : projects.data.items.reduce((filtered: Array<any>, project) => {
          if (project.campaigns_count) {
            filtered.push({
              id: `${project.id}`,
              title: project.name || '-',
              campaigns: `${project.campaigns_count} ${t(
                '__SIDEBAR_CAMPAIGNS_LABEL'
              )}`,
            });
          }
          return filtered;
        }, []);

  // Get initials from name
  const getInitials = (name: string) => {
    const names = name.split(' ');
    const initials = names[0][0] + names[names.length - 1][0];
    return initials;
  };

  const profileModal = {
    user: {
      name: user.name,
      email: user.email,
      company: activeWorkspace?.company || '',
      ...(user.picture && { picture: prepareGravatar(user.picture) }),
    },
    csm: {
      name: activeWorkspace?.csm.name || '',
      email: activeWorkspace?.csm.email || '',
      ...(activeWorkspace?.csm.picture && {
        picture: prepareGravatar(activeWorkspace?.csm.picture),
      }),
    },
    languages: {
      en: {
        key: 'en',
        label: t('English'), // TODO: i18n strings for languages
      },
      it: {
        key: 'it',
        label: t('Italian'),
      },
    },
    currentLanguage: i18n.language,
    feedbackTitle: t('__PROFILE_MODAL_FEEDBACK_TITLE'),
    feedbackSubTitle: t('__PROFILE_MODAL_FEEDBACK_SUBTITLE'),
    csmTitle: t('__PROFILE_MODAL_CSM_TITLE'),
    csmContactLabel: t('__PROFILE_MODAL_CSM_CONTACT_LABEL'),
    languageTitle: t('__PROFILE_MODAL_LANGUAGES_TITLE'),
    logoutTitle: t('__PROFILE_MODAL_LOGOUT_TITLE'),
    currentLanguageLabel: t('__PROFILE_MODAL_CURRENT_LANGUAGE_LABEL'),
    copyLabel: t('__PROFILE_MODAL_COPY_LABEL'),
    chatSupportLabel: t('__PROFILE_MODAL_CHAT_SUPPORT_LABEL'),
    onSelectLanguage: (lang: string) => {
      let translatedRoute = route;

      if (route === '') {
        translatedRoute = lang === 'en' ? '/' : `/${lang}`;
      } else {
        const localizedRoute =
          lang === 'en'
            ? `/${route}/${parameter}`
            : `/${lang}/${route}/${parameter}`;
        // in case of base route ("") we already have a forward slash
        const re = /\/$/;
        translatedRoute = re.test(localizedRoute)
          ? localizedRoute
          : `${localizedRoute}/`;
      }

      document.location.href = translatedRoute;
    },
    onToggleChat: () => {
      if (typeof customerly !== 'undefined') {
        customerly.open();
      }
    },
    onLogout: async () => {
      await WPAPI.logout();
    },
  };

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

  const toggleSidebarState = () => {
    dispatch(toggleSidebar());
  };

  const toggleProfileModalState = () => {
    dispatch(toggleProfileModal());
  };

  const onProfileModalClose = () => {
    dispatch(setProfileModalOpen(false));
  };

  return (
    <>
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
            saveWorkspaceToLs(workspace);
            dispatch(setWorkspace(workspace));
          },
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
      {isProfileModalOpen && (
        <ProfileModal onClose={onProfileModalClose} menuArgs={profileModal} />
      )}
      <Content>
        <Sidebar
          projects={projectsList}
          isExpanded={isSidebarOpen}
          onToggleMenu={toggleSidebarState}
          dividerLabel={t('__APP_SIDEBAR_PROJECTS_DIVIDER_LABEL')}
          onNavToggle={navigateTo}
          currentRoute={
            route === 'projects' && parameter !== ''
              ? `${route}/${parameter}`
              : route
          }
          homeItemLabel={t('__APP_SIDEBAR_HOME_ITEM_LABEL')}
          servicesItemLabel={t('__APP_SIDEBAR_SERVICES_ITEM_LABEL')}
          activeWorkspace={activeWorkspace}
          workspaces={workspaces}
          features={user.features || []}
          onWorkspaceChange={(workspace: any) => {
            saveWorkspaceToLs(workspace);
            dispatch(setWorkspace(workspace));
          }}
        />
        {children}
      </Content>
    </>
  );
};
