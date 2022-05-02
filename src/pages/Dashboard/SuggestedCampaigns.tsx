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
import { FEATURE_FLAG_EXPRESS } from "src/constants";
import { useGetWorkspacesByWidCampaignsQuery } from "src/features/api/endpoints/workspaces";
import { getLocalizeRoute } from "src/hooks/useLocalizeDashboardUrl";
import { CampaignItem, ColCard } from "./CampaignItem";
import { CardsContainer } from "./CardContainer";
import { CardRowLoading } from "./CardRowLoading";
import { ReactComponent as ExpressIcon } from "src/assets/icons/express-icon.svg";

export const SuggestedCampaigns = () => {
  const { t } = useTranslation();
  const { userData } = useAppSelector((state) => state.user);
  const activeWorkspace = useAppSelector(
    (state) => state.navigation.activeWorkspace
  );

  const hasExpress =
    userData.features &&
    userData.features.find((feature) => feature.slug === FEATURE_FLAG_EXPRESS);

  //Temporary until we have the embeded form
  const JOTFORM_URL = `https://secure.jotform.com/221093463483052?projectId=-1&userFull=${userData.name}&userEmail=${userData.email}`;

  const campaigns = useGetWorkspacesByWidCampaignsQuery({
    wid: activeWorkspace?.id ?? 0,
    orderBy: "start_date",
    order: "DESC",
    limit: hasExpress ? 3 : 4,
  });

  if (campaigns.isError) return <></>; //TODO: Improve error handling

  const goToCampaignDashboard = (campaignId: number, cpType: string) => {
    window.location.href = getLocalizeRoute(campaignId, cpType);
  };

  return campaigns.isLoading ||
    campaigns.isFetching ||
    !campaigns.data ||
    !campaigns.data.items ? (
    <CardRowLoading />
  ) : (
    <Row>
      <Col xs={12} style={{ marginBottom: theme.space.base * 4 + "px" }}>
        <Paragraph>
          <MD style={{ color: theme.palette.grey[700] }}>
            {t("__DASHABOARD_SUGGESTED_CAMPAIGN_TITLE MAX:12").toUpperCase()}
          </MD>
        </Paragraph>
      </Col>
      <CardsContainer>
        {campaigns.data.items.map((campaign) => (
          <CampaignItem
            campaign={campaign}
            onCampaignClicked={goToCampaignDashboard}
          />
        ))}
        {hasExpress && (
          <ColCard size={3}>
            <ProductCard
              onClick={() => {
                window.open(JOTFORM_URL, "_blank")?.focus();
              }}
              onCtaClick={() => {
                window.open(JOTFORM_URL, "_blank")?.focus();
              }}
              icon={<ExpressIcon />}
              ctaLabel={t("__DASHABOARD_EXPRESS_CARD_CTA_TEXT")}
              preTitle={t("__DASHABOARD_EXPRESS_CARD_PRE_TITLE MAX:12")}
              productTitle={t("__DASHABOARD_EXPRESS_CARD_TITLE MAX:12")}
              style={{ height: "100%" }}
            />
          </ColCard>
        )}
      </CardsContainer>
    </Row>
  );
};
