import { createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from 'src/app/hooks';
import { TypeFilterType, TypeFilter } from './typeFilters';
import { SeverityFilter, SeverityFilterType } from './severityFilter';
import { ReadFilter, ReadFilterType } from './readFilter';
import { UniqueFilter, UniqueFilterType } from './uniqueFilter';
import { SearchFilter, SearchFilterType } from './searchFilter';

type CampaignType = {
  selectedBugId?: number;
} & TypeFilterType &
  SeverityFilterType &
  ReadFilterType &
  UniqueFilterType &
  SearchFilterType;

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
      state.campaigns[cp_id as number] = {
        ...TypeFilter.setAvailable(
          state.campaigns[cp_id as number],
          filters.types
        ),
        ...SeverityFilter.setAvailable(
          state.campaigns[cp_id as number],
          filters.severities
        ),
        ...ReadFilter.setAvailable(state.campaigns[cp_id as number]),
        ...UniqueFilter.setAvailable(state.campaigns[cp_id as number]),
        ...SearchFilter.setAvailable(state.campaigns[cp_id as number]),
      };
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
        ...ReadFilter.filter(
          state.campaigns[state.currentCampaign],
          filters.read
        ),
        ...UniqueFilter.filter(
          state.campaigns[state.currentCampaign],
          filters.unique
        ),
        ...SearchFilter.filter(
          state.campaigns[state.currentCampaign],
          filters.search
        ),
      };
    },
    resetFilters: (state) => {
      if (!state.currentCampaign) return;
      state.campaigns[state.currentCampaign] = {
        ...TypeFilter.reset(state.campaigns[state.currentCampaign]),
        ...SeverityFilter.reset(state.campaigns[state.currentCampaign]),
        ...ReadFilter.reset(state.campaigns[state.currentCampaign]),
        ...UniqueFilter.reset(state.campaigns[state.currentCampaign]),
        ...SearchFilter.reset(),
      };
    },
  },
});

export default bugPageSlice.reducer;

export const getSelectedFiltersIds = () => ({
  types: TypeFilter.getIds(),
  severities: SeverityFilter.getIds(),
  read: ReadFilter.getValue(),
  unique: UniqueFilter.getValue(),
  search: SearchFilter.getValue(),
});

export const getSelectedFilters = () => ({
  types: TypeFilter.getValues(),
  severities: SeverityFilter.getValues(),
  read: ReadFilter.getValue(),
  unique: UniqueFilter.getValue(),
  search: SearchFilter.getValue(),
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

export const { selectCampaign, updateFilters, selectBug, resetFilters } =
  bugPageSlice.actions;
