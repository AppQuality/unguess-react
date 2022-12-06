import { format } from 'date-fns';
import { TFunction } from 'i18next';
import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';

export const useWidgetData = (cid: number, t: TFunction) => {
  function getFormattedTime(time: number) {
    const hours = Math.round(time / (1000 * 60 * 60));
    const days = Math.round(time / (1000 * 60 * 60 * 24));
    if (hours <= 72) {
      return {
        value: hours,
        unit: t('__APP_HOURS_LABEL', { count: hours }),
      };
    }

    return {
      value: days,
      unit: t('__APP_DAYS_LABEL', { count: days }),
    };
  }

  function getFormattedStartDate(start_date: string, end_date: string) {
    if (
      new Date(end_date).getFullYear() !== new Date(start_date).getFullYear()
    ) {
      return format(new Date(start_date), 'dd/MM/yyyy');
    }

    return format(new Date(start_date), 'dd/MM');
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
  const {
    data: widget,
    isFetching,
    isLoading,
    isError,
  } = useGetCampaignsByCidWidgetsQuery({
    cid,
    s: 'cp-progress',
  });

  if (widget?.kind === 'campaignProgress') {
    widgetData = {
      raw: widget.data,
      duration: isClosed(widget.data.end_date)
        ? getFormattedTime(widget.data.expected_duration)
        : getFormattedTime(widget.data.time_elapsed),
      expectedDuration: isClosed(widget.data.end_date)
        ? (false as const)
        : getFormattedTime(widget.data.expected_duration),
      startDate: getFormattedStartDate(
        widget.data.start_date,
        widget.data.end_date
      ),
      endDate: format(new Date(widget.data.end_date), 'dd/MM/yyyy'),
      durationLabel: getCampaignDurationLabel(widget.data.end_date),
      elapsedTimePercentage: getElapsedTimePercentage(
        widget.data.time_elapsed,
        widget.data.expected_duration
      ),
    };
  }

  return {
    widgetData,
    isLoading: isFetching || isLoading || isError,
  };
};
