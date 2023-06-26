import {
  Content,
  ProfileModal,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  toggleSidebar,
  setWorkspace,
  setProfileModalOpen,
  setSidebarOpen,
} from 'src/features/navigation/navigationSlice';
import { AppSidebar } from 'src/common/components/navigation/sidebar';
import WPAPI from 'src/common/wpapi';
import i18n from 'src/i18n';
import { useParams } from 'react-router-dom';
import { prepareGravatar } from 'src/common/utils';
import { useEffect } from 'react';
import API from 'src/common/api';
import { isDev } from 'src/common/isDevEnvironment';
import { getWorkspaceFromLS } from './cachedStorage';
import { isValidWorkspace } from './utils';
import { selectWorkspaces } from '../workspaces/selectors';
import { usePathWithoutLocale } from './usePathWithoutLocale';
import { Header } from '../../common/components/navigation/header/header';

const cachedWorkspace = getWorkspaceFromLS();

export const Navigation = ({
  children,
  route,
}: {
  children: React.ReactNode;
  route: string;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const pathWithoutLocale = usePathWithoutLocale();
  const { userData: user } = useAppSelector((state) => state.user);
  const { isProfileModalOpen } = useAppSelector((state) => state.navigation);
  const workspaces = useAppSelector(selectWorkspaces);
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const { addToast } = useToast();

  // Set isSidebarOpen to false for specific routes
  useEffect(() => {
    switch (route) {
      case 'service':
      case 'campaigns':
      case 'bugs':
      case 'bug':
        dispatch(setSidebarOpen(false));
        break;
      default:
        dispatch(setSidebarOpen(true));
        break;
    }
  }, [route]);

  useEffect(() => {
    if (workspaces && !activeWorkspace) {
      const fetchWS = async () => {
        try {
          const verifiedWs = cachedWorkspace
            ? isValidWorkspace(cachedWorkspace, workspaces)
            : false;

          API.workspacesById(
            verifiedWs ? verifiedWs.id : workspaces[0].id
          ).then((ws) => {
            dispatch(setWorkspace(ws));
          });
        } catch (e) {
          dispatch(setWorkspace(workspaces[0]));
        }
      };

      fetchWS();
    }
  }, [workspaces]);

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
        label: t('__APP_LANGUANGE_EN_TEXT'), // TODO: i18n strings for languages
      },
      it: {
        key: 'it',
        label: t('__APP_LANGUANGE_IT_TEXT'),
      },
      ...(isDev() && { ach: { key: 'ach', label: 'Acholi' } }),
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
    privacy: {
      title: t('__PROFILE_MODAL_PRIVACY_ITEM_LABEL'),
      url: 'https://www.iubenda.com/privacy-policy/833252/full-legal',
    },
    onSelectLanguage: (lang: string) => {
      if (pathWithoutLocale === false) return;
      if (lang === i18n.language) return;

      if (lang === 'en') {
        document.location.href = pathWithoutLocale;
      } else {
        document.location.href = `/${lang}${pathWithoutLocale}`;
      }
    },
    onToggleChat: () => {
      if (
        typeof HubSpotConversations !== 'undefined' &&
        HubSpotConversations.widget
      ) {
        HubSpotConversations.widget.open();
      }
    },
    onLogout: async () => {
      await WPAPI.logout();
    },
    onCopyEmail: () => {
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="success"
            message={t('__NOTIFICATION_PROFILE_MODAL_COPY_EMAIL_MESSAGE')}
            closeText={t('__NOTIFICATION_CLOSE_TEXT')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
    },
  };

  const toggleSidebarState = () => {
    dispatch(toggleSidebar());
  };

  const onProfileModalClose = () => {
    dispatch(setProfileModalOpen(false));
  };

  if (!activeWorkspace) return null;

  return (
    <>
      <Header />
      {isProfileModalOpen && (
        <ProfileModal onClose={onProfileModalClose} menuArgs={profileModal} />
      )}
      <Content>
        <AppSidebar
          route={
            route === 'projects' && parameter !== ''
              ? `${route}/${parameter}`
              : route
          }
          onSidebarToggle={toggleSidebarState}
        />
        {children}
      </Content>
    </>
  );
};
