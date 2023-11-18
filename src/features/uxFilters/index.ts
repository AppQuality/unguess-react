import { createSlice } from '@reduxjs/toolkit';
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
    selectCampaign: (state, action) => {
      const { cp_id, filters } = action.payload;

      state.campaigns[cp_id as number] = {
        ...(state.campaigns[cp_id as number]
          ? state.campaigns[cp_id as number]
          : {}),
        ...ClusterFilter.setAvailable(
          state.campaigns[cp_id as number],
          filters.clusters
        ),
        ...SeverityFilter.setAvailable(
          state.campaigns[cp_id as number],
          filters.severities
        ),
        ...InsightState.setAvailable(
          state.campaigns[cp_id as number],
          filters.insights
        ),
      };
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

export const { selectCampaign, updateFilters, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
