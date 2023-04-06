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
  | 'priorities'
  | 'customStatuses'
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

  const {
    isLoading,
    isFetching,
    data: bugs,
  } = useGetCampaignsByCidBugsQuery({
    cid: currentCampaign ? currentCampaign.toString() : '0',
    filterBy: {
      ...(filterBy?.useCases ? { usecases: filterBy.useCases.join(',') } : {}),
      ...(filterBy?.types ? { types: filterBy.types.join(',') } : {}),
      ...(filterBy?.replicabilities
        ? { replicabilities: filterBy.replicabilities.join(',') }
        : {}),
      ...(filterBy?.os ? { os: filterBy.os.join(',') } : {}),
      ...(filterBy?.devices ? { devices: filterBy.devices.join(',') } : {}),
      ...(filterBy?.tags ? { tags: filterBy.tags.join(',') } : {}),
      ...(filterBy?.severities
        ? { severities: filterBy.severities.join(',') }
        : {}),
      ...(filterBy?.priorities
        ? { priorities: filterBy.priorities.join(',') }
        : {}),
      ...(filterBy?.customStatuses
        ? { customStatuses: filterBy.customStatuses.join(',') }
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
          if (!bug.read) {
            acc.unread = (acc.unread || 0) + 1;
          }
          acc.all = (acc.all || 0) + 1;
        } else if (filter === 'unique') {
          if (!bug.duplicated_of_id) {
            acc.unique = (acc.unique || 0) + 1;
          }
          acc.all = (acc.all || 0) + 1;
        } else if (filter === 'tags') {
          if (bug?.tags?.length) {
            bug.tags.forEach((tag) => {
              acc[tag.tag_id] = (acc[tag.tag_id] || 0) + 1;
            });
          } else {
            acc.none = (acc.none || 0) + 1;
          }
        } else if (filter === 'priorities' && bug.priority !== undefined) {
          acc[bug.priority.id] = (acc[bug.priority.id] || 0) + 1;
        } else if (
          filter === 'customStatuses' &&
          bug.custom_status !== undefined
        ) {
          acc[bug.custom_status.id] = (acc[bug.custom_status.id] || 0) + 1;
        } else if (filter === 'useCases') {
          acc[bug.application_section.id || -1] =
            (acc[bug.application_section.id || -1] || 0) + 1;
        } else if (filter === 'devices') {
          if (bug.device.type === 'desktop') {
            acc[bug.device.desktop_type] =
              (acc[bug.device.desktop_type] || 0) + 1;
          } else {
            acc[`${bug.device.manufacturer} ${bug.device.model}`] =
              (acc[`${bug.device.manufacturer} ${bug.device.model}`] || 0) + 1;
          }
        } else if (filter === 'os') {
          acc[`${bug.device.os} ${bug.device.os_version}`] =
            (acc[`${bug.device.os} ${bug.device.os_version}`] || 0) + 1;
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
