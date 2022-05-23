import {
  Col,
  Row,
  Paragraph,
  theme,
  MD,
  ProductCard,
} from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { FEATURE_FLAG_EXPRESS } from "src/constants";
import { useGetWorkspacesByWidCampaignsQuery } from "src/features/api";
import { getLocalizeRoute } from "src/hooks/useLocalizeDashboardUrl";
import { CampaignItem, ColCard } from "./CampaignItem";
import { CardsContainer, StyledRow } from "./CardContainer";
import { CardRowLoading } from "./CardRowLoading";
import { ReactComponent as ExpressIcon } from "src/assets/icons/express-icon.svg";
import { ExpressDrawer } from "../ExpressWizard/drawer";
import { openDrawer, openWizard } from "src/features/express/expressSlice";
import { ExpressWizardContainer } from "../ExpressWizard";
import { Feature } from "src/features/api";

export const SuggestedCampaigns = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.user);
  const activeWorkspace = useAppSelector(
    (state) => state.navigation.activeWorkspace
  );

  const hasExpress =
    userData.features &&
    userData.features.find((feature: Feature) => feature.slug === FEATURE_FLAG_EXPRESS);

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
    <>
      <Row>
        <Col xs={12} style={{ marginBottom: theme.space.base * 4 + "px" }}>
          <Paragraph>
            <MD style={{ color: theme.palette.grey[700] }}>
              {t("__DASHABOARD_SUGGESTED_CAMPAIGN_TITLE MAX:12").toUpperCase()}
            </MD>
          </Paragraph>
        </Col>
      </Row>
      <CardsContainer>
        <StyledRow>
          {campaigns.data.items.map((campaign) => (
            <ColCard xs={10} md={6} lg={3}>
              <CampaignItem
                campaign={campaign}
                onCampaignClicked={goToCampaignDashboard}
              />
            </ColCard>
          ))}
          {hasExpress && (
            <>
              <ColCard xs={10} md={6} lg={3}>
                <ProductCard
                  title={t("__EXPRESS_WIZARD_TITLE")}
                  onCtaClick={() => {
                    dispatch(openDrawer());
                  }}
                  icon={<ExpressIcon />}
                  ctaLabel={t("__DASHABOARD_EXPRESS_CARD_CTA_TEXT")}
                  preTitle={t("__DASHABOARD_EXPRESS_CARD_PRE_TITLE MAX:12")}
                  productTitle={t("__DASHABOARD_EXPRESS_CARD_TITLE MAX:12")}
                  style={{ height: "100%" }}
                />
              </ColCard>
              <ExpressDrawer onCtaClick={() => dispatch(openWizard())} />
              <ExpressWizardContainer />
            </>
          )}
        </StyledRow>
      </CardsContainer>
    </>
  );
};
