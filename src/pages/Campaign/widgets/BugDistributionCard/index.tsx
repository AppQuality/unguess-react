import {
  Anchor,
  HalfPieChart,
  XL,
  Span,
  SM,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { Trans, useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { getLocalizedFunctionalDashboardUrl } from 'src/hooks/useLocalizeDashboardUrl';
import { useBugs } from './useBugs';
import { BasicWidget } from '../widgetCards/BasicWidget';
import { CapitalizeFirstLetter } from '../widgetCards/common/CapitalizeFirstLetter';
import { WidgetLoader } from '../widgetLoader';

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
      return '';
  }
}

const BugDistributionCard = ({ campaignId }: { campaignId: number }) => {
  const { t, i18n } = useTranslation();
  const height = '140px';
  const { data, isLoading } = useBugs(campaignId);

  if (!('bySeverity' in data) || Object.keys(data.bySeverity).length === 0)
    return null;

  const colorScheme = Object.keys(data.bySeverity).map(
    (key) => appTheme.colors.bySeverity[key as Severities]
  );
  const maxSeverity = Object.keys(data.bySeverity)[0] as Severities;

  return (
    <BasicWidget className="bugs-distribution-widget">
      <BasicWidget.Header
        tooltipContent={t('__CAMPAIGN_WIDGET_BUGDISTRIBUTION_TOOLTIP')}
      >
        <CapitalizeFirstLetter>
          <Trans i18nKey="__CAMPAIGN_WIDGET_BUGDISTRIBUTION_HEADER">
            {{
              severity: translateSeverity(maxSeverity, t),
            }}{' '}
            bugs
          </Trans>
        </CapitalizeFirstLetter>
      </BasicWidget.Header>
      {isLoading ? (
        <WidgetLoader />
      ) : (
        <>
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
                  color: appTheme.colors.bySeverity[maxSeverity as Severities],
                }}
              >
                {`${data.bySeverity[maxSeverity as Severities] || 0} `}
                <XL
                  tag="span"
                  isBold
                  color={appTheme.colors.bySeverity[maxSeverity]}
                >
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
                defaults="out of <bold>{{total}}</bold> unique"
                count={data.total || 0}
                components={{
                  bold: (
                    <Span
                      isBold
                      style={{ color: appTheme.components.text.primaryColor }}
                    />
                  ),
                }}
                values={{
                  total: data.total || 0,
                }}
              />
            }
          />
        </>
      )}

      <BasicWidget.Footer>
        <Anchor
          id="anchor-bugs-list-bugs-distribution-widget"
          isExternal
          onClick={() =>
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            window.open(
              getLocalizedFunctionalDashboardUrl(campaignId, i18n.language)
            )
          }
        >
          <SM tag="span">
            {t('__CAMPAIGN_WIDGET_BUGDISTRIBUTION_GOTOLIST_LINK')}
          </SM>
        </Anchor>
      </BasicWidget.Footer>
    </BasicWidget>
  );
};

export default BugDistributionCard;
