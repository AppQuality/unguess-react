import { format } from 'date-fns';
import { Pill } from 'src/common/components/Pill';
import { ReactComponent as ClockIcon } from 'src/assets/icons/pill-icon-clock.svg';
import { theme } from 'src/app/theme';
import { useTranslation, Trans } from 'react-i18next';
import { Span } from '@appquality/unguess-design-system';

export const CampaignDurationPill = ({
  start,
  end,
  className,
}: {
  start: string;
  end: string;
  className?: string;
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
    <Pill
      {...{ className }}
      icon={<ClockIcon />}
      title={t('__CAMPAIGN_PAGE_INFO_HEADER_TEST_TIMING')}
      color={theme.palette.azure[600]}
    >
      <Trans i18nKey="__CAMPAIGN_PAGE_INFO_HEADER_FROM_DATE_TO_DATE">
        <Span>{{ start_date: formattedStartDate }}</Span> to{' '}
        <Span>{{ end_date: formattedEndDate }}</Span>
      </Trans>
    </Pill>
  );
};
