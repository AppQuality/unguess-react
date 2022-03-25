// import { LoginForm } from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { Page } from "src/features/templates/Page";
import { Grid, Row, Col } from "@appquality/unguess-design-system";
import { useAppSelector } from "src/app/hooks";

export default function Dashboard() {
  const { t } = useTranslation();

  const { status, userData } = useAppSelector((state) => state.user);

  return (
    <Page
      title={t("__PAGE_TITLE_PRIMARY_DASHBOARD")}
      route={""}
    >
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <h1>{t("__PAGE_TITLE_PRIMARY_DASHBOARD")}</h1>
              {JSON.stringify(userData)}
              --- Status
              {JSON.stringify(status)}
            </Col>
          </Row>
        </Grid>
        </div>
    </Page>
  );
}
