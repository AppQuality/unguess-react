import { Span, Tag } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { ReactComponent as TrendIcon } from 'src/assets/icons/trend-icon.svg';

const BasicTrendPill = ({ color, text }: { color: string; text: string }) => (
  <Tag id="pill-trend-unique-bugs-widget">
    <Tag.Avatar>
      <TrendIcon color={color} />
    </Tag.Avatar>
    <Span>{text}</Span>
  </Tag>
);

const StableTrendPill = () => {
  const { t } = useTranslation();
  return (
    <BasicTrendPill
      color={appTheme.palette.blue[600]}
      text={t('__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_TREND_EQUAL_LABEL')}
    />
  );
};

const PositiveTrendPill = ({ trend }: { trend: number }) => {
  const { t } = useTranslation();
  return (
    <BasicTrendPill
      color={appTheme.palette.green[600]}
      text={`+${trend} ${t('__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_TREND_LABEL', {
        count: trend,
      })}`}
    />
  );
};

const NegativeTrendPill = ({ trend }: { trend: number }) => {
  const { t } = useTranslation();
  return (
    <BasicTrendPill
      color={appTheme.palette.red[600]}
      text={`${trend} ${t('__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_TREND_LABEL', {
        count: trend,
      })}`}
    />
  );
};

const TrendPill = ({ trend }: { trend: number }) => {
  if (trend > 0) {
    return <PositiveTrendPill trend={trend} />;
  }
  if (trend < 0) {
    return <NegativeTrendPill trend={trend} />;
  }
  return <StableTrendPill />;
};

export { TrendPill };
