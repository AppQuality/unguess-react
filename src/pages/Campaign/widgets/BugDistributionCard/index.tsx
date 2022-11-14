import { HalfPieChart, Spinner, XL } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { Severities } from './types';
import { useBugs } from './useBugs';
import { WidgetCard } from '../WidgetCard';

const SEVERITY_COLORS: Record<Severities, string> = {
  critical: '#800208',
  high: '#c78430',
  medium: '#024780',
  low: '#02807a',
};

function translateSeverity(severity: Severities, t: TFunction) {
  switch (severity) {
    case 'critical':
      return t('critical');
    case 'high':
      return t('high');
    case 'medium':
      return t('medium');
    case 'low':
      return t('low');
    default:
      throw new Error('Unknown severity');
  }
}
const BugDistributionDescription = ({
  t,
  maxSeverity,
  maxSeverityCount,
  total,
}: {
  t: TFunction;
  maxSeverity: Severities;
  maxSeverityCount: number;
  total: number;
}) => (
  <WidgetCard.Description
    header={t('Segnalati dai tester:')}
    content={
      <span style={{ color: SEVERITY_COLORS[maxSeverity] }}>
        {`${maxSeverityCount} `}
        <XL tag="span" isBold>
          Bug {translateSeverity(maxSeverity, t)}
        </XL>
      </span>
    }
    footer={t('su un totale di {{total}}', { total })}
  />
);

const BugDistributionCard = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();
  const height = '140px';
  const { data, isLoading } = useBugs(campaignId);

  if (isLoading || !('bySeverity' in data)) {
    return <Spinner size="50" />;
  }

  const colorScheme = Object.keys(data.bySeverity).map(
    (key) => SEVERITY_COLORS[key as Severities]
  );
  const maxSeverity = Object.keys(data.bySeverity).at(0) as Severities;

  return (
    <WidgetCard>
      <WidgetCard.Header tooltipContent="Tooltip content">
        {t('{{severity}} bugs', {
          severity: translateSeverity(maxSeverity, t),
        })}
      </WidgetCard.Header>
      <div style={{ width: '50%', height, position: 'relative' }}>
        <HalfPieChart
          width="100%"
          height={height}
          colors={colorScheme}
          data={Object.entries(data.bySeverity).map(([key, value]) => ({
            id: key,
            label: key,
            value,
          }))}
        />
      </div>
      <BugDistributionDescription
        t={t}
        maxSeverity={maxSeverity}
        maxSeverityCount={data.bySeverity[maxSeverity] || 0}
        total={data.total || 0}
      />
      <WidgetCard.Footer>{t('Go to the bug list')}</WidgetCard.Footer>
    </WidgetCard>
  );
};
export default BugDistributionCard;
