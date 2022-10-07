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
import { getLocalizeDashboardRoute } from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';
import styled from 'styled-components';
import { ReactComponent as ExternalIcon } from 'src/assets/icons/new-window-stroke.svg';
import { CampaignItem } from '../CampaignItem';
import { CampaignActionProps } from '../types';

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

  const clickToggle = (props: CampaignActionProps) => {
    window.location.href = getLocalizeDashboardRoute(props);
  };

  return (
    <>
      <Col
        key={`campaign_project_col_${campaigns[0].project.id}`}
        size={12}
        style={{
          marginBottom: `${theme.space.base * 4}px`,
          marginTop: `${theme.space.base * 4}px`,
        }}
      >
        <Span isBold>
          {campaigns[0].project.name} ({items.length})
        </Span>
      </Col>

      {/* <CardsContainer> */}
      {campaigns.map((campaign) => (
        <Col xs={12} md={6} lg={3} key={`campaign_col_${campaign.id}`}>
          <CampaignItem
            key={`campaign_${campaign.id}`}
            campaign={campaign}
            onCampaignClicked={clickToggle}
            style={{ marginBottom: `${theme.space.base * 4}px` }}
          />
        </Col>
      ))}
      {/* </CardsContainer> */}

      {items.length > 4 && (
        <Col size={12} key={`campaign_project_cta_${campaigns[0].project.id}`}>
          <FloatRight>
            <Button
              isBasic
              onClick={() => navigateToProject(campaigns[0].project.id)}
            >
              {t('__DASHBOARD_CARD_GROUP_LIST_BUTTON_SHOW_ALL MAX:10')}
              <Button.EndIcon>
                <ExternalIcon />
              </Button.EndIcon>
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
      <Row key={`cards_row_start_${group[0].id}`}>
        <CardGroup key={`cards_group_start_${group[0].id}`} items={group} />
      </Row>
    ))}
  </>
);
