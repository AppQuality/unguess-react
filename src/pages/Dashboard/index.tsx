// import { LoginForm } from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { Page } from "src/features/templates/Page";
import {
  Grid,
  Row,
  Col,
  XXXL,
  theme,
} from "@appquality/unguess-design-system";
import { useAppSelector } from "src/app/hooks";
import { Counters } from "./Counters";
import styled from "styled-components";
import { SuggestedCampaigns } from "./SuggestedCampaigns";

const Separator = styled.hr`
  margin: ${theme.space.base * 6}px 0 ${theme.space.base * 8}px 0;
  border: none;
  border-top: 1px solid ${theme.palette.grey[300]};
`;

export default function Dashboard() {
  const { t } = useTranslation();

  const { status, userData } = useAppSelector((state) => state.user);

  return (
    <Page title={t("__PAGE_TITLE_PRIMARY_DASHBOARD")} route={"/"}>
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
        <Row style={{}}>
          <SuggestedCampaigns />
        </Row>
        <Row>
          <Col xs={12}>
            <div style={{ height: "500px" }}></div>
            DEBUG
            <hr />
            <pre>{JSON.stringify(userData, null, 4)}</pre>
            --- Status
            {JSON.stringify(status)}
          </Col>
        </Row>
      </Grid>
    </Page>
  );
}
