import {
  Col,
  Row,
  Paragraph,
  theme,
  MD,
} from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/app/hooks";
import { selectSuggestedCampaigns } from "src/features/campaigns/campaignSlice";
import { getLocalizeRoute } from "src/hooks/useLocalizeDashboardUrl";
import { CampaignItem } from "./CampaignItem";
import { CardsContainer } from "./CardContainer";



export const SuggestedCampaigns = () => {
  const { t } = useTranslation();
  const { status: cpLoading } = useAppSelector((state) => state.campaigns);

  const goToCampaignDashboard = (campaignId: number, cpType: string) => {
    window.location.href = getLocalizeRoute(campaignId, cpType);
  };

  const campaigns = useAppSelector(selectSuggestedCampaigns);

  return cpLoading === "idle" || cpLoading === "loading" ? (
    <>{"caricamento"}</>
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
        {cpLoading === "complete"
          ? campaigns.map((campaign) => <CampaignItem campaign={campaign} onCampaignClicked={goToCampaignDashboard} />)
          : "skeleton here"}
      </CardsContainer>
    </Row>
  );
};
