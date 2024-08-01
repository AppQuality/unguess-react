import { useAppSelector } from 'src/app/hooks';

type Tag = {
  id: number;
  name: string;
  style?: string;
};

export type SeverityFilterType = {
  severities: {
    available: Tag[];
    selected: Tag[];
  };
};

export const SeverityFilter = {
  reset: (state: SeverityFilterType) => ({
    severities: {
      ...SeverityFilter.getCurrent(state),
      selected: [],
    },
  }),
  getCurrent: (state?: SeverityFilterType) => ({
    available: state ? state.severities.available : [],
    selected: state ? state.severities.selected : [],
  }),
  setAvailable: (state: SeverityFilterType, severities: Tag[]) => ({
    severities: {
      ...SeverityFilter.getCurrent(state),
      ...(severities ? { available: severities } : {}),
    },
  }),
  filter: (state: SeverityFilterType, severities?: Tag[]) => ({
    severities: {
      ...SeverityFilter.getCurrent(state),
      ...(severities ? { selected: severities } : {}),
    },
  }),
  getValues: () => {
    const bugsPageSlice = useAppSelector((state) => state.bugsPage);

    if (!bugsPageSlice.currentCampaign) return undefined;

    if (!bugsPageSlice.campaigns[bugsPageSlice.currentCampaign].severities)
      return undefined;

    const campaign: SeverityFilterType =
      bugsPageSlice.campaigns[bugsPageSlice.currentCampaign];

    return campaign.severities.selected;
  },
  getIds: () => {
    const values = SeverityFilter.getValues();
    if (!values) return undefined;
    return values.map((t) => t.id);
  },
};
