// import { LoginForm } from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { Page } from "src/features/templates/Page";
import { Grid, Row, Col, XXXL, theme, Skeleton } from "@appquality/unguess-design-system";
import { useAppSelector } from "src/app/hooks";
import { Counters } from "./Counters";
import { Separator } from "./Separator";
import { SuggestedCampaigns } from "./SuggestedCampaigns";
import { CampaignsList } from "./campaigns-list";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { selectProjectById } from "src/features/projects/projectSlice";import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import PageLoader from "src/features/templates/PageLoader";
;

export default function Project() {
  const { t } = useTranslation();
  const homeRoute = useLocalizeRoute("");
  const navigate = useNavigate();

  const { projectId } = useParams();

  if(!projectId) {
    navigate(homeRoute);
  }

  const project = useAppSelector((state) => selectProjectById(state, projectId || 0));

  return (
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
        <SuggestedCampaigns />
        <CampaignsList />
      </Grid>
    </Page>
  );
}
