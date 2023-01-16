import { useAppSelector } from 'src/app/hooks';

export type SearchFilterType = {
  search?: string;
};

export const SearchFilter = {
  reset: () => ({
    search: '',
  }),
  getCurrent: (state?: SearchFilterType) => state?.search,
  setAvailable: (state: SearchFilterType) => ({
    search: SearchFilter.getCurrent(state),
  }),
  filter: (state: SearchFilterType, search?: SearchFilterType['search']) => ({
    search,
  }),
  getValue: () => {
    const bugsPageSlice = useAppSelector((state) => state.bugsPage);

    if (!bugsPageSlice.currentCampaign) return undefined;

    if (!bugsPageSlice.campaigns[bugsPageSlice.currentCampaign].severities)
      return undefined;

    const campaign: SearchFilterType =
      bugsPageSlice.campaigns[bugsPageSlice.currentCampaign];

    return campaign.search;
  },
};
