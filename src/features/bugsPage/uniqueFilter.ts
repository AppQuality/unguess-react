import { useAppSelector } from 'src/app/hooks';

export type UniqueFilterType = {
  unique: {
    available: ('all' | 'unique')[];
    selected?: 'all' | 'unique' | false;
  };
};

export const UniqueFilter = {
  getCurrent: (state?: UniqueFilterType) => ({
    available: state
      ? state.unique.available
      : ['all' as const, 'unique' as const],
    selected: state ? state.unique.selected : 'unique',
  }),
  setAvailable: (state: UniqueFilterType) => ({
    unique: UniqueFilter.getCurrent(state),
  }),
  filter: (
    state: UniqueFilterType,
    unique?: UniqueFilterType['unique']['selected']
  ) => ({
    unique: {
      ...UniqueFilter.getCurrent(state),
      ...(unique || unique === false ? { selected: unique ?? undefined } : {}),
    },
  }),
  getValue: () => {
    const bugsPageSlice = useAppSelector((state) => state.bugsPage);

    if (!bugsPageSlice.currentCampaign) return undefined;

    if (!bugsPageSlice.campaigns[bugsPageSlice.currentCampaign].severities)
      return undefined;

    const campaign: UniqueFilterType =
      bugsPageSlice.campaigns[bugsPageSlice.currentCampaign];

    return campaign.unique.selected;
  },
};
