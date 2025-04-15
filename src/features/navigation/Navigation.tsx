import {
  Content,
  Notification,
  ProfileModal,
  Skeleton,
  useToast,
} from '@appquality/unguess-design-system';
import { ComponentProps, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { AppSidebar } from 'src/common/components/navigation/sidebar';
import { isDev } from 'src/common/isDevEnvironment';
import { prepareGravatar } from 'src/common/utils';
import WPAPI from 'src/common/wpapi';
import {
  setProfileModalOpen,
  setSidebarOpen,
  toggleSidebar,
} from 'src/features/navigation/navigationSlice';
import { NoActiveWorkSpaceState } from 'src/features/templates/NoActiveWorkspaceState';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import i18n from 'src/i18n';
import { styled } from 'styled-components';
import { Header } from '../../common/components/navigation/header/header';
import { usePathWithoutLocale } from './usePathWithoutLocale';
import {
  useGetUsersMePreferencesQuery,
  usePutUsersMePreferencesBySlugMutation,
} from '../api';

const StyledContent = styled(Content)<
  ComponentProps<typeof Content> & {
    isMinimal?: boolean;
    children?: React.ReactNode;
  }
>`
  height: ${({ isMinimal, theme }) =>
    isMinimal
      ? '100%'
      : `calc(100% - ${theme.components.chrome.header.height})`};
`;

export const Navigation = ({
  children,
  route,
  isMinimal = false,
}: {
  children: React.ReactNode;
  route: string;
  isMinimal?: boolean;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const pathWithoutLocale = usePathWithoutLocale();
  const { userData: user } = useAppSelector((state) => state.user);
  const { isProfileModalOpen } = useAppSelector((state) => state.navigation);
  const { activeWorkspace } = useActiveWorkspace();
  const { addToast } = useToast();

  const {
    data: preferences,
    isLoading: isLoadingPrefs,
    isFetching: isFetchingPrefs,
    isError,
  } = useGetUsersMePreferencesQuery();

  const notificationsPreference = preferences?.items?.find(
    (preference) => preference?.name === 'notifications_enabled'
  );

  const [updatePreference] = usePutUsersMePreferencesBySlugMutation();

  const onSetSettings = async (value: string) => {
    await updatePreference({
      slug: `${notificationsPreference?.name}`,
      body: { value },
    })
      .unwrap()
      .then(() => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="success"
              message={t('__PROFILE_MODAL_NOTIFICATIONS_UPDATED')}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
      });
  };

  useEffect(() => {
    switch (route) {
      case 'service':
      case 'campaigns':
      case 'bugs':
      case 'bug':
      case 'video':
      case 'videos':
      case 'insights':
        dispatch(setSidebarOpen(false));
        break;
      case 'template':
        dispatch(setSidebarOpen(false));
        break;
      default:
        dispatch(setSidebarOpen(true));
        break;
    }
  }, [route]);

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
    settingValue: notificationsPreference?.value ?? '0',
    i18n: {
      settingsTitle: t('__PROFILE_MODAL_NOTIFICATIONS_TITLE'),
      settingsIntroText: t('__PROFILE_MODAL_NOTIFICATIONS_INTRO'),
      settingsOutroText: {
        paragraph_1: t('__PROFILE_MODAL_NOTIFICATIONS_OUTRO_P_1'),
        paragraph_2: t('__PROFILE_MODAL_NOTIFICATIONS_OUTRO_P_2'),
        paragraph_3: t('__PROFILE_MODAL_NOTIFICATIONS_OUTRO_P_3'),
      },
      settingsToggle: {
        title: t('__PROFILE_MODAL_NOTIFICATIONS_TOGGLE_TITLE'),
        on: t('__PROFILE_MODAL_NOTIFICATIONS_TOGGLE_ON'),
        off: t('__PROFILE_MODAL_NOTIFICATIONS_TOGGLE_OFF'),
      },
    },
    onSetSettings,
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
    disableMenuLanguageSettings: true,
  };

  const toggleSidebarState = () => {
    dispatch(toggleSidebar());
  };

  const onProfileModalClose = () => {
    dispatch(setProfileModalOpen(false));
  };

  if (isLoadingPrefs) {
    return <Skeleton />;
  }
  if (isError || !preferences) {
    return null;
  }
  if (!activeWorkspace) return <NoActiveWorkSpaceState />;
  return (
    <>
      <Header
        {...(isMinimal && {
          style: { display: 'none', opacity: isFetchingPrefs ? 0.5 : 1 },
        })}
      />
      {isProfileModalOpen && (
        <ProfileModal onClose={onProfileModalClose} menuArgs={profileModal} />
      )}
      <StyledContent isMinimal={isMinimal}>
        <AppSidebar
          route={
            route === 'projects' && parameter !== ''
              ? `${route}/${parameter}`
              : route
          }
          onSidebarToggle={toggleSidebarState}
          {...(isMinimal && { style: { display: 'none' } })}
        />
        {children}
      </StyledContent>
    </>
  );
};
