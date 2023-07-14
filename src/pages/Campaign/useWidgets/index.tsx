import { useGetCampaignsByCidQuery } from 'src/features/api';
import { widgets as experienceWidgets } from './Experience/widgets';
import { widgets as functionalWidgets } from './Functional/widgets';
import { widgets as reportWidgets } from './Report/widgets';

export const useWidgets = ({ campaignId }: { campaignId: number }) => {
  const { data: campaign } = useGetCampaignsByCidQuery({
    cid: campaignId.toString(),
  });
  const functional = functionalWidgets({
    campaignId,
  });

  const experience = experienceWidgets({
    campaignId,
  });

  const reports = reportWidgets({
    campaignId,
  });

  if (!campaign)
    return {
      widgets: { all: [], footers: [], items: [], itemsWithTitles: [] },
      isLoading: false,
      isError: false,
    };

  const result = [...functional, ...experience, ...reports];
  return {
    widgets: {
      all: result,
      footers: result.filter(
        (widget): widget is typeof widget & { type: 'footer' } =>
          widget.type === 'footer'
      ),

      items: result.filter(
        (widget): widget is typeof widget & { type: 'item' } =>
          widget.type === 'item'
      ),
      itemsWithTitles: result.filter(
        (widget): widget is typeof widget & { type: 'item' | 'title' } =>
          widget.type === 'item' || widget.type === 'title'
      ),
    },
  };
};
