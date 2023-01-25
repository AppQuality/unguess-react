import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'src/app/hooks';
import { TypeFilterType, TypeFilter } from './typeFilter';
import { SeverityFilter, SeverityFilterType } from './severityFilter';
import { ReadFilter, ReadFilterType } from './readFilter';
import { UniqueFilter, UniqueFilterType } from './uniqueFilter';
import { SearchFilter, SearchFilterType } from './searchFilter';
import { TagFilterType, TagFilter } from './tagFilter';
import { UseCaseFilterType, UseCaseFilter } from './useCaseFilter';
import { DeviceFilterType, DeviceFilter } from './deviceFilter';
import { OsFilterType, OsFilter } from './osFilter';

type CampaignType = {
  selectedBugId?: number;
} & TypeFilterType &
  SeverityFilterType &
  ReadFilterType &
  UniqueFilterType &
  SearchFilterType &
  TagFilterType &
  UseCaseFilterType &
  DeviceFilterType &
  OsFilterType;
// TODO: add new filter

type PageView = 'byUsecase' | 'bySeverity' | 'ungrouped';

interface initialSimpleState {
  currentCampaign?: number;
  campaigns: {
    [campaign_id: string]: CampaignType;
  };
  pageView: PageView;
  isFilterDrawerOpen: boolean;
}

const initialStateSimple: initialSimpleState = {
  campaigns: {},
  pageView: 'byUsecase',
  isFilterDrawerOpen: false,
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
        ...TagFilter.setAvailable(
          state.campaigns[cp_id as number],
          filters.tags
        ),
        ...UseCaseFilter.setAvailable(
          state.campaigns[cp_id as number],
          filters.useCases
        ),
        ...DeviceFilter.setAvailable(
          state.campaigns[cp_id as number],
          filters.devices
        ),
        ...OsFilter.setAvailable(state.campaigns[cp_id as number], filters.os),
        // TODO: add new filter
      };
      state.currentCampaign = cp_id;
    },
    selectBug: (state, action: { payload: { bug_id?: number } }) => {
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
        ...TagFilter.filter(
          state.campaigns[state.currentCampaign],
          filters.tags
        ),
        ...UseCaseFilter.filter(
          state.campaigns[state.currentCampaign],
          filters.useCases
        ),
        ...DeviceFilter.filter(
          state.campaigns[state.currentCampaign],
          filters.devices
        ),
        ...OsFilter.filter(state.campaigns[state.currentCampaign], filters.os),
        // TODO: add new filter
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
        ...TagFilter.reset(state.campaigns[state.currentCampaign]),
        ...UseCaseFilter.reset(state.campaigns[state.currentCampaign]),
        ...DeviceFilter.reset(state.campaigns[state.currentCampaign]),
        ...OsFilter.reset(state.campaigns[state.currentCampaign]),
        // TODO: add new filter
      };
    },
    setPageView: (state, action: PayloadAction<PageView>) => {
      state.pageView = action.payload
    },
    setFilterDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isFilterDrawerOpen = action.payload;
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
  tags: TagFilter.getIds(),
  useCases: UseCaseFilter.getIds(),
  devices: DeviceFilter.getIds(),
  os: OsFilter.getIds(),
  // TODO: add new filter
});

export const getSelectedFilters = () => ({
  types: TypeFilter.getValues(),
  severities: SeverityFilter.getValues(),
  read: ReadFilter.getValue(),
  unique: UniqueFilter.getValue(),
  search: SearchFilter.getValue(),
  tags: TagFilter.getValues(),
  useCases: UseCaseFilter.getValues(),
  devices: DeviceFilter.getValues(),
  os: OsFilter.getValues(),
  // TODO: add new filter
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

export const {
  selectCampaign,
  updateFilters,
  selectBug,
  resetFilters,
  setPageView,
  setFilterDrawerOpen,
} = bugPageSlice.actions;
