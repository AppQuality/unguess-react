import { Col, CampaignCard } from "@appquality/unguess-design-system";
import { HTMLAttributes } from "react";

export const CampaignItem = ({
  campaign,
  onCampaignClicked,
  size = 3,
  ...props
}: {
  campaign: Component["campaign"];
  onCampaignClicked: (campaignId: number, cpType: string) => void;
  size?: number;
} & HTMLAttributes<HTMLDivElement>) => {


  const isFunctional = campaign.test_type_name.toLowerCase() === "functional";

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
        onClick={() => onCampaignClicked(campaign.id, campaign.test_type_name)}
        {...props}
      />
    </Col>
  );
};
