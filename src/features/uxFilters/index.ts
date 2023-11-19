import { createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from 'src/app/hooks';
import { ClusterFilter, ClusterFilterType } from './clusterFilter';
import { SeverityFilter, SeverityFilterType } from './severityFilter';
import { InsightState, InsightStateType } from './insights';

export interface FilterState {
  currentCampaign?: number;
  campaigns: {
    [campaign_id: string]: ClusterFilterType &
      SeverityFilterType &
      InsightStateType;
  };
}

const initialState: FilterState = {
  campaigns: {},
};

const filtersSlice = createSlice({
  name: 'uxfilters',
  initialState,
  reducers: {
    selectUxCampaign: (state, action) => {
      const { campaignId, filters } = action.payload;
      state.campaigns[campaignId as number] = {
        ...(state.campaigns[campaignId as number]
          ? state.campaigns[campaignId as number]
          : {}),
        ...ClusterFilter.setAvailable(
          state.campaigns[campaignId as number],
          filters.clusters
        ),
        ...SeverityFilter.setAvailable(
          state.campaigns[campaignId as number],
          filters.severities
        ),
        ...InsightState.setAvailable(
          state.campaigns[campaignId as number],
          filters.insights
        ),
      };
      state.currentCampaign = campaignId;
    },
    updateFilters: (state, action) => {
      const { filters } = action.payload;
      if (!state.currentCampaign) return;

      state.campaigns[state.currentCampaign] = {
        ...state.campaigns[state.currentCampaign],
        ...ClusterFilter.filter(
          state.campaigns[state.currentCampaign],
          filters.clusters
        ),
        ...SeverityFilter.filter(
          state.campaigns[state.currentCampaign],
          filters.severities
        ),
      };
    },
    resetFilters(state) {
      if (!state.currentCampaign) return;
      state.campaigns[state.currentCampaign] = {
        ...state.campaigns[state.currentCampaign],
        ...ClusterFilter.reset(state.campaigns[state.currentCampaign]),
        ...SeverityFilter.reset(state.campaigns[state.currentCampaign]),
      };
    },
  },
});

export const getSelectedUxFiltersIds = () => ({
  clusters: ClusterFilter.getIds(),
  severities: SeverityFilter.getIds(),
});

export const getSelectedUxFilters = () => ({
  clusters: ClusterFilter.getValues(),
  severities: SeverityFilter.getValues(),
});

export const getCurrentUxData = () => {
  const { currentCampaign, campaigns } = useAppSelector(
    (state) => state.uxFilters
  );
  if (!currentCampaign || !campaigns[currentCampaign as number]) return null;

  const campaign = campaigns[currentCampaign as number];
  if (!campaign) return false;
  return campaign;
};

export const { selectUxCampaign, updateFilters, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
