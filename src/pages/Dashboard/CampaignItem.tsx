import { Col, CampaignCard } from "@appquality/unguess-design-system";
import { CampaignCardsProps } from "@appquality/unguess-design-system/build/stories/campaignCards/_types";
import { HTMLAttributes, HtmlHTMLAttributes } from "react";

export const CampaignItem = ({
  campaign,
  onCampaignClicked,
  size = 3,
  ...props
}: {
  campaign: Component["campaign"];
  onCampaignClicked?: () => void;
  size?: number;
} & HTMLAttributes<HTMLDivElement>) => {


  const isFunctional = campaign.campaign_type_name.toLowerCase() === "functional";

  return (
    <Col size={size}>
      <CampaignCard
        className="suggested-campaign-card"
        key={campaign.id}
        // isNew={campaign?.isNew} TODO: need an API update
        date={new Date(campaign.start_date).toLocaleString().substring(0, 10)}
        title={`${campaign.project_name}`}
        subTitle={campaign.title ?? "Untitled"}
        type={isFunctional ? "FUNCTIONAL": "EXPERIENTIAL"}
        status={
          campaign.status_id === 1
            ? "PROGRESS"
            : campaign.status_id === 0
            ? "INCOMING"
            : "COMPLETED"
        }
        pillText={campaign.campaign_type_name}
        onClick={onCampaignClicked}
        {...props}
      />
    </Col>
  );
};
