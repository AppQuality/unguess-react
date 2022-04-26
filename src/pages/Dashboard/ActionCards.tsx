import {
  Col,
  Row,
  Paragraph,
  theme,
  MD,
  ProductCard,
} from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/app/hooks";
import { ReactComponent as ExpressIcon } from "src/assets/icons/express-icon.svg";
import { CardRowLoading } from "./CardRowLoading";

const REQUIRED_FEATURE_FLAG = "exploratory-express";

export const ActionCards = () => {
  const { t } = useTranslation();
  const { status, userData } = useAppSelector((state) => state.user);
  const { projectId } = useAppSelector((state) => state.filters);

  if (
    !projectId ||
    !userData.features ||
    !userData.features.find((feature) => feature.slug === REQUIRED_FEATURE_FLAG)
  ) {
    return <></>;
  }

  const JOTFORM_URL = `https://secure.jotform.com/221093463483052?projectId=${projectId}&userFull=${userData.name}&userEmail=${userData.email}`;

  return status === "idle" || status === "loading" ? (
    <CardRowLoading />
  ) : (
    <Row>
      <Col xs={12} style={{ marginBottom: theme.space.base * 4 + "px" }}>
        <Paragraph>
          <MD style={{ color: theme.palette.grey[700] }}>
            {t("__DASHABOARD_NEWS_ACTION_CARDS_TITLE MAX:12").toUpperCase()}
          </MD>
        </Paragraph>
      </Col>
      <Col xs={12} md={4} lg={3}>
        <ProductCard
          onCtaClick={() => {
            window.open(JOTFORM_URL, "_blank")?.focus();
          }}
          icon={<ExpressIcon />}
          ctaLabel={t("__DASHABOARD_EXPRESS_CARD_CTA_TEXT")}
          preTitle={t("__DASHABOARD_EXPRESS_CARD_PRE_TITLE MAX:12")}
          productTitle={t("__DASHABOARD_EXPRESS_CARD_TITLE MAX:12")}
        />
      </Col>
    </Row>
  );
};
