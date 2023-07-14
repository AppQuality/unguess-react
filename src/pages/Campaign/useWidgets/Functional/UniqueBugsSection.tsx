import { Col } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { SectionTitle } from '../../SectionTitle';
import { WidgetSection } from '../../WidgetSection';
import IncomingBugs from './widgets/IncomingBugs';
import UniqueBugs4UseCase from './widgets/UniqueBugs4UseCase';

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
