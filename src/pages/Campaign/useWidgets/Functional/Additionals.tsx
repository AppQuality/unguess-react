import { Col } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useGetCampaignsByCidBugsQuery } from 'src/features/api';
import { SectionTitle } from '../../../../common/components/SectionTitle';
import { WidgetSection } from '../../WidgetSection';
import UniqueBugsByAdditional from './widgets/UniqueBugsByAdditional';

const useAdditionalFieldsWidgets = ({ campaignId }: { campaignId: number }) => {
  const { data } = useGetCampaignsByCidBugsQuery({
    cid: campaignId.toString(),
    filterBy: { is_duplicated: 0 },
  });

  const additionalFields = data?.items?.flatMap((bug) =>
    bug.additional_fields
      ? bug.additional_fields.map((field) => field.slug)
      : []
  );

  return [...new Set(additionalFields)];
};

export const Additionals = ({
  id,
  campaignId,
}: {
  id: string;
  campaignId: number;
}) => {
  const { t } = useTranslation();
  const additionalFields = useAdditionalFieldsWidgets({ campaignId });

  return (
    <WidgetSection id={id}>
      <Col xs={12}>
        <SectionTitle
          title={t('__CAMPAIGN_PAGE_ADDITIONAL_SECTION_TITLE')}
          subtitle={t('__CAMPAIGN_PAGE_ADDITIONAL_SECTION_SUBTITLE')}
        />
      </Col>
      {additionalFields.map((field) => (
        <Col xs={12} xl={6} key={field}>
          <UniqueBugsByAdditional name={field} height="400px" />
        </Col>
      ))}
    </WidgetSection>
  );
};
