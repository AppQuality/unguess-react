import {
  Button,
  Col,
  Row,
  Span,
  theme,
} from "@appquality/unguess-design-system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getLocalizeRoute } from "src/hooks/useLocalizeDashboardUrl";
import styled from "styled-components";
import { CampaignItem, ColCard } from "../CampaignItem";

const FloatRight = styled.div`
  float: right;
`;

const CardGroup = ({ items }: { items: Array<Component["campaign"]> }) => {
  const { t } = useTranslation();
  const [limit, toggleLimit] = useState(true);
  const campaigns = limit ? items.slice(0, 4) : items;

  const clickToggle = (campaignId: number, cpType: string) => {
    window.location.href = getLocalizeRoute(campaignId, cpType);
  };

  return (
    <>
      {/* <CardsContainer> */}
      {campaigns.map((campaign) => (
        <ColCard size={3} xs={12} md={6} lg={3}>
          <CampaignItem
            key={campaign.id}
            campaign={campaign}
            onCampaignClicked={clickToggle}
            style={{ marginBottom: theme.space.base * 4 + "px" }}
          />
        </ColCard>
      ))}
      {/* </CardsContainer> */}

      {items.length > 4 && (
        <Col size={12}>
          <FloatRight>
            <Button isBasic onClick={() => toggleLimit(!limit)}>
              {limit
                ? t("__DASHBOARD_CARD_GROUP_LIST_BUTTON_SHOW_ALL MAX:10")
                : t("__DASHBOARD_CARD_GROUP_LIST_BUTTON_SHOW_LESS MAX:10")}
            </Button>
          </FloatRight>
        </Col>
      )}
    </>
  );
};

export const CardList = ({
  campaigns,
}: {
  campaigns: Array<Component["campaign"]>;
}) => {
  return (
    <Row>
      <CardGroup items={campaigns} />
    </Row>
  );
};
