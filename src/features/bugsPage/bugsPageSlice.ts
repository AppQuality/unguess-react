import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'src/app/hooks';
import { TypeFilterType, TypeFilter } from './typeFilter';
import { SeverityFilter, SeverityFilterType } from './severityFilter';
import { ReadFilter, ReadFilterType } from './readFilter';
import { UniqueFilter, UniqueFilterType } from './uniqueFilter';
import { SearchFilter, SearchFilterType } from './searchFilter';
import { TagFilterType, TagFilter } from './tagFilter';
import { PriorityFilter, PriorityFilterType } from './priorityFilter';
import {
  CustomStatusFilter,
  CustomStatusFilterType,
} from './customStatusFilter';
import { UseCaseFilterType, UseCaseFilter } from './useCaseFilter';
import { DeviceFilterType, DeviceFilter } from './deviceFilter';
import { OsFilterType, OsFilter } from './osFilter';
import {
  ReplicabilityFilter,
  ReplicabilityFilterType,
} from './replicabilityFilter';

type CampaignType = {
  selectedBugId?: number;
} & TypeFilterType &
  SeverityFilterType &
  ReadFilterType &
  UniqueFilterType &
  SearchFilterType &
  TagFilterType &
  PriorityFilterType &
  CustomStatusFilterType &
  UseCaseFilterType &
  DeviceFilterType &
  OsFilterType &
  ReplicabilityFilterType;

type GroupBy = 'usecase' | 'bugState' | 'ungrouped';
export type OrderBy = 'severity_id' | 'priority_id';
export type Order = 'DESC' | 'ASC';

interface initialSimpleState {
  currentCampaign?: number;
  campaigns: {
    [campaign_id: string]: CampaignType;
  };
  groupBy: GroupBy;
  orderBy: OrderBy;
  order: Order;
  isFilterDrawerOpen: boolean;
}

const initialStateSimple: initialSimpleState = {
  campaigns: {},
  groupBy: 'usecase',
  orderBy: 'severity_id',
  order: 'DESC',
  isFilterDrawerOpen: false,
};

const bugPageSlice = createSlice({
  name: 'bugPage',
  initialState: initialStateSimple,
  reducers: {
    selectCampaign: (state, action) => {
      const { cp_id, filters } = action.payload;
      state.campaigns[cp_id as number] = {
        ...(state.campaigns[cp_id as number]
          ? state.campaigns[cp_id as number]
          : {}),
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
        ...PriorityFilter.setAvailable(
          state.campaigns[cp_id as number],
          filters.priorities
        ),
        ...CustomStatusFilter.setAvailable(
          state.campaigns[cp_id as number],
          filters.customStatuses
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
        ...ReplicabilityFilter.setAvailable(
          state.campaigns[cp_id as number],
          filters.replicabilities
        ),
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
        ...PriorityFilter.filter(
          state.campaigns[state.currentCampaign],
          filters.priorities
        ),
        ...CustomStatusFilter.filter(
          state.campaigns[state.currentCampaign],
          filters.customStatuses
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
        ...ReplicabilityFilter.filter(
          state.campaigns[state.currentCampaign],
          filters.replicabilities
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
        ...TagFilter.reset(state.campaigns[state.currentCampaign]),
        ...PriorityFilter.reset(state.campaigns[state.currentCampaign]),
        ...CustomStatusFilter.reset(state.campaigns[state.currentCampaign]),
        ...UseCaseFilter.reset(state.campaigns[state.currentCampaign]),
        ...DeviceFilter.reset(state.campaigns[state.currentCampaign]),
        ...OsFilter.reset(state.campaigns[state.currentCampaign]),
        ...ReplicabilityFilter.reset(state.campaigns[state.currentCampaign]),
      };
    },
    setOrderBy: (state, action: PayloadAction<OrderBy>) => {
      state.orderBy = action.payload;
    },
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
    setGroupBy: (state, action: PayloadAction<GroupBy>) => {
      state.groupBy = action.payload;
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
  priorities: PriorityFilter.getIds(),
  customStatuses: CustomStatusFilter.getIds(),
  useCases: UseCaseFilter.getIds(),
  devices: DeviceFilter.getIds(),
  os: OsFilter.getIds(),
  replicabilities: ReplicabilityFilter.getIds(),
});

export const getSelectedFilters = () => ({
  types: TypeFilter.getValues(),
  severities: SeverityFilter.getValues(),
  read: ReadFilter.getValue(),
  unique: UniqueFilter.getValue(),
  search: SearchFilter.getValue(),
  tags: TagFilter.getValues(),
  priorities: PriorityFilter.getValues(),
  customStatuses: CustomStatusFilter.getValues(),
  useCases: UseCaseFilter.getValues(),
  devices: DeviceFilter.getValues(),
  os: OsFilter.getValues(),
  replicabilities: ReplicabilityFilter.getValues(),
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

export const getSelectedOrderBy = (): OrderBy =>
  useAppSelector((state) => state.bugsPage).orderBy;
export const getSelectedOrder = (): Order =>
  useAppSelector((state) => state.bugsPage).order;

export const {
  selectCampaign,
  updateFilters,
  selectBug,
  resetFilters,
  setGroupBy,
  setOrderBy,
  setOrder,
  setFilterDrawerOpen,
} = bugPageSlice.actions;
