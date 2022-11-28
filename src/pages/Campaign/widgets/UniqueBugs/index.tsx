import {
  theme as globalTheme,
  WaffleChart,
  XL,
  Skeleton,
  MD,
  Span,
} from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { useUniqueBugs } from './useUniqueBugs';
import WaffleTooltip from './WaffleTooltip';
import { BasicWidget } from '../widgetCards/BasicWidget';

export const UniqueBugs = ({ campaignId }: { campaignId: number }) => {
  const { bugs, uniqueBugs, isLoading, uniquePercent } =
    useUniqueBugs(campaignId);

  if (isLoading) return <Skeleton />;

  return (
    <BasicWidget>
      <BasicWidget.Header
        tooltipContent={t('__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_TOOLTIP')}
      >
        {t('__CAMPAIGN_PAGE_UNIQUE_BUGS_TITLE')}
      </BasicWidget.Header>
      <WaffleChart
        total={{ label: 'total', value: bugs }}
        data={{ label: 'unique', value: uniqueBugs }}
        tooltip={({ value, label }) => (
          <WaffleTooltip
            value={value}
            label={label}
            percentage={Math.floor(uniquePercent * 100)}
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
            values={{ total: bugs }}
          />
        }
      />
    </BasicWidget>
  );
};
