import {
  Col,
  Paragraph,
  Row,
  TextDescription,
  theme,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useGetWorkspacesByWidCampaignsQuery } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { getLocalizeDashboardRoute } from 'src/hooks/useLocalizeDashboardUrl';
import { CampaignItem } from './CampaignItem';
import { CardsContainer, StyledRow } from './CardContainer';
import { CardRowLoading } from './CardRowLoading';
import { CampaignActionProps } from './types';

export const SuggestedCampaigns = () => {
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();

  const campaigns = useGetWorkspacesByWidCampaignsQuery({
    wid: activeWorkspace?.id.toString() || '',
    orderBy: 'start_date',
    order: 'DESC',
    limit: 4,
  });

  if (campaigns.isError || !campaigns.data?.total) return null;

  const goToCampaignDashboard = (props: CampaignActionProps) => {
    window.location.href = getLocalizeDashboardRoute(props);
  };

  return campaigns.isLoading ||
    campaigns.isFetching ||
    !campaigns.data ||
    !campaigns.data.items ? (
    <CardRowLoading />
  ) : (
    <>
      <Row>
        <Col xs={12} style={{ marginBottom: `${theme.space.base * 4}px` }}>
          <Paragraph>
            <TextDescription>
              {t('__DASHABOARD_SUGGESTED_CAMPAIGN_TITLE MAX:12').toUpperCase()}
            </TextDescription>
          </Paragraph>
        </Col>
      </Row>
      <CardsContainer>
        <StyledRow>
          {campaigns.data.items.map((campaign) => (
            <Col xs={10} md={6} lg={3} key={`suggested_col_${campaign.id}`}>
              <CampaignItem
                key={`suggested_${campaign.id}`}
                campaign={campaign}
                onCampaignClicked={goToCampaignDashboard}
              />
            </Col>
          ))}
        </StyledRow>
      </CardsContainer>
    </>
  );
};
