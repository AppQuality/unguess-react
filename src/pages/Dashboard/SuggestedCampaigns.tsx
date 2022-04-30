import {
  Col,
  Row,
  Paragraph,
  theme,
  MD,
} from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/app/hooks";
import { useGetWorkspacesByWidCampaignsQuery } from "src/features/api/endpoints/workspaces";
import { getLocalizeRoute } from "src/hooks/useLocalizeDashboardUrl";
import { CampaignItem } from "./CampaignItem";
import { CardsContainer } from "./CardContainer";
import { CardRowLoading } from "./CardRowLoading";

export const SuggestedCampaigns = () => {
  const { t } = useTranslation();

  const activeWorkspace = useAppSelector(
    (state) => state.navigation.activeWorkspace
  );

  const campaigns = useGetWorkspacesByWidCampaignsQuery({
    wid: activeWorkspace?.id ?? 0,
    orderBy: "start_date",
    order: "DESC",
    limit: 4,
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
      </CardsContainer>
    </Row>
  );
};
