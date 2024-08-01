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
    available: state?.severities?.available ? state.severities.available : [],
    selected: state?.severities?.selected ? state.severities.selected : [],
  }),
  setAvailable: (state: SeverityFilterType, severities?: Tag[]) => ({
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
    const uxDataSlice = useAppSelector((state) => state.uxFilters);

    if (!uxDataSlice.currentCampaign) return undefined;

    if (!uxDataSlice.campaigns[uxDataSlice.currentCampaign].severities)
      return undefined;

    const campaign: SeverityFilterType =
      uxDataSlice.campaigns[uxDataSlice.currentCampaign];

    if (!campaign.severities.selected) return undefined;
    return campaign.severities.selected;
  },
  getIds: () => {
    const values = SeverityFilter.getValues();
    if (!values) return undefined;
    return values.map((t) => t.id);
  },
};
