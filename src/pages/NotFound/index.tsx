import {
  Col,
  Grid,
  Row,
  theme,
  XXXL,
  XXL,
  MD,
  Paragraph,
  Button,
} from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Illustration } from "src/assets/notFoundPage.svg";
import { Page } from "src/features/templates/Page";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const homeRoute = useLocalizeRoute("");

  return (
    <Page title={t("__404_PAGE_TITLE MAX:10")} route={"oops"}>
      <Grid>
        <Row>
          <Col>
            <Illustration style={{ maxHeight: "80vh" }} />
          </Col>
          <Col alignSelf="center">
            <Paragraph>
              <XXXL style={{ color: theme.palette.blue[600] }}>
                {t("__404_PAGE_TITLE MAX:10")}
              </XXXL>
            </Paragraph>
            <Paragraph>
              <XXL style={{ color: theme.palette.blue[600] }}>
                {t("__404_PAGE_SUB_TITLE MAX:80")}
              </XXL>
            </Paragraph>
            <Paragraph>
              <MD style={{ color: theme.palette.grey[600] }}>
                {t("__404_PAGE_DESCRIPTION")}
              </MD>
            </Paragraph>

            <Paragraph style={{marginTop: theme.space.lg}}>
              <Button isPrimary isPill onClick={() => navigate(homeRoute)}>
                {t("__404_PAGE_BUTTON")}
              </Button>
            </Paragraph>
          </Col>
        </Row>
      </Grid>
    </Page>
  );
}
