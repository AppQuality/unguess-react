import { useAppSelector } from 'src/app/hooks';

export type OsFilterType = {
  os: {
    available: {
      os: string;
    }[];
    selected: {
      os: string;
    }[];
  };
};

export const OsFilter = {
  reset: (state: OsFilterType) => ({
    os: {
      ...OsFilter.getCurrent(state),
      selected: [],
    },
  }),
  getCurrent: (state?: OsFilterType) => ({
    available: state?.os?.available ? state.os.available : [],
    selected: state?.os?.selected ? state.os.selected : [],
  }),
  setAvailable: (
    state: OsFilterType,
    os?: {
      os: string;
    }[]
  ) => ({
    os: {
      ...OsFilter.getCurrent(state),
      ...(os ? { available: os } : {}),
    },
  }),
  filter: (
    state: OsFilterType,
    os?: {
      os: string;
    }[]
  ) => ({
    os: {
      ...OsFilter.getCurrent(state),
      ...(os ? { selected: os } : {}),
    },
  }),
  getValues: () => {
    const bugsPageSlice = useAppSelector((state) => state.bugsPage);

    if (!bugsPageSlice.currentCampaign) return undefined;

    if (!bugsPageSlice.campaigns[bugsPageSlice.currentCampaign].os)
      return undefined;

    const campaign: OsFilterType =
      bugsPageSlice.campaigns[bugsPageSlice.currentCampaign];

    if (!campaign.os.selected) return undefined;
    return campaign.os.selected;
  },
  getIds: () => {
    const values = OsFilter.getValues();
    if (!values) return undefined;
    return values.map((t) => t.os);
  },
};
