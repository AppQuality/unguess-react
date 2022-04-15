import {
  AppHeader,
  Content,
  Main,
  Sidebar,
  ProfileModal,
  PageLoader
} from "@appquality/unguess-design-system";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { getProjects } from "src/features/projects/actions";
import { getWorkspaces } from "src/features/workspaces/actions";
import { getCampaigns } from "src/features/campaigns/actions";
import {
  toggleSidebar,
  setWorkspace,
  toggleProfileModal,
  setProfileModalOpen,
} from "src/features/navigation/navigationSlice";
import { selectWorkspaces } from "../workspaces/workspaceSlice";
import { selectProjects } from "../projects/projectSlice";
import WPAPI from "src/common/wpapi";
import i18n from "src/i18n";
import { useNavigate, useParams } from "react-router-dom";
import { Changelog } from "./Changelog";

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


  //Set current params
  const params = useParams();

  let parameter = "";

  if (params) {
    Object.keys(params).forEach((key) => {
      if (key !== "language") {
        parameter = params[key] ?? "";
      }
    });
  }

  const { isSidebarOpen, activeWorkspace } = useAppSelector(
    (state) => state.navigation
  );

  const { status } = useAppSelector((state) => state.projects);

  const projects = useAppSelector(selectProjects);
  const { isProfileModalOpen } = useAppSelector((state) => state.navigation);

  const workspaces = useAppSelector(selectWorkspaces);

  const toggleSidebarState = () => {
    dispatch(toggleSidebar());
  };

  const toggleProfileModalState = () => {
    dispatch(toggleProfileModal());
  };

  const onProfileModalClose = () => {
    dispatch(setProfileModalOpen(false));
  };

  useEffect(() => {
    if (!activeWorkspace) {
      dispatch(getWorkspaces());
      if (workspaces.length) dispatch(setWorkspace(workspaces[0]));
    } else {
      dispatch(getProjects(activeWorkspace.id));
      dispatch(
        getCampaigns({
          wid: activeWorkspace.id,
          query: {
            limit: 10000, //TODO: remove this limit
          },
        })
      );
    }
  }, [activeWorkspace, dispatch, workspaces]);

  if (status === "idle" || status === "loading") {
    return <PageLoader />;
  }

  const projectsList = projects.reduce((filtered: Array<any>, project) => {
    if (project.campaigns_count) {
      filtered.push({
        id: project.id + "",
        title: project.name || "-",
        campaigns: `${project.campaigns_count} ` + t("__SIDEBAR_CAMPAIGNS_LABEL"),
      });
    }
    return filtered;
  }, []);
  

  //Get initials from name
  const getInitials = (name: string) => {
    const names = name.split(" ");
    const initials = names[0][0] + names[names.length - 1][0];
    return initials;
  };

  const profileModal = {
    user: {
      name: user.name,
      email: user.email,
      company: activeWorkspace?.company || "",
      ...(user.picture && { picture: user.picture }),
    },
    csm: {
      name: activeWorkspace?.csm.name || "",
      email: activeWorkspace?.csm.email || "",
      ...(activeWorkspace?.csm.picture && {
        picture: activeWorkspace?.csm.picture,
      }),
    },
    languages: {
      en: {
        key: "en",
        label: t("English"), // TODO: i18n strings for languages
      },
      it: {
        key: "it",
        label: t("Italian"),
      },
    },
    currentLanguage: i18n.language,
    feedbackTitle: t("__PROFILE_MODAL_FEEDBACK_TITLE"),
    feedbackSubTitle: t("__PROFILE_MODAL_FEEDBACK_SUBTITLE"),
    csmTitle: t("__PROFILE_MODAL_CSM_TITLE"),
    csmContactLabel: t("__PROFILE_MODAL_CSM_CONTACT_LABEL"),
    languageTitle: t("__PROFILE_MODAL_LANGUAGES_TITLE"),
    logoutTitle: t("__PROFILE_MODAL_LOGOUT_TITLE"),
    currentLanguageLabel: t("__PROFILE_MODAL_CURRENT_LANGUAGE_LABEL"),
    copyLabel: t("__PROFILE_MODAL_COPY_LABEL"),
    chatSupportLabel: t("__PROFILE_MODAL_CHAT_SUPPORT_LABEL"),
    onSelectLanguage: (lang: string) => {
      let translatedRoute = route;

      if (route === "") {
        translatedRoute = lang === "en" ? "/" : `/${lang}`;
      } else {
        let localizedRoute =
          lang === "en"
            ? `/${route}/${parameter}`
            : `/${lang}/${route}/${parameter}`;
        // in case of base route ("") we already have a forward slash
        let re = /\/$/;
        translatedRoute = re.test(localizedRoute)
          ? localizedRoute
          : `${localizedRoute}/`;
      }

      document.location.href = translatedRoute;
    },
    onToggleChat: () => {
      if(typeof customerly !== undefined) {
        customerly.open();
      }
    },
    onLogout: async () => {
      await WPAPI.logout();
    },
  };

  const navigateTo = (route: string) => {
    let localizedRoute = "";
    if (route === "home") {
      localizedRoute = i18n.language === "en" ? "/" : `/${i18n.language}`;
    } else {
      localizedRoute =
        i18n.language === "en"
          ? `/projects/${route}`
          : `/${i18n.language}/projects/${route}`;
    }

    navigate(localizedRoute);
  };

  return (
    <>
      <AppHeader
        isStandalone
        hasChangelog
        changelogItem={<Changelog />}
        brand={{
          brandName: `${activeWorkspace?.company}'s Workspace`,
          menuLabel: t("__APP_MOBILE_NAVIGATION_MENU_LABEL MAX:5"),
        }}
        avatar={{
          avatarType: user.picture ? "image" : "text",
          children: user.picture ?? getInitials(user.name),
        }}
        onSidebarMenuToggle={toggleSidebarState}
        isProfileModalOpen={isProfileModalOpen}
        onProfileModalToggle={toggleProfileModalState}
        onLogoItemClick={() => navigateTo("home")}
      />
      {isProfileModalOpen && (
        <ProfileModal onClose={onProfileModalClose} menuArgs={profileModal} />
      )}
      <Content>
        <Sidebar
          projects={projectsList}
          isExpanded={isSidebarOpen}
          onToggleMenu={toggleSidebarState}
          dividerLabel={t("__APP_SIDEBAR_PROJECTS_DIVIDER_LABEL")}
          onNavToggle={navigateTo}
          currentRoute={parameter !== "" ? parameter : route}
          homeItemLabel={t("__APP_SIDEBAR_HOME_ITEM_LABEL")}
        />
        <Main>{children}</Main>
      </Content>
    </>
  );
};
