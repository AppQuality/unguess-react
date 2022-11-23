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
    return new Date(start_date).toLocaleDateString('it', options);
  }

  const isClosed = (end_date: string) => new Date(end_date) < new Date();

  const getCampaignDurationLabel = (end_date: string) => {
    if (isClosed(end_date)) {
      return t(
        '__CAMPAIGN_PAGE_WIDGET_PROGRESS_DESCRIPTION_HEADER_FINISHED',
        'Campaign duration:'
      );
    }
    return t(
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
    widgetData = {
      raw: data.data,
      duration: isClosed(data.data.end_date)
        ? getFormattedTime(data.data.expected_duration)
        : getFormattedTime(data.data.time_elapsed),
      expectedDuration: isClosed(data.data.end_date)
        ? (false as const)
        : getFormattedTime(data.data.expected_duration),
      startDate: getFormattedStartDate(
        data.data.start_date,
        data.data.end_date
      ),
      endDate: new Date(data.data.end_date).toLocaleDateString('it', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      }),
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
