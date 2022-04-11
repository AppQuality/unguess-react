import {
  Col,
  Row,
  Paragraph,
  theme,
  MD,
} from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/app/hooks";
import { selectCampaigns } from "src/features/campaigns/campaignSlice";
import styled from "styled-components";
import { CampaignItem } from "./CampaignItem";
import { CardsContainer } from "./CardContainer";



export const SuggestedCampaigns = () => {
  const { t } = useTranslation();
  const { status: cpLoading } = useAppSelector((state) => state.campaigns);

  const campaigns = useAppSelector((state) => selectCampaigns(state));

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
          ? campaigns.slice(0, 4).map((campaign) => <CampaignItem campaign={campaign} />)
          : "skeleton here"}
      </CardsContainer>
    </Row>
  );
};
