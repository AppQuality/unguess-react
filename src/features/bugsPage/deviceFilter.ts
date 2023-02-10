import { useAppSelector } from 'src/app/hooks';

export type DeviceFilterType = {
  devices: {
    available: {
      device: string;
    }[];
    selected: {
      device: string;
    }[];
  };
};

export const DeviceFilter = {
  reset: (state: DeviceFilterType) => ({
    devices: {
      ...DeviceFilter.getCurrent(state),
      selected: [],
    },
  }),
  getCurrent: (state?: DeviceFilterType) => ({
    available: state?.devices?.available ? state.devices.available : [],
    selected: state?.devices?.selected ? state.devices.selected : [],
  }),
  setAvailable: (
    state: DeviceFilterType,
    devices?: {
      device: string;
    }[]
  ) => ({
    devices: {
      ...DeviceFilter.getCurrent(state),
      ...(devices ? { available: devices } : {}),
    },
  }),
  filter: (
    state: DeviceFilterType,
    devices?: {
      device: string;
    }[]
  ) => ({
    devices: {
      ...DeviceFilter.getCurrent(state),
      ...(devices ? { selected: devices } : {}),
    },
  }),
  getValues: () => {
    const bugsPageSlice = useAppSelector((state) => state.bugsPage);

    if (!bugsPageSlice.currentCampaign) return undefined;

    if (!bugsPageSlice.campaigns[bugsPageSlice.currentCampaign].devices)
      return undefined;

    const campaign: DeviceFilterType =
      bugsPageSlice.campaigns[bugsPageSlice.currentCampaign];

    if (!campaign.devices.selected) return undefined;
    return campaign.devices.selected;
  },
  getIds: () => {
    const values = DeviceFilter.getValues();
    if (!values) return undefined;
    return values.map((t) => t.device);
  },
};
