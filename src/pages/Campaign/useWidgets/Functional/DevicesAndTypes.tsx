import { Col } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { WidgetSection } from '../../WidgetSection';
import BugsByType from './widgets/BugsByType';
import TotalBugsByOsAndDevices from './widgets/TotalBugsByOsAndDevices';
import { SectionTitle } from '../../SectionTitle';

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
