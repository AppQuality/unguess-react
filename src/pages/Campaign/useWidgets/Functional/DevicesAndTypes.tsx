import { Col } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { SectionTitle } from '../../SectionTitle';
import { WidgetSection } from '../../WidgetSection';
import BugDistributionCard from './widgets/BugDistributionCard';
import BugsByType from './widgets/BugsByType';
import IncomingBugs from './widgets/IncomingBugs';
import { Progress } from './widgets/Progress';
import TotalBugsByOsAndDevices from './widgets/TotalBugsByOsAndDevices';
import { UniqueBugs } from './widgets/UniqueBugs';
import UniqueBugs4UseCase from './widgets/UniqueBugs4UseCase';

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

export const UniqueBugsSection = ({
  id,
  campaign,
}: {
  id: string;
  campaign: Campaign;
}) => {
  const { t } = useTranslation();
  const firstRowHeight = '540px';
  return (
    <WidgetSection id={id}>
      <Col xs={12}>
        <SectionTitle
          title={t('__CAMPAIGN_PAGE_UNIQUE_BUGS_SECTION_TITLE')}
          subtitle={t('__CAMPAIGN_PAGE_UNIQUE_BUGS_SECTION_SUBTITLE')}
        />
      </Col>
      <Col xs={12} xl={6}>
        <UniqueBugs4UseCase height={firstRowHeight} />
      </Col>
      <Col xs={12} xl={6}>
        <IncomingBugs height={firstRowHeight} campaignId={campaign.id ?? 0} />
      </Col>
    </WidgetSection>
  );
};

export const DevicesAndTypes = ({
  id,
  campaign,
}: {
  id: string;
  campaign: Campaign;
}) => {
  const { t } = useTranslation();
  const secondRowHeight = '465px';

  return (
    <WidgetSection id={id}>
      <Col xs={12}>
        <SectionTitle
          title={t('__CAMPAIGN_PAGE_DEVICE_AND_BUG_TYPES_SECTION_TITLE')}
          subtitle={t('__CAMPAIGN_PAGE_DEVICE_AND_BUG_TYPES_SECTION_SUBTITLE')}
        />
      </Col>
      <Col xs={12} xl={6}>
        <TotalBugsByOsAndDevices
          height={secondRowHeight}
          campaignId={campaign.id ?? 0}
        />
      </Col>
      <Col xs={12} xl={6}>
        <BugsByType height={secondRowHeight} campaignId={campaign.id ?? 0} />
      </Col>
    </WidgetSection>
  );
};
