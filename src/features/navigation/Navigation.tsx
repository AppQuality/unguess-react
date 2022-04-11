import {
  AppHeader,
  Content,
  Main,
  Sidebar,
  ProfileModal
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
import WPAPI from "src/common/wpapi";

export const Navigation = ({
  children,
  route,
  user,
}: {
  children: React.ReactNode;
  route: string;
  user: Users["getUserMe"];
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { isSidebarOpen, activeWorkspace } = useAppSelector(
    (state) => state.navigation
  );

  const { status, projects } = useAppSelector(
    (state) => state.projects
  );

  const { isProfileModalOpen } = useAppSelector(
    (state) => state.navigation
  );

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
      dispatch(getCampaigns(activeWorkspace.id));
    }
  }, [activeWorkspace, dispatch, workspaces]);

  if (status === "idle" || status === "loading") {
    return <>Loading...</>;
  }

  const projectsList = projects.map((project) => ({
    id: project.id + "",
    title: project.name || "-",
    campaigns: `${project.campaigns_count} campaigns`,
  }));

  //Get initials from name
  const getInitials = (name: string) => {
    const names = name.split(" ");
    const initials = names.map((name) => name[0]).join("");
    return initials;
  };

  const profileModal = {
    user: {
      name: user.name,
      email: user.email,
      company: activeWorkspace?.company || "",
      // picture: user.picture,
    },
    csm: {
      name: activeWorkspace?.csm.name || "",
      email: activeWorkspace?.csm.email || "",
      // picture: activeWorkspace?.csm.picture,
    },
    languages: {
      en: {
        key: "en",
        label: "English", // TODO: i18n strings for languages
      },
      fr: {
        key: "fr",
        label: "French",
      },
      it: {
        key: "it",
        label: "Italian",
      }
    },
    currentLanguage: "en",
    onSelectLanguage: (lang: string) => {
      if (lang !== "en") {
        document.location.href = "/" + lang;
      }

      document.location.href = "/";
    },
    onFeedbackClick: () => {
      /** TODO: Pendo */
    },
    onToggleChat: () => {
      /** TODO: https://docs.customerly.io/api/is-it-possible-to-open-the-live-chat-directly-from-a-link-or-a-custom-button */
    },
    onLogout: async () => {
      await WPAPI.logout();
    },
  };

  return (
    <>
      <AppHeader
        isStandalone
        hasChangelog
        brand={{
          brandName: `${activeWorkspace?.company}'s Workspace`,
          menuLabel: t("__APP_MOBILE_NAVIGATION_MENU_LABEL MAX:5"),
        }}
        avatar={{
          avatarType: "text",
          children: getInitials(user.name),
        }}
        onSidebarMenuToggle={toggleSidebarState}
        isProfileModalOpen={isProfileModalOpen}
        onProfileModalToggle={toggleProfileModalState}
      />
      {isProfileModalOpen && <ProfileModal onClose={onProfileModalClose} menuArgs={profileModal} />}
      <Content>
        <Sidebar
          projects={projectsList}
          isExpanded={isSidebarOpen}
          onToggleMenu={toggleSidebarState}
          dividerLabel={t("__APP_SIDEBAR_PROJECTS_DIVIDER_LABEL")}
        />
        <Main>{children}</Main>
      </Content>
    </>
  );
};
