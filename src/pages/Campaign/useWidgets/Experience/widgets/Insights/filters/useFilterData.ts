import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/app/hooks';
import {
  GetCampaignsByCidBugsApiResponse,
  useGetCampaignsByCidBugsQuery,
  useGetCampaignsByCidUxQuery,
} from 'src/features/api';
import { getSelectedUxFiltersIds } from 'src/features/uxFilters';

type Filter = 'clusters' | 'severities';
export interface CounterItems {
  [key: string | number]: number;
}
type Bug = ItemOfArray<GetCampaignsByCidBugsApiResponse['items']>;

interface Insight {
  id: number;
  title: string;
  description: string;
  comment?: string;
  severity: {
    id: number;
    name?: string;
  };
  cluster:
    | {
        id: number;
        name: string;
      }[]
    | 'all';
}

export const useFilterData = (filter: Filter) => {
  const [counters, setCounters] = useState<CounterItems>({});
  const { currentCampaign } = useAppSelector((state) => state.uxFilters);
  const filterBy = getSelectedUxFiltersIds();

  // Remove current filter
  filterBy[filter as Filter] = undefined;

  const {
    isLoading,
    isFetching,
    data: ux,
  } = useGetCampaignsByCidUxQuery({
    cid: currentCampaign ? currentCampaign.toString() : '0',
    showAsCustomer: true, // TODO: add previewSupport
    filterBy: {
      ...(filterBy?.clusters ? { clusters: filterBy.clusters.join(',') } : {}),
      ...(filterBy?.severities
        ? { severities: filterBy.severities.join(',') }
        : {}),
    },
  });

  useEffect(() => {
    if (ux && ux.findings) {
      const filterCounts = ux.findings.reduce(
        (acc: CounterItems, insight: Insight) => {
          if (filter === 'clusters') {
            if (insight.cluster === 'all') {
              acc.all = (acc.all || 0) + 1;
            } else {
              insight.cluster.forEach((c) => {
                acc[c.id] = (acc[c.id] || 0) + 1;
              });
            }
          } else if (filter === 'severities') {
            acc[insight.severity.id] = (acc[insight.severity.id] || 0) + 1;
          }
          return acc;
        },
        {}
      );
      setCounters(filterCounts);
    }
  }, [ux]);

  return {
    counters,
    loading: isLoading || isFetching,
  };
};
