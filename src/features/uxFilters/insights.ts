import { useAppSelector } from 'src/app/hooks';

export type InsightStateType = {
  insights: {
    available: { id: number; name: string }[];
  };
};

export const InsightState = {
  getCurrent: (state?: InsightStateType) => ({
    available: state?.insights?.available ? state.insights.available : [],
  }),
  setAvailable: (
    state: InsightStateType,
    insights?: { id: number; name: string }[]
  ) => ({
    insights: {
      ...InsightState.getCurrent(state),
      ...(insights ? { available: insights } : {}),
    },
  }),
  getValues: () => {
    const uxDataSlice = useAppSelector((state) => state.uxFilters);

    if (!uxDataSlice.currentCampaign) return undefined;

    if (!uxDataSlice.campaigns[uxDataSlice.currentCampaign].insights)
      return undefined;

    const campaign: InsightStateType =
      uxDataSlice.campaigns[uxDataSlice.currentCampaign];

    if (!campaign.insights.available) return undefined;
    return campaign.insights.available;
  },
  getIndex: (id: number) => {
    const values = InsightState.getValues();
    if (!values) return undefined;
    return values.findIndex((t) => t.id === id);
  },
};
