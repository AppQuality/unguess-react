import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';

export type DeviceDesktop = {
  [key: string]: string | number;
  desktop_type: string;
};

export type DeviceNonDesktop = {
  [key: string]: string | number;
  manufacturer: string;
};

type bugsByDeviceType = {
  [key: string]: DeviceDesktop | DeviceNonDesktop;
};

const useListBugsByDevice = (campaignId: number) => {
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidWidgetsQuery({
      cid: campaignId,
      s: 'bugs-by-device',
    });

  const { data: results, kind } = data || {};

  if (results && kind === 'bugsByDevice') {
    const bugsByDevice: bugsByDeviceType = {};

    results.forEach((item: DeviceDesktop | DeviceNonDesktop) => {
      const { desktop_type, manufacturer, model } = item;
      const key = desktop_type || `${manufacturer} ${model}`;

      if (bugsByDevice[`${key}`]) {
        bugsByDevice[`${key}`] = {
          ...bugsByDevice[`${key}`],
          ...item,
        };
      } else {
        bugsByDevice[`${key}`] = item;
      }
    });

    // Transform the object into an array [ device: string, data: DeviceDesktop | DeviceNonDesktop ]
    const bugsByDeviceArray = Object.entries(bugsByDevice).map(
      ([device, meta]) => ({
        device,
        meta,
      })
    );

    // Order by number of bugs
    bugsByDeviceArray.sort((a, b) => {
      const aBugs = a.meta.bugs;
      const bBugs = b.meta.bugs;

      if (aBugs > bBugs) {
        return -1;
      }
      if (aBugs < bBugs) {
        return 1;
      }
      return 0;
    });

    return {
      bugsByDevice: bugsByDeviceArray,
      bugsTotal: results.length,
      isLoading,
      isFetching,
      isError,
    };
  }

  return {
    bugsByDevice: [],
    bugsTotal: 0,
    isLoading,
    isFetching,
    isError,
  };
};

export { useListBugsByDevice };
