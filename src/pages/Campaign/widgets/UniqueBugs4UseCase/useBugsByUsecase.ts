import { useState, useEffect } from 'react';
import {
  useGetCampaignsByCidWidgetsQuery,
  WidgetBugsByUseCase,
} from 'src/features/api';

import { WidgetItem } from './types';

function abbreviateUsecase(string: string): string {
  return string
    .toLowerCase()
    .replace(/use case /, 'UC')
    .replace(/caso d'uso /, 'UC');
}

function getSimpleTitle(title: WidgetBugsByUseCase['data'][0]['title']) {
  if (title.simple) {
    return title.simple.toLowerCase();
  }
  return title.full
    .replace(/\[(.*?)\]/, '')
    .replace(/use case\s?[0-9]*:*/i, '')
    .replace(/caso d'uso\s?[0-9]*:*/i, '')
    .toLowerCase();
}
function getArcLinkLabel(title: WidgetBugsByUseCase['data'][0]['title']) {
  return abbreviateUsecase(title.full);
}

function getLegendLabel(title: WidgetBugsByUseCase['data'][0]['title']) {
  if (title.prefix && title.simple) {
    return `${title.prefix} ${title.simple}`;
  }
  return getSimpleTitle(title);
}

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
        data.data.map((item, index) => ({
          id: getArcLinkLabel(item.title) + index,
          label: getLegendLabel(item.title),
          value: item.bugs,
          key: item.usecase_id,
          children: item.title.full,
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
