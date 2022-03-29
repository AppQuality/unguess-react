import {
  Button,
  Col,
  Paragraph,
  Row,
  Span,
  theme,
} from "@appquality/unguess-design-system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { CampaignItem } from "../CampaignItem";
import { CardsContainer } from "../CardContainer";

const FloatRight = styled.div`
  float: right;
`;

const CardGroup = ({ items }: { items: Array<Component["campaign"]> }) => {
  const { t } = useTranslation();
  const [limit, toggleLimit] = useState(true);
  const campaigns = limit ? items.slice(0, 4) : items;

  const clickToggle = () => {
    console.log("clicked");
  };

  return (
    <>
      <Col
        size={12}
        style={{
          marginBottom: theme.space.base * 4 + "px",
          marginTop: theme.space.base * 4 + "px",
        }}
      >
        <Span isBold key={campaigns[0].project_id}>
          Progetto #{campaigns[0].project_id} ({items.length})
        </Span>
      </Col>

      {/* <CardsContainer> */}
      {campaigns.map((campaign) => (
        <CampaignItem
          key={campaign.id}
          campaign={campaign}
          size={3}
          onCampaignClicked={clickToggle}
          style={{ marginBottom: theme.space.base * 4 + "px" }}
        />
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
  campaigns: Array<Array<Component["campaign"]>>;
}) => {
  return (
    <>
      {campaigns.map((group) => {
        return (
          <Row>
            <CardGroup items={group} />
          </Row>
        );
      })}
    </>
  );
};
