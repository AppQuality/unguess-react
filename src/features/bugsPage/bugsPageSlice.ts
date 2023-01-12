import { createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from 'src/app/hooks';
import { TypeFilterType, TypeFilter } from './typeFilters';
import { SeverityFilter, SeverityFilterType } from './severityFilters';

type CampaignType = {
  selectedBugId?: number;
} & TypeFilterType &
  SeverityFilterType;

interface initialSimpleState {
  currentCampaign?: number;
  campaigns: {
    [campaign_id: string]: CampaignType;
  };
}

const initialStateSimple: initialSimpleState = {
  campaigns: {},
};

const bugPageSlice = createSlice({
  name: 'bugPage',
  initialState: initialStateSimple,
  reducers: {
    selectCampaign: (state, action) => {
      const { cp_id, filters } = action.payload;
      if (!(cp_id in state.campaigns)) {
        state.campaigns[cp_id as number] = {
          ...TypeFilter.setAvailable(
            state.campaigns[cp_id as number],
            filters.types
          ),
          ...SeverityFilter.setAvailable(
            state.campaigns[cp_id as number],
            filters.severities
          ),
        };
      }
      state.currentCampaign = cp_id;
    },
    selectBug: (state, action) => {
      const { bug_id } = action.payload;
      if (!state.currentCampaign) return;
      if (!(state.currentCampaign in state.campaigns)) return;
      state.campaigns[state.currentCampaign].selectedBugId = bug_id;
    },
    updateFilters: (state, action) => {
      const { filters } = action.payload;
      if (!state.currentCampaign) return;
      state.campaigns[state.currentCampaign] = {
        ...TypeFilter.filter(
          state.campaigns[state.currentCampaign],
          filters.types
        ),
        ...SeverityFilter.filter(
          state.campaigns[state.currentCampaign],
          filters.severities
        ),
      };
    },
  },
});

export default bugPageSlice.reducer;

export const getSelectedFiltersIds = () => ({
  types: TypeFilter.getIds(),
  severities: SeverityFilter.getIds(),
});

export const getSelectedBugId = () => {
  const { currentCampaign, campaigns } = useAppSelector(
    (state) => state.bugsPage
  );
  if (!currentCampaign || !campaigns[currentCampaign as number]) return null;

  const campaign = campaigns[currentCampaign as number];
  if (!campaign.selectedBugId) return null;
  return campaign.selectedBugId;
};

export const getCurrentCampaignData = () => {
  const { currentCampaign, campaigns } = useAppSelector(
    (state) => state.bugsPage
  );
  if (!currentCampaign || !campaigns[currentCampaign as number]) return null;

  const campaign = campaigns[currentCampaign as number];
  if (!campaign) return false;
  return campaign;
};

export const { selectCampaign, updateFilters, selectBug } =
  bugPageSlice.actions;
