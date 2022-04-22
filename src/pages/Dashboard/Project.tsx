// import { LoginForm } from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { Page } from "src/features/templates/Page";
import { Grid, Row, Col, XXXL, theme, Skeleton, PageLoader } from "@appquality/unguess-design-system";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { Counters } from "./Counters";
import { Separator } from "./Separator";
import { CampaignsList } from "./campaigns-list";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import { useEffect } from "react";
import { getSingleProject } from "src/features/projects/actions";
import { projectFilterChanged, resetFilters } from "src/features/campaignsFilter/campaignsFilterSlice";


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
    >
    
      <Grid>
        <Row>
          <Col xs={12}>
            <XXXL style={{ color: theme.palette.blue[600] }}>
              {project ? project.name : <Skeleton width={"200px"} />}
            </XXXL>
          </Col>
        </Row>
        <Row
          style={{
            marginTop: theme.space.base * 6 + "px",
            marginBottom: theme.space.base * 6 + "px",
          }}
        >
          <Col xs={12}>
            <Counters />
          </Col>
        </Row>
      </Grid>
      <Separator />
      <Grid>
        <CampaignsList />
      </Grid>
      
   </Page>
  );
}
