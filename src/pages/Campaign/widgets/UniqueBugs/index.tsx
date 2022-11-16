import {
  theme,
  WaffleChart,
  XL,
  Skeleton,
  MD,
} from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { useUniqueBugs } from './useUniqueBugs';
import { WidgetCard } from '../WidgetCard';

export const UniqueBugs = () => {
  const { bugs, uniqueBugs, isLoading, uniquePercent } = useUniqueBugs(4852);

  if (isLoading) return <Skeleton />;

  return (
    <WidgetCard>
      <WidgetCard.Header
        tooltipContent={t('__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_TOOLTIP')}
      >
        {t('__CAMPAIGN_PAGE_UNIQUE_BUGS_TITLE')}
      </WidgetCard.Header>
      <WaffleChart
        total={{ label: 'total', value: bugs }}
        data={{ label: 'unique', value: uniqueBugs }}
        tooltip={({ value, label }) => (
          <div style={{ padding: '5px 9px' }}>
            {label === 'unique' ? (
              <Trans i18nKey="__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_WAFFLE_TOOLTIP_UNIQUE">
                {{ value }} unique bugs -{' '}
                {{ percent: Math.floor(uniquePercent * 100) }}%
              </Trans>
            ) : null}
            {label === 'total' ? (
              <Trans i18nKey="__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_WAFFLE_TOOLTIP_TOTAL">
                Total bugs: {{ value }}
              </Trans>
            ) : null}
          </div>
        )}
        width="40%"
        height="140px"
      />
      <WidgetCard.Description
        header={t('__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_REPORTED_BY')}
        content={
          <span style={{ color: theme.palette.blue[600] }}>
            {uniqueBugs}{' '}
            <XL tag="span" isBold>
              <Trans i18nKey="__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_COUNT_DESCRIPTION">
                unique bugs
              </Trans>
            </XL>
          </span>
        }
        footer={
          <Trans
            i18nKey="__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_TOTAL_DESCRIPTION"
            components={{ bold: <MD isBold tag="span" /> }}
            defaults="out of <bold>{{ total }}</bold>"
            values={{ total: bugs }}
          />
        }
      />
      <WidgetCard.Footer>
        <span />
      </WidgetCard.Footer>
    </WidgetCard>
  );
};
