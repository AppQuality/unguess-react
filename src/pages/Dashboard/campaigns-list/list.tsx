import {
  Button,
  Col,
  Row,
  Span,
  theme,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Campaign } from 'src/features/api';
import { getLocalizeRoute } from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';
import styled from 'styled-components';
import { CampaignItem, ColCard } from '../CampaignItem';

const FloatRight = styled.div`
  float: right;
`;

const CardGroup = ({ items }: { items: Array<Campaign> }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const campaigns = items.slice(0, 4);

  const navigateToProject = (projectId: number) => {
    const localizedRoute =
      i18n.language === 'en'
        ? `/projects/${projectId}`
        : `/${i18n.language}/projects/${projectId}`;

    navigate(localizedRoute);
  };

  const clickToggle = (campaignId: number, cpType: string) => {
    window.location.href = getLocalizeRoute(campaignId, cpType);
  };

  return (
    <>
      <Col
        size={12}
        style={{
          marginBottom: `${theme.space.base * 4  }px`,
          marginTop: `${theme.space.base * 4  }px`,
        }}
      >
        <Span isBold key={campaigns[0].project_id}>
          {campaigns[0].project_name} ({items.length})
        </Span>
      </Col>

      {/* <CardsContainer> */}
      {campaigns.map((campaign) => (
        <ColCard xs={12} md={6} lg={3}>
          <CampaignItem
            key={campaign.id}
            campaign={campaign}
            onCampaignClicked={clickToggle}
            style={{ marginBottom: `${theme.space.base * 4  }px` }}
          />
        </ColCard>
      ))}
      {/* </CardsContainer> */}

      {items.length > 4 && (
        <Col size={12}>
          <FloatRight>
            <Button
              isBasic
              onClick={() => navigateToProject(campaigns[0].project_id)}
            >
              {t('__DASHBOARD_CARD_GROUP_LIST_BUTTON_SHOW_ALL MAX:10')}
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
  campaigns: Array<Array<Campaign>>;
}) => (
    <>
      {campaigns.map((group) => (
          <Row>
            <CardGroup items={group} />
          </Row>
        ))}
    </>
  );
