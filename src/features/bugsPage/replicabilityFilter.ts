import { useAppSelector } from 'src/app/hooks';

export type ReplicabilityFilterType = {
  replicabilities: {
    available: { id: number; name: string }[];
    selected: { id: number; name: string }[];
  };
};

export const ReplicabilityFilter = {
  reset: (state: ReplicabilityFilterType) => ({
    replicabilities: {
      ...ReplicabilityFilter.getCurrent(state),
      selected: [],
    },
  }),
  getCurrent: (state?: ReplicabilityFilterType) => ({
    available: state ? state.replicabilities.available : [],
    selected: state ? state.replicabilities.selected : [],
  }),
  setAvailable: (
    state: ReplicabilityFilterType,
    replicabilities: { id: number; name: string }[]
  ) => ({
    replicabilities: {
      ...ReplicabilityFilter.getCurrent(state),
      ...(replicabilities ? { available: replicabilities } : {}),
    },
  }),
  filter: (
    state: ReplicabilityFilterType,
    replicabilities?: { id: number; name: string }[]
  ) => ({
    replicabilities: {
      ...ReplicabilityFilter.getCurrent(state),
      ...(replicabilities ? { selected: replicabilities } : {}),
    },
  }),
  getValues: () => {
    const bugsPageSlice = useAppSelector((state) => state.bugsPage);

    if (!bugsPageSlice.currentCampaign) return undefined;

    if (!bugsPageSlice.campaigns[bugsPageSlice.currentCampaign].replicabilities)
      return undefined;

    const campaign: ReplicabilityFilterType =
      bugsPageSlice.campaigns[bugsPageSlice.currentCampaign];

    return campaign.replicabilities.selected;
  },
  getIds: () => {
    const values = ReplicabilityFilter.getValues();
    if (!values) return undefined;
    return values.map((t) => t.id);
  },
};
