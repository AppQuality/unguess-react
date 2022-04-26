// import { LoginForm } from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { Page } from "src/features/templates/Page";
import { Grid, PageLoader } from "@appquality/unguess-design-system";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { CampaignsList } from "./campaigns-list";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import { useEffect } from "react";
import { getSingleProject } from "src/features/projects/actions";
import { projectFilterChanged, resetFilters } from "src/features/campaignsFilter/campaignsFilterSlice";
import { ActionCards } from "./ActionCards";
import { DashboardHeaderContent } from "./headerContent";


export default function Project() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const notFoundRoute = useLocalizeRoute("oops");

  const { status } = useAppSelector((state) => state.projects);

  var { projectId } = useParams();
  
  useEffect(() => {
    if(projectId && !isNaN(Number(projectId))) {
      dispatch(getSingleProject(parseInt(projectId)));
    }
  }, [dispatch, projectId]);

  const { currentProject: project } = useAppSelector((state) => state.projects);

  if(!project && status !== 'loading') navigate(notFoundRoute, { replace: true }); 

  if(project) {
    dispatch(resetFilters());
    dispatch(projectFilterChanged(project.id))
  }

  return status === 'loading' ? <PageLoader /> : (
    <Page
      title={t("__PAGE_TITLE_PRIMARY_DASHBOARD_SINGLE_PROJECT")}
      route={"projects"}
      pageHeader={<DashboardHeaderContent title={project?.name || "undefined"}/>}
    >
  

      <Grid>
        <ActionCards />
        <CampaignsList />
      </Grid>
      
   </Page>
  );
}
