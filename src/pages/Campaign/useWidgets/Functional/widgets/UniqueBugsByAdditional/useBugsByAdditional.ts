import { useMemo } from 'react';
import { useGetCampaignsByCidBugsQuery } from 'src/features/api';
import { WidgetItem } from './types';

export const useBugsByAdditional = ({
  campaignId,
  slug,
}: {
  campaignId: string;
  slug: string;
}): {
  total: number;
  items: WidgetItem[];
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, isLoading, isError } = useGetCampaignsByCidBugsQuery({
    cid: campaignId,
    filterBy: { is_duplicated: 0 },
  });

  const result = useMemo(
    () =>
      Object.values(
        (data?.items || []).reduce((acc, bug) => {
          const value = bug.additional_fields?.find(
            (field) => field.slug === slug
          )?.value;
          if (typeof value === 'undefined') return acc;

          if (!(value in acc)) {
            acc[`${value}`] = {
              id: value,
              label: value,
              value: 0,
              key: 0,
              children: '',
              numerator: 0,
              denominator: data?.total || 0,
            };
          }

          acc[`${value}`].value += 1;
          acc[`${value}`].numerator += 1;

          return acc;
        }, {} as Record<string, WidgetItem>)
      ),
    [data?.items, slug]
  );

  return {
    items: result,
    total: data?.total || 0,
    isLoading,
    isError,
  };
};
