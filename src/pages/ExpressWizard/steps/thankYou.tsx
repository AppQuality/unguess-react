import {
  Col,
  Dropdown,
  Grid,
  Item,
  Label,
  MediaInput,
  Menu,
  Message,
  Paragraph,
  RadioCard,
  Row,
  Select,
  Span,
  XL,
  XXL,
  MD,
  theme,
} from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";

export const ThankYou = () => {
  const { t } = useTranslation();
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <XXL>{t("__EXPRESS_WIZARD_STEP_THANK_YOU_TITLE")}</XXL>
          <MD>{t("__EXPRESS_WIZARD_STEP_THANK_YOU_SUBTITLE")}</MD>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Paragraph>
            {t("__EXPRESS_WIZARD_STEP_THANK_YOU_DESCRIPTION")}
          </Paragraph>
        </Col>
      </Row>
    </Grid>
  );
};
