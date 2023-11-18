import { useAppSelector } from 'src/app/hooks';

export type ClusterFilterType = {
  clusters: {
    available: { id: number; name: string }[];
    selected: { id: number; name: string }[];
  };
};

export const ClusterFilter = {
  reset: (state: ClusterFilterType) => ({
    clusters: {
      ...ClusterFilter.getCurrent(state),
      selected: [],
    },
  }),
  getCurrent: (state?: ClusterFilterType) => ({
    available: state?.clusters?.available ? state.clusters.available : [],
    selected: state?.clusters?.selected ? state.clusters.selected : [],
  }),
  setAvailable: (
    state: ClusterFilterType,
    clusters?: { id: number; name: string }[]
  ) => ({
    clusters: {
      ...ClusterFilter.getCurrent(state),
      ...(clusters ? { available: clusters } : {}),
    },
  }),
  filter: (
    state: ClusterFilterType,
    clusters?: { id: number; name: string }[]
  ) => ({
    types: {
      ...ClusterFilter.getCurrent(state),
      ...(clusters ? { selected: clusters } : {}),
    },
  }),
  getValues: () => {
    const uxDataSlice = useAppSelector((state) => state.uxFilters);

    if (!uxDataSlice.currentCampaign) return undefined;

    if (!uxDataSlice.campaigns[uxDataSlice.currentCampaign].clusters)
      return undefined;

    const campaign: ClusterFilterType =
      uxDataSlice.campaigns[uxDataSlice.currentCampaign];

    if (!campaign.clusters.selected) return undefined;
    return campaign.clusters.selected;
  },
  getIds: () => {
    const values = ClusterFilter.getValues();
    if (!values) return undefined;
    return values.map((t) => t.id);
  },
};
