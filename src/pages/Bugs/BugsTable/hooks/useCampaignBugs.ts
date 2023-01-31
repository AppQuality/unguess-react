import { useGetCampaignsByCidBugsQuery } from 'src/features/api';
import { getSelectedFiltersIds } from 'src/features/bugsPage/bugsPageSlice';

export const useCampaignBugs = (campaignId: number) => {
  const filterBy = getSelectedFiltersIds();
  const {
    isLoading,
    isFetching,
    error,
    data: bugs,
  } = useGetCampaignsByCidBugsQuery({
    cid: campaignId.toString() ?? '0',
    filterBy: {
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

  return {
    bugs,
    bugsError: error,
    bugsLoading: isLoading || isFetching,
  };
};
