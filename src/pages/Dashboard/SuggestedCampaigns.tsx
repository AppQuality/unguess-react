import {
  Col,
  Paragraph,
  theme,
  MD,
  CampaignCard,
} from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/app/hooks";
import styled from "styled-components";

export const SuggestedCampaigns = () => {
  const { t } = useTranslation();
  const { status: cpLoading, campaigns } = useAppSelector(
    (state) => state.campaigns
  );
  return (
    <>
      <Col xs={12} style={{ marginBottom: theme.space.base * 4 + "px" }}>
        <Paragraph>
          <MD style={{ color: theme.palette.grey[700] }}>
            {t("__DASHABOARD_SUGGESTED_CAMPAIGN_TITLE MAX:12").toUpperCase()}
          </MD>
        </Paragraph>
      </Col>
      {cpLoading === "complete"
        ? campaigns.map((campaign) => (
            <Col size={3}>
              <CampaignCard
                key={campaign.id}
                isNew={Math.random() > 0.6}
                date={new Date().toLocaleString().substring(0, 10)}
                title={campaign.title ?? "Untitled"}
                subTitle={"Progetto Unoh"}
                type={"REGRESSION"}
                status={
                  campaign.status_id === 1
                    ? "PROGRESS"
                    : campaign.status_id === 0
                    ? "INCOMING"
                    : "COMPLETED"
                }
              />
            </Col>
          ))
        : "skeleton here"}
    </>
  );
};
