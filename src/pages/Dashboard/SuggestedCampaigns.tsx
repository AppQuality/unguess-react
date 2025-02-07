import {
  Col,
  Paragraph,
  Row,
  Separator,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useGetWorkspacesByWidCampaignsQuery } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { SectionTitle } from 'src/common/components/SectionTitle';
import { appTheme } from 'src/app/theme';
import { CampaignItem } from './CampaignItem';
import { CardsContainer, StyledRow } from './CardContainer';
import { CardRowLoading } from './CardRowLoading';

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

  return campaigns.isLoading ||
    campaigns.isFetching ||
    !campaigns.data ||
    !campaigns.data.items ? (
    <CardRowLoading />
  ) : (
    <>
      <Row>
        <Col xs={12} style={{ marginBottom: 0 }}>
          <Paragraph>
            <SectionTitle
              title={t('__DASHABOARD_SUGGESTED_CAMPAIGN_TITLE')}
              subtitle={t('__DASHABOARD_SUGGESTED_CAMPAIGN_SUBTITLE')}
            />
            <Separator style={{ margin: `${appTheme.space.md} 0` }} />
          </Paragraph>
        </Col>
      </Row>
      <CardsContainer>
        <StyledRow>
          {campaigns.data.items.map((campaign) => (
            <Col
              xs={10}
              md={6}
              lg={3}
              style={{ marginBottom: appTheme.space.xxl }}
              key={`suggested_col_${campaign.id}`}
            >
              <CampaignItem
                key={`suggested_${campaign.id}`}
                campaign={campaign}
              />
            </Col>
          ))}
        </StyledRow>
      </CardsContainer>
    </>
  );
};
