import { format } from 'date-fns';
import { ReactComponent as ClockIcon } from 'src/assets/icons/pill-icon-clock.svg';
import { appTheme } from 'src/app/theme';
import { useTranslation, Trans } from 'react-i18next';
import { Span } from '@appquality/unguess-design-system';
import { Meta } from 'src/common/components/Meta';

export const CampaignDurationMeta = ({
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
    <Meta
      size="large"
      className="campaign-duration-pill"
      color={appTheme.palette.azure[600]}
      icon={<ClockIcon />}
      secondaryText={
        <Trans i18nKey="__CAMPAIGN_PAGE_INFO_HEADER_FROM_DATE_TO_DATE">
          <Span>{{ start_date: formattedStartDate }}</Span> to{' '}
          <Span>{{ end_date: formattedEndDate }}</Span>
        </Trans>
      }
    >
      {t('__CAMPAIGN_PAGE_INFO_HEADER_TEST_TIMING')}
    </Meta>
  );
};
