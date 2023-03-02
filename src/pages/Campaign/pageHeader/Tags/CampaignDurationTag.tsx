import { format } from 'date-fns';
import { ReactComponent as ClockIcon } from 'src/assets/icons/pill-icon-clock.svg';
import { theme } from 'src/app/theme';
import { useTranslation, Trans } from 'react-i18next';
import { Span, Tag } from '@appquality/unguess-design-system';

export const CampaignDurationTag = ({
  start,
  end,
}: {
  start: string;
  end: string;
}) => {
  const { t } = useTranslation();

  const startDate = new Date(start);
  const endDate = new Date(end);
  const formattedStartDate =
    startDate.getFullYear() === endDate.getFullYear()
      ? format(startDate, 'dd/MM')
      : format(startDate, 'dd/MM/yyyy');
  const formattedEndDate = format(endDate, 'dd/MM/yyyy');

  return (
    <Tag
      size="large"
      className="campaign-duration-pill"
      color={theme.palette.azure[600]}
      hue="rgba(0,0,0,0)"
    >
      <Tag.Avatar>
        <ClockIcon />
      </Tag.Avatar>
      {t('__CAMPAIGN_PAGE_INFO_HEADER_TEST_TIMING')}
      <Tag.SecondaryText isBold color={theme.palette.grey[700]}>
        <Trans i18nKey="__CAMPAIGN_PAGE_INFO_HEADER_FROM_DATE_TO_DATE">
          <Span>{{ start_date: formattedStartDate }}</Span> to{' '}
          <Span>{{ end_date: formattedEndDate }}</Span>
        </Trans>
      </Tag.SecondaryText>
    </Tag>
  );
};
