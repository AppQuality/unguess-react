import {
  Tag,
  theme,
  WaffleChart,
  XL,
  Skeleton,
} from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { ReactComponent as TrendPositiveIcon } from 'src/assets/icons/trend-positive.svg';
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
        total={{ label: 'bug totali', value: bugs }}
        data={{ label: 'bug unici - 27%', value: uniqueBugs }}
        width="40%"
        height="140px"
      />
      <WidgetCard.Description
        header={t('__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_REPORTED_BY')}
        content={
          <span style={{ color: theme.palette.blue[600] }}>
            27
            <XL tag="span" isBold>
              Unique Bugs
            </XL>
          </span>
        }
        footer="out of 60 total"
      />
      <WidgetCard.Footer>
        <span style={{ color: theme.palette.grey[800] }}>
          <Tag isPill>
            <Tag.Avatar>
              <TrendPositiveIcon />
            </Tag.Avatar>
            +12 Unique bugs
          </Tag>
        </span>
      </WidgetCard.Footer>
    </WidgetCard>
  );
};
