import { createSelector, createSlice } from "@reduxjs/toolkit";
import { selectFilteredCampaigns } from "../campaigns/campaignSlice";

export const StatusFilters = {
  All: "all",
  Running: "running",
  Completed: "completed",
  Incoming: "incoming",
};

export interface FilterState {
  status: string;
  type: string;
  testNameId: number;
  search?: string;
  projectId?: number;
}

const initialState: FilterState = {
  status: StatusFilters.All,
  type: "all",
  testNameId: 0,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    statusFilterChanged(state, action) {
      state.status = action.payload;
    },
    typeFilterChanged(state, action) {
      state.type = action.payload;
    },
    testTypeFilterChanged(state, action) {
      state.testNameId = action.payload;
    },
    searchFilterChanged(state, action) {
      state.search = action.payload;
    },
    projectFilterChanged(state, action) {
      state.projectId = action.payload;
    },
    resetFilters(state) {
      state.status = initialState.status;
      state.type = initialState.type;
      state.testNameId = initialState.testNameId;
      state.search = initialState.search;
      state.projectId = initialState.projectId;
    }
  },
});

export const {
  statusFilterChanged,
  typeFilterChanged,
  testTypeFilterChanged,
  searchFilterChanged,
  projectFilterChanged,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;

export const selectFilteredStatuses = createSelector(
  selectFilteredCampaigns,
  (campaigns) => {
    let statuses = ["all"];

    campaigns.forEach((cp) => {
      if (!cp.status_name) return;
      if (statuses.indexOf(cp.status_name) === -1) {
        statuses.push(cp.status_name);
      }
    });

    return statuses;
  }
);

export const selectFilteredTestNames = createSelector(
  selectFilteredCampaigns,
  (campaigns) => {
    let types: Array<{label: string, value: string}> = [];

    campaigns.forEach((cp) => {
      if (
        types.find((type) => Number(type.value) === cp.campaign_type_id) === undefined
      ) {
        types.push({
          label: cp.campaign_type_name,
          value: cp.campaign_type_id + "",
        });
      }
    });

    return types;
  }
);

export const selectFilteredTypes = createSelector(
  selectFilteredCampaigns,
  (campaigns) => {
    let types = ["all"];

    campaigns.forEach((cp) => {
      let testType = cp.test_type_name.toLowerCase();
      if (types.indexOf(testType) === -1) {
        types.push(testType);
      }
    });

    return types;
  }
);