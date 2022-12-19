import { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { BugType, useGetCampaignsByCidBugsQuery } from 'src/features/api';
import { useCampaingBugTypes } from './useCampaignBugTypes';

export interface BugsByTypeData {
  label: string;
  keys: {
    [key: string]: number;
  };
  total: number;
}

export const useBugsByType = (campaignId: number) => {
  const [bugsByType, setBugsByType] = useState<BugsByTypeData[]>([]);
  const [acceptedTypes, setAcceptedTypes] = useState<BugType[]>([]);
  const fallbackCategory = { id: 999, name: 'Other' };
  const { bugTypes, isBugTypeError, isBugTypesLoading } = useCampaingBugTypes(
    campaignId.toString()
  );
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidBugsQuery({
      cid: campaignId,
    });

  // update acceptedTypes when bugTypes change and add fallback category
  useEffect(() => {
    if (isBugTypesLoading || isBugTypeError) {
      return;
    }

    setAcceptedTypes(bugTypes);
  }, [bugTypes, fallbackCategory, isBugTypesLoading, isBugTypeError]);

  // update bugsByType when acceptedTypes change
  useEffect(() => {
    if (
      isLoading ||
      isFetching ||
      isError ||
      !data?.items ||
      acceptedTypes.length === 0
    ) {
      return;
    }
    // initialize bugsByType with empty data
    const newBugsByType: BugsByTypeData[] = acceptedTypes.map((type) => ({
      label: type.name,
      keys: { Low: 0, Medium: 0, High: 0, Critical: 0 },
      total: 0,
    }));
    // add fallback category if not present
    if (!newBugsByType.find((type) => type.label === fallbackCategory.name)) {
      newBugsByType.push({
        label: fallbackCategory.name,
        keys: { Low: 0, Medium: 0, High: 0, Critical: 0 },
        total: 0,
      });
    }
    // update bugsByType with data from API
    data?.items?.forEach((item) => {
      let bugType = newBugsByType.find((type) => type.label === item.type.name);
      // fallback to Other for unknown bug types
      bugType =
        bugType ||
        newBugsByType.find((type) => type.label === fallbackCategory.name);
      if (typeof bugType !== 'undefined') {
        bugType.keys[capitalizeFirstLetter(item.severity.name)] += 1;
        bugType.total += 1;
      }
    });
    newBugsByType.sort((a, b) => {
      if (a.total < b.total) return -1;
      if (a.total > b.total) return 1;
      return 0;
    });
    setBugsByType(newBugsByType);
  }, [data?.items, acceptedTypes]);

  return {
    bugsByType,
    totalBugs: data?.total || 0,
    isLoading: isLoading || isFetching,
    isError,
  };
};
