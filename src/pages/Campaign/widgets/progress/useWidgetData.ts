import { TFunction } from 'i18next';
import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';

export const useWidgetData = (
  cid: number,
  t: TFunction,
  currentLanguage: string
) => {
  function getFormattedTime(time: number) {
    const hours = Math.round(time / (1000 * 60 * 60));
    const days = Math.round(time / (1000 * 60 * 60 * 24));
    if (hours <= 72) {
      return {
        value: hours,
        unit: t('hours', { count: hours }),
      };
    }
    return {
      value: days,
      unit: t('days', { count: days }),
    };
  }
  function getFormattedStartDate(start_date: string, end_date: string) {
    const options: Intl.DateTimeFormatOptions = {
      month: 'numeric',
      day: 'numeric',
    };
    if (
      new Date(end_date).getFullYear() !== new Date(start_date).getFullYear()
    ) {
      options.year = 'numeric';
    }
    return new Date(start_date).toLocaleDateString(currentLanguage, options);
  }
  const getCampaignDurationLabel = (end_date: string) => {
    const endDate = new Date(end_date);
    const today = new Date();
    return today > endDate
      ? t(
          '__CAMPAIGN_PAGE_WIDGET_PROGRESS_DESCRIPTION_HEADER_FINISHED',
          'Campaign duration:'
        )
      : t(
          '__CAMPAIGN_PAGE_WIDGET_PROGRESS_DESCRIPTION_HEADER_ACTIVE',
          'Active since:'
        );
  };

  function getElapsedTimePercentage(
    time_elapsed: number,
    expected_duration: number
  ): number {
    const percentage = Math.round((time_elapsed / expected_duration) * 100);
    return percentage > 100 ? 100 : percentage;
  }

  let widgetData;
  const { data, isFetching, isLoading, isError } =
    useGetCampaignsByCidWidgetsQuery({
      cid,
      s: 'cp-progress',
    });

  if (data?.kind === 'campaignProgress') {
    const expectedDuration = getFormattedTime(data.data.expected_duration);
    widgetData = {
      raw: data.data,
      expectedDuration: `${expectedDuration.value} ${expectedDuration.unit}`,
      timeElapsed: getFormattedTime(data.data.time_elapsed),
      startDate: getFormattedStartDate(
        data.data.start_date,
        data.data.end_date
      ),
      endDate: new Date(data.data.end_date).toLocaleDateString(
        currentLanguage,
        { month: 'numeric', day: 'numeric', year: 'numeric' }
      ),
      durationLabel: getCampaignDurationLabel(data.data.end_date),
      elapsedTimePercentage: getElapsedTimePercentage(
        data.data.time_elapsed,
        data.data.expected_duration
      ),
    };
  }

  return {
    widgetData,
    isLoading: isFetching || isLoading || isError,
  };
};
