import { Col } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { SectionTitle } from '../../SectionTitle';
import { WidgetSection } from '../../WidgetSection';
import BugDistributionCard from './widgets/BugDistributionCard';
import { Progress } from './widgets/Progress';
import { UniqueBugs } from './widgets/UniqueBugs';

export const CampaignOverview = ({
  id,
  campaign,
}: {
  id: string;
  campaign: Campaign;
}) => {
  const { t } = useTranslation();
  return (
    <WidgetSection id={id}>
      <Col xs={12}>
        <SectionTitle
          title={t('__CAMPAIGN_PAGE_NAVIGATION_BUG_ITEM_OVERVIEW_LABEL')}
        />
      </Col>
      <Col xs={12} sm={6} xl={4}>
        <Progress campaign={campaign} />
      </Col>
      <Col xs={12} sm={6} xl={4}>
        <UniqueBugs campaignId={campaign ? campaign.id : 0} />
      </Col>
      <Col xs={12} sm={6} xl={4}>
        <BugDistributionCard campaignId={campaign ? campaign.id : 0} />
      </Col>
    </WidgetSection>
  );
};
