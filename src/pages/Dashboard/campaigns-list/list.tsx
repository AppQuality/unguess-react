import {
  Button,
  Col,
  Row,
  Span,
  theme,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ExternalIcon } from 'src/assets/icons/new-window-stroke.svg';
import { Campaign } from 'src/features/api';
import i18n from 'src/i18n';
import styled from 'styled-components';
import { CampaignItem } from '../CampaignItem';
import { useCampaignsGroupedByProject } from './useCampaignsGroupedByProject';

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

      {campaigns.map((campaign) => (
        <Col xs={12} md={6} lg={3} key={`campaign_col_${campaign.id}`}>
          <CampaignItem
            key={`campaign_${campaign.id}`}
            campaign={campaign}
            style={{ marginBottom: `${theme.space.base * 4}px` }}
          />
        </Col>
      ))}

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

export const CardList = () => {
  const { campaigns, isLoading, isFetching, isError } =
    useCampaignsGroupedByProject();

  if (!campaigns.length || isLoading || isFetching || isError) return null;

  return (
    <>
      {campaigns.map(({ project, items }) => (
        <Row key={`cards_row_start_${project.id}`}>
          <CardGroup key={`cards_group_start_${project.id}`} items={items} />
        </Row>
      ))}
    </>
  );
};
