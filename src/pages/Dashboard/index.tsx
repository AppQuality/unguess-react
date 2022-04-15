// import { LoginForm } from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { Page } from "src/features/templates/Page";
import { Grid, Row, Col, XXXL, theme } from "@appquality/unguess-design-system";
import { Counters } from "./Counters";
import { Separator } from "./Separator";
import { SuggestedCampaigns } from "./SuggestedCampaigns";
import { CampaignsList } from "./campaigns-list";
import { useAppDispatch } from "src/app/hooks";
import { projectFilterChanged } from "src/features/campaignsFilter/campaignsFilterSlice";

export default function Dashboard() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  dispatch(dispatch(projectFilterChanged(0))); //Reset filters

  return (
    <Page title={t("__PAGE_TITLE_PRIMARY_DASHBOARD")} route={""}>
      <Grid>
        <Row>
          <Col xs={12}>
            <XXXL style={{ color: theme.palette.blue[600] }}>
              {t("__PAGE_TITLE_PRIMARY_DASHBOARD")}
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
