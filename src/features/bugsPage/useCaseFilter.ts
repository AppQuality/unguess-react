import { useAppSelector } from 'src/app/hooks';

export type UseCaseFilterType = {
  useCases: {
    available: {
      id: number;
      title: {
        full: string;
        simple?: string;
        prefix?: string;
        info?: string;
      };
      completion: number;
    }[];
    selected: {
      id: number;
      title: {
        full: string;
        simple?: string;
        prefix?: string;
        info?: string;
      };
      completion: number;
    }[];
  };
};

export const UseCaseFilter = {
  reset: (state: UseCaseFilterType) => ({
    useCases: {
      ...UseCaseFilter.getCurrent(state),
      selected: [],
    },
  }),
  getCurrent: (state?: UseCaseFilterType) => ({
    available: state?.useCases?.available ? state.useCases.available : [],
    selected: state?.useCases?.selected ? state.useCases.selected : [],
  }),
  setAvailable: (
    state: UseCaseFilterType,
    useCases?: {
      id: number;
      title: {
        full: string;
        simple?: string;
        prefix?: string;
        info?: string;
      };
      completion: number;
    }[]
  ) => ({
    useCases: {
      ...UseCaseFilter.getCurrent(state),
      ...(useCases ? { available: useCases } : {}),
    },
  }),
  filter: (
    state: UseCaseFilterType,
    useCases?: {
      id: number;
      title: {
        full: string;
        simple?: string;
        prefix?: string;
        info?: string;
      };
      completion: number;
    }[]
  ) => ({
    useCases: {
      ...UseCaseFilter.getCurrent(state),
      ...(useCases ? { selected: useCases } : {}),
    },
  }),
  getValues: () => {
    const bugsPageSlice = useAppSelector((state) => state.bugsPage);

    if (!bugsPageSlice.currentCampaign) return undefined;

    if (!bugsPageSlice.campaigns[bugsPageSlice.currentCampaign].tags)
      return undefined;

    const campaign: UseCaseFilterType =
      bugsPageSlice.campaigns[bugsPageSlice.currentCampaign];

    if (!campaign.useCases.selected) return undefined;
    return campaign.useCases.selected;
  },
  getIds: () => {
    const values = UseCaseFilter.getValues();
    if (!values) return undefined;
    return values.map((t) => t.id);
  },
};
