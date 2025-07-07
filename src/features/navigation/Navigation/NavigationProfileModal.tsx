import {
  Notification,
  ProfileModal,
  useToast,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { isDev } from 'src/common/isDevEnvironment';
import { prepareGravatar } from 'src/common/utils';
import WPAPI from 'src/common/wpapi';
import {
  useGetUsersMePreferencesQuery,
  usePutUsersMePreferencesBySlugMutation,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { setProfileModalOpen } from '../navigationSlice';
import { usePathWithoutLocale } from '../usePathWithoutLocale';

export const NavigationProfileModal = () => {
  const isProfileModalOpen = useAppSelector(
    (state) => state.navigation.isProfileModalOpen
  );
  const { userData: user } = useAppSelector((state) => state.user);
  const { activeWorkspace } = useActiveWorkspace();

  const { addToast } = useToast();
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: preferences } = useGetUsersMePreferencesQuery();

  const notificationsPreference = preferences?.items?.find(
    (preference) => preference?.name === 'notifications_enabled'
  );
  const pathWithoutLocale = usePathWithoutLocale();

  const [updatePreference] = usePutUsersMePreferencesBySlugMutation();

  const onProfileModalClose = () => {
    dispatch(setProfileModalOpen(false));
  };

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
    profile: {
      title: t('__PROFILE_MODAL_GO_TO_PROFILE'),
      onClick: () => navigate('/profile'),
    },
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

  if (!isProfileModalOpen) return null;

  return <ProfileModal onClose={onProfileModalClose} menuArgs={profileModal} />;
};
