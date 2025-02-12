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
import { ScrollingGrid } from 'src/common/components/ScrollingGrid';
import { CampaignItem } from './CampaignItem';
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
      <ScrollingGrid id="suggested-campaigns-scrolling-grid">
        {campaigns.data.items.map((campaign) => (
          <ScrollingGrid.Item key={`suggested_${campaign.id}`}>
            <CampaignItem campaign={campaign} />
          </ScrollingGrid.Item>
        ))}
      </ScrollingGrid>
    </>
  );
};
