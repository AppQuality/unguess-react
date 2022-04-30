// import { LoginForm } from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { Page } from "src/features/templates/Page";
import { Grid, PageLoader } from "@appquality/unguess-design-system";
import { useAppDispatch } from "src/app/hooks";
import { CampaignsList } from "./campaigns-list";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import {
  projectFilterChanged,
  resetFilters,
} from "src/features/campaignsFilter/campaignsFilterSlice";
import { ActionCards } from "./ActionCards";
import { DashboardHeaderContent } from "./headerContent";
import { useGetProjectsByPidQuery } from "src/features/api/endpoints/projects";

export default function Project() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notFoundRoute = useLocalizeRoute("oops");

  var { projectId } = useParams();
  
  if (!projectId || isNaN(Number(projectId))) {
    navigate(notFoundRoute, { replace: true });
  }
  
  const project = useGetProjectsByPidQuery({ pid: projectId ? parseInt(projectId) : 0 });

  if (project.isError)
    navigate(notFoundRoute, { replace: true });

  if (project.isSuccess && project.data) {
    dispatch(resetFilters());
    dispatch(projectFilterChanged(project.data.id));
  }

  return project.isFetching || project.isLoading ? (
    <PageLoader />
  ) : (
    <Page
      title={t("__PAGE_TITLE_PRIMARY_DASHBOARD_SINGLE_PROJECT")}
      route={"projects"}
      pageHeader={
        <DashboardHeaderContent title={project?.data?.name || "undefined"} />
      }
    >
      <Grid>
        <ActionCards />
        <CampaignsList />
      </Grid>
    </Page>
  );
}
