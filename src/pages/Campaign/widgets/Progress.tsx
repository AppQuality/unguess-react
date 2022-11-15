import { WaffleChart } from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { WidgetCard } from './WidgetCard';

export const Progress = () => (
  <WidgetCard>
    <WidgetCard.Header
      tooltipContent={t('__CAMPAIGN_PAGE_UNIQUE_BUGS_TOOLTIP')}
    >
      {t('__CAMPAIGN_PAGE_UNIQUE_BUGS_TITLE')}
    </WidgetCard.Header>
    <WaffleChart rows={8} columns={8} total={100} data={[]} />
    <WidgetCard.Description
      header={t('__CAMPAIGN_PAGE_UNIQUE_BUGS_REPORTED_BY')}
      content={<span />}
      footer=""
    />
    <WidgetCard.Footer>
      <span style={{ fontWeight: 'bold' }}>+12 Bug</span>
    </WidgetCard.Footer>
  </WidgetCard>
);
