import {
  theme as globalTheme,
  WaffleChart,
  XL,
  Skeleton,
  MD,
  Span,
  Tag,
} from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { ReactComponent as TrendIcon } from 'src/assets/icons/trend-icon.svg';
import { useUniqueBugs } from './useUniqueBugs';
import WaffleTooltip from './WaffleTooltip';
import { BasicWidget } from '../widgetCards/BasicWidget';

export const UniqueBugs = ({ campaignId }: { campaignId: number }) => {
  const {
    totalBugs,
    uniqueBugs,
    trendBugs,
    uniquePercentage,
    isLoading,
    isFetching,
    isError,
  } = useUniqueBugs(campaignId);

  if (isLoading || isFetching || isError) return <Skeleton />;

  const trendIcon = (
    <TrendIcon
      {...(trendBugs
        ? {
            color:
              trendBugs > 0
                ? globalTheme.palette.green[600]
                : globalTheme.palette.red[600],
          }
        : {})}
    />
  );

  let trendText = (
    <Span>{t('__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_TREND_EQUAL_LABEL')}</Span>
  );

  if (trendBugs !== 0) {
    trendText = (
      <Span>
        {trendBugs > 0 ? '+' : ''}
        {trendBugs}{' '}
        {t('__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_TREND_LABEL', {
          count: trendBugs,
        })}
      </Span>
    );
  }

  return (
    <BasicWidget>
      <BasicWidget.Header
        tooltipContent={t('__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_TOOLTIP')}
      >
        {t('__CAMPAIGN_PAGE_UNIQUE_BUGS_TITLE')}
      </BasicWidget.Header>
      <WaffleChart
        total={{ label: 'total', value: totalBugs }}
        data={{ label: 'unique', value: uniqueBugs }}
        tooltip={({ value, label }) => (
          <WaffleTooltip
            value={value}
            label={label}
            percentage={uniquePercentage}
          />
        )}
        width="40%"
        height="140px"
      />
      <BasicWidget.Description
        header={t('__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_REPORTED_BY')}
        content={
          <Span style={{ color: globalTheme.palette.blue[600] }}>
            <Trans
              count={uniqueBugs}
              i18nKey="__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_COUNT_LABEL"
              components={{ bold: <XL isBold tag="span" /> }}
              defaults="{{count}} <bold>unique bug</bold>"
            />
          </Span>
        }
        footer={
          <Trans
            i18nKey="__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_TOTAL_LABEL"
            components={{ bold: <MD isBold tag="span" /> }}
            defaults="out of <bold>{{ total }}</bold>"
            values={{ total: totalBugs }}
          />
        }
      />
      <BasicWidget.Footer>
        <Tag isPill>
          <Tag.Avatar>{trendIcon}</Tag.Avatar>
          {trendText}
        </Tag>
      </BasicWidget.Footer>
    </BasicWidget>
  );
};
