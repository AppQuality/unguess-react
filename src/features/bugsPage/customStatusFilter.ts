import { useAppSelector } from 'src/app/hooks';

export type CustomStatusFilterType = {
  customStatuses: {
    available: { id: number; name: string }[];
    selected: { id: number; name: string }[];
    IsNaBugExcluded?: boolean;
  };
};

export const CustomStatusFilter = {
  reset: (state: CustomStatusFilterType) => ({
    customStatuses: {
      ...CustomStatusFilter.getCurrent(state),
      selected: [],
    },
  }),
  getCurrent: (state?: CustomStatusFilterType) => ({
    available: state ? state.customStatuses.available : [],
    selected: state ? state.customStatuses.selected : [],
  }),
  setAvailable: (
    state: CustomStatusFilterType,
    customStatuses: { id: number; name: string }[]
  ) => ({
    customStatuses: {
      ...CustomStatusFilter.getCurrent(state),
      ...(customStatuses ? { available: customStatuses } : {}),
    },
  }),
  filter: (
    state: CustomStatusFilterType,
    customStatuses?: { id: number; name: string }[]
  ) => ({
    customStatuses: {
      ...CustomStatusFilter.getCurrent(state),
      ...(customStatuses ? { selected: customStatuses } : {}),
    },
  }),
  getValues: () => {
    const bugsPageSlice = useAppSelector((state) => state.bugsPage);

    if (!bugsPageSlice.currentCampaign) return undefined;

    if (!bugsPageSlice.campaigns[bugsPageSlice.currentCampaign].customStatuses)
      return undefined;

    const campaign: CustomStatusFilterType =
      bugsPageSlice.campaigns[bugsPageSlice.currentCampaign];

    return campaign.customStatuses.selected;
  },
  getIds: () => {
    const values = CustomStatusFilter.getValues();
    if (!values) return undefined;
    return values.map((t) => t.id);
  },
};
