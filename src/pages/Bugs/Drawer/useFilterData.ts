import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/app/hooks';
import {
  GetCampaignsByCidBugsApiResponse,
  useGetCampaignsByCidBugsQuery,
} from 'src/features/api';
import { getSelectedFiltersIds } from 'src/features/bugsPage/bugsPageSlice';
import { CounterItems } from '../types';

type Filter =
  | 'types'
  | 'severities'
  | 'read'
  | 'unique'
  | 'tags'
  | 'useCases'
  | 'devices'
  | 'os'
  | 'replicabilities';

type Bug = ItemOfArray<GetCampaignsByCidBugsApiResponse['items']>;

export const useFilterData = (filter: Filter) => {
  const [counters, setCounters] = useState<CounterItems>({});
  const { currentCampaign } = useAppSelector((state) => state.bugsPage);
  const filterBy = getSelectedFiltersIds();

  // Remove current filter
  filterBy[filter as Filter] = undefined;

  if (!currentCampaign)
    return {
      counters: {},
      loading: true,
    };

  const {
    isLoading,
    isFetching,
    data: bugs,
  } = useGetCampaignsByCidBugsQuery({
    cid: currentCampaign.toString() ?? '0',
    filterBy: {
      ...(filterBy?.types ? { types: filterBy.types.join(',') } : {}),
      ...(filterBy?.severities
        ? { severities: filterBy.severities.join(',') }
        : {}),
      ...(filterBy?.read && filterBy.read === 'unread'
        ? { read: 'false' }
        : {}),
      ...(filterBy?.unique && filterBy.unique === 'unique'
        ? { is_duplicated: '0' }
        : {}),
    },
    ...(filterBy?.search ? { search: filterBy.search } : {}),

    orderBy: 'severity_id',
    order: 'DESC',
  });

  useEffect(() => {
    if (bugs && bugs.items) {
      const filterCounts = bugs.items.reduce((acc: CounterItems, bug: Bug) => {
        if (filter === 'types') {
          acc[bug.type.id] = (acc[bug.type.id] || 0) + 1;
        } else if (filter === 'severities') {
          acc[bug.severity.id] = (acc[bug.severity.id] || 0) + 1;
        } else if (filter === 'read') {
          acc.read = (acc.read || 0) + 1;
        } else if (filter === 'unique') {
          acc.unique = (acc.unique || 0) + 1;
        } else if (filter === 'tags') {
          if (bug?.tags?.length) {
            bug.tags.forEach((tag) => {
              acc[tag.tag_id] = (acc[tag.tag_id] || 0) + 1;
            });
          }
        } else if (filter === 'useCases') {
          acc[bug.application_section.id || -1] =
            (acc[bug.application_section.id || -1] || 0) + 1;
          // } else if (filter === 'devices') {
          //   bug.devices.forEach((device) => {
          //     acc[device.id] = (acc[device.id] || 0) + 1;
          //   });
        } else if (filter === 'os') {
          acc[`${bug.device.os}_${bug.device.os_version}`] =
            (acc[`${bug.device.os}_${bug.device.os_version}`] || 0) + 1;
        } else if (filter === 'replicabilities') {
          acc[bug.replicability.id] = (acc[bug.replicability.id] || 0) + 1;
        }
        return acc;
      }, {});
      setCounters(filterCounts);
    }
  }, [bugs]);

  return {
    counters,
    loading: isLoading || isFetching,
  };
};
