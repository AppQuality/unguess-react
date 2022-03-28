import {
  AppHeader,
  Content,
  Main,
  Sidebar,
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
} from "src/features/navigation/navigationSlice";
import { selectWorkspaceById, selectWorkspaces } from "../workspaces/workspaceSlice";

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

  const workspaces = useAppSelector(selectWorkspaces);

  const toggleSidebarState = () => {
    dispatch(toggleSidebar());
  };

  useEffect(() => {
    if (!activeWorkspace) {
      dispatch(getWorkspaces());
      if(workspaces.length) dispatch(setWorkspace(workspaces[0]));
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
      />

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
