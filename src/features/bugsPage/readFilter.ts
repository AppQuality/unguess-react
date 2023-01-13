import { useAppSelector } from 'src/app/hooks';

export type ReadFilterType = {
  read: {
    available: ('all' | 'unread')[];
    selected: 'all' | 'unread';
  };
};

export const ReadFilter = {
  getCurrent: (state?: ReadFilterType) => ({
    available: state
      ? state.read.available
      : ['all' as const, 'unread' as const],
    selected: state ? state.read.selected : ('unread' as const),
  }),
  setAvailable: (state: ReadFilterType) => ({
    read: ReadFilter.getCurrent(state),
  }),
  filter: (
    state: ReadFilterType,
    read?: ReadFilterType['read']['selected']
  ) => ({
    read: {
      ...ReadFilter.getCurrent(state),
      ...(read ? { selected: read } : {}),
    },
  }),
  getValue: () => {
    const bugsPageSlice = useAppSelector((state) => state.bugsPage);

    if (!bugsPageSlice.currentCampaign) return undefined;

    if (!bugsPageSlice.campaigns[bugsPageSlice.currentCampaign].severities)
      return undefined;

    const campaign: ReadFilterType =
      bugsPageSlice.campaigns[bugsPageSlice.currentCampaign];

    return campaign.read.selected;
  },
};
