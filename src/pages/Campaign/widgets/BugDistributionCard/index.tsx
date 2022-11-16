import {
  Anchor,
  HalfPieChart,
  Skeleton,
  XL,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { Severities } from './types';
import { useBugs } from './useBugs';
import { WidgetCard } from '../WidgetCard';
import { getLocalizedFunctionalDashboardUrl } from 'src/hooks/useLocalizeDashboardUrl';

const SEVERITY_COLORS: Record<Severities, string> = {
  critical: '#800208',
  high: '#c78430',
  medium: '#024780',
  low: '#02807a',
};

function translateSeverity(severity: Severities, t: TFunction) {
  switch (severity) {
    case 'critical':
      return t('__BUG_SEVERITY_CRITICAL');
    case 'high':
      return t('__BUG_SEVERITY_HIGH');
    case 'medium':
      return t('__BUG_SEVERITY_MEDIUM');
    case 'low':
      return t('__BUG_SEVERITY_LOW');
    default:
      throw new Error(`Unknown severity ${severity}`);
  }
}

const BugDistributionCard = ({ campaignId }: { campaignId: number }) => {
  const { t, i18n } = useTranslation();
  const height = '140px';
  const { data, isLoading } = useBugs(campaignId);

  if (
    isLoading ||
    !('bySeverity' in data) ||
    Object.keys(data.bySeverity).length === 0
  ) {
    return <Skeleton />;
  }

  const colorScheme = Object.keys(data.bySeverity).map(
    (key) => SEVERITY_COLORS[key as Severities]
  );
  const maxSeverity = Object.keys(data.bySeverity).at(0) as Severities;

  return (
    <WidgetCard>
      <WidgetCard.Header
        tooltipContent={t('__CAMPAIGN_WIDGET_BUGDISTRIBUTION_TOOLTIP')}
      >
        <Trans i18nKey="__CAMPAIGN_WIDGET_BUGDISTRIBUTION_HEADER">
          {{ severity: translateSeverity(maxSeverity, t) }} bugs
        </Trans>
      </WidgetCard.Header>
      <HalfPieChart
        width="50%"
        height={height}
        colors={colorScheme}
        data={Object.entries(data.bySeverity).map(([key, value]) => ({
          id: key,
          label: key,
          value,
        }))}
      />
      <WidgetCard.Description
        header={t('__CAMPAIGN_WIDGET_BUGDISTRIBUTION_DESCRIPTION_HEADER')}
        content={
          <span style={{ color: SEVERITY_COLORS[maxSeverity as Severities] }}>
            {`${data.bySeverity[maxSeverity as Severities] || 0} `}
            <XL tag="span" isBold>
              <Trans i18nKey="__CAMPAIGN_WIDGET_BUGDISTRIBUTION_COUNT_DESCRIPTION">
                bugs {{ severity: translateSeverity(maxSeverity, t) }}
              </Trans>
            </XL>
          </span>
        }
        footer={
          <Trans i18nKey="__CAMPAIGN_WIDGET_BUGDISTRIBUTION_TOTAL_DESCRIPTION">
            out of {{ total: data.total || 0 }}
          </Trans>
        }
      />
      <WidgetCard.Footer>
        <Anchor
          isExternal
          onClick={() =>
            window.open(
              getLocalizedFunctionalDashboardUrl(campaignId, i18n.language)
            )
          }
        >
          {t('__CAMPAIGN_WIDGET_BUGDISTRIBUTION_GOTOLIST_LINK')}
        </Anchor>
      </WidgetCard.Footer>
    </WidgetCard>
  );
};
export default BugDistributionCard;
