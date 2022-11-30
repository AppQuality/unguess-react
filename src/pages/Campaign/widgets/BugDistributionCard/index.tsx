import {
  Anchor,
  HalfPieChart,
  Skeleton,
  XL,
} from '@appquality/unguess-design-system';
import { theme } from 'src/app/theme';
import { Trans, useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { getLocalizedFunctionalDashboardUrl } from 'src/hooks/useLocalizeDashboardUrl';
import { useBugs } from './useBugs';
import { BasicWidget } from '../widgetCards/BasicWidget';

function translateSeverity(severity: Severities, t: TFunction) {
  switch (severity) {
    case 'critical':
      return t('__BUG_SEVERITY_CRITICAL', 'critical');
    case 'high':
      return t('__BUG_SEVERITY_HIGH', 'high');
    case 'medium':
      return t('__BUG_SEVERITY_MEDIUM', 'medium');
    case 'low':
      return t('__BUG_SEVERITY_LOW', 'low');
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
    (key) => theme.colors.bySeverity[key as Severities]
  );
  const maxSeverity = Object.keys(data.bySeverity).at(0) as Severities;

  return (
    <BasicWidget>
      <BasicWidget.Header
        tooltipContent={t('__CAMPAIGN_WIDGET_BUGDISTRIBUTION_TOOLTIP')}
      >
        <Trans i18nKey="__CAMPAIGN_WIDGET_BUGDISTRIBUTION_HEADER">
          {{ severity: translateSeverity(maxSeverity, t) }} bugs
        </Trans>
      </BasicWidget.Header>
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
      <BasicWidget.Description
        header={t('__CAMPAIGN_WIDGET_BUGDISTRIBUTION_DESCRIPTION_HEADER')}
        content={
          <span
            style={{
              color: theme.colors.bySeverity[maxSeverity as Severities],
            }}
          >
            {`${data.bySeverity[maxSeverity as Severities] || 0} `}
            <XL tag="span" isBold>
              <Trans
                i18nKey="__CAMPAIGN_WIDGET_BUGDISTRIBUTION_COUNT_LABEL"
                count={data.bySeverity[maxSeverity as Severities] || 0}
              >
                bugs {{ severity: translateSeverity(maxSeverity, t) }}
              </Trans>
            </XL>
          </span>
        }
        footer={
          <Trans
            i18nKey="__CAMPAIGN_WIDGET_BUGDISTRIBUTION_TOTAL_LABEL"
            count={data.total || 0}
          >
            out of {{ total: data.total || 0 }}
          </Trans>
        }
      />
      <BasicWidget.Footer>
        <Anchor
          isExternal
          onClick={() =>
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            window.open(
              getLocalizedFunctionalDashboardUrl(campaignId, i18n.language)
            )
          }
        >
          {t(
            '__CAMPAIGN_WIDGET_BUGDISTRIBUTION_GOTOLIST_LINK',
            'Go to bug list'
          )}
        </Anchor>
      </BasicWidget.Footer>
    </BasicWidget>
  );
};

export default BugDistributionCard;
