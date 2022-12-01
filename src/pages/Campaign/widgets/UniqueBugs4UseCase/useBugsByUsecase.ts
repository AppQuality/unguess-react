import { useState, useEffect } from 'react';
import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';
import { WidgetItem } from './types';

export const useBugsByUsecase = (campaignId: string) => {
  const { data, isFetching, isLoading, isError } =
    useGetCampaignsByCidWidgetsQuery({
      cid: parseInt(campaignId, 10),
      s: 'bugs-by-usecase',
    });
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<WidgetItem[]>([]);

  useEffect(() => {
    if (data && 'kind' in data && data.kind === 'bugsByUseCase') {
      const currentTotal = data.data.reduce(
        (acc, current) => acc + current.bugs,
        0
      );
      setTotal(currentTotal);
      setItems(
        data.data.map((item) => ({
          id: item.title
            .replace(/use case/i, 'UC')
            .replace(/caso d'uso/i, 'UC')
            .toLowerCase(),
          label: item.title
            .replace(/\[(.*?)\]/, '')
            .replace(/use case\s?[0-9]*:*/i, '')
            .replace(/caso d'uso\s?[0-9]*:*/i, '')
            .toLowerCase(),
          value: item.bugs,
          key: item.usecase_id,
          children: item.title,
          numerator: item.bugs,
          denominator: currentTotal,
        }))
      );
      return;
    }
    setTotal(0);
    setItems([]);
  }, [data]);

  return {
    total,
    items,
    isLoading: isLoading || isFetching || !data,
    isError,
  };
};
