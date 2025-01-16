import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  useGetCampaignsByCidCustomStatusesQuery,
  useGetCampaignsByCidUsecasesQuery,
} from 'src/features/api';
import {
  selectCampaign,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { useCampaign } from '../Bugs/useCampaign';
import { getFiltersFromParams } from './Header/getFiltersFromParams';

const useSetFilters = ({ campaignId }: { campaignId: string }) => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { data: customStatuses } = useGetCampaignsByCidCustomStatusesQuery({
    cid: campaignId || '0',
  });
  const { data: usecases } = useGetCampaignsByCidUsecasesQuery({
    cid: campaignId || '0',
  });
  const { currentCampaign } = useAppSelector((state) => state.bugsPage);
  const { campaign } = useCampaign(Number(campaignId));

  useEffect(() => {
    if (campaign) {
      dispatch(
        selectCampaign({
          cp_id: campaign.cp_id,
          filters: campaign.filters,
        })
      );
    }
  }, [campaign]);

  useEffect(() => {
    if (currentCampaign && searchParams && campaign) {
      const filtersFromParams = getFiltersFromParams(searchParams);
      const availableFilters = campaign.filters; // need to copy the object to extend it
      availableFilters.tags = [
        ...(availableFilters.tags || []),
        { tag_id: 'none', slug: '', display_name: 'No tags' },
      ];
      const filters = {
        useCases: usecases
          ? filtersFromParams.usecase
              ?.map((u) =>
                usecases?.find(
                  (useCase) =>
                    useCase.id.toString().toLowerCase() === u.toLowerCase()
                )
              )
              .filter((u) => u) // filter out undefined values
          : [],
        customStatuses: customStatuses
          ? filtersFromParams.status
              ?.map((c) =>
                customStatuses?.find(
                  (cs) => cs.id.toString().toLowerCase() === c.toLowerCase()
                )
              )
              .filter((c) => c) // filter out undefined values
          : [],
        devices: filtersFromParams.devices
          ? filtersFromParams.devices
              .map((d) =>
                availableFilters.devices?.find(
                  (device) => device.device.toLowerCase() === d.toLowerCase()
                )
              )
              .filter((d) => d) // filter out undefined values
          : [],
        os: filtersFromParams.os
          ? filtersFromParams.os
              .map((o) =>
                availableFilters.os?.find(
                  (os) => os.os.toLowerCase() === o.toLowerCase()
                )
              )
              .filter((o) => o) // filter out undefined values
          : [],
        priorities: filtersFromParams.priorities
          ? filtersFromParams.priorities
              .map((p) =>
                availableFilters.priorities?.find(
                  (priority) => priority.name.toLowerCase() === p.toLowerCase()
                )
              )
              .filter((p) => p) // filter out undefined values
          : [],
        replicabilities: filtersFromParams.replicabilities
          ? filtersFromParams.replicabilities
              .map((r) =>
                availableFilters.replicabilities?.find(
                  (replicability) =>
                    replicability.name.toLowerCase() === r.toLowerCase()
                )
              )
              .filter((r) => r) // filter out undefined values
          : [],
        severities: filtersFromParams.severities
          ? filtersFromParams.severities
              .map((s) =>
                availableFilters.severities?.find(
                  (severity) => severity.name.toLowerCase() === s.toLowerCase()
                )
              )
              .filter((s) => s) // filter out undefined values
          : [],
        tags: filtersFromParams.tags
          ? filtersFromParams.tags
              .map((t) =>
                availableFilters.tags?.find(
                  (tag) => tag.display_name.toLowerCase() === t.toLowerCase()
                )
              )
              .filter((t) => t) // filter out undefined values
          : [],
        types: filtersFromParams.types
          ? filtersFromParams.types
              .map((t) =>
                availableFilters.types?.find(
                  (type) => type.name.toLowerCase() === t.toLowerCase()
                )
              )
              .filter((t) => t) // filter out undefined values
          : [],
        unique: filtersFromParams.unique ? 'unique' : 'all',
        read: filtersFromParams.unread ? 'unread' : 'all',
        search: filtersFromParams.search?.join(' ') || undefined,
      };
      dispatch(
        updateFilters({
          filters,
        })
      );
    }
  }, [currentCampaign, searchParams, usecases, customStatuses, campaign]);
};

export { useSetFilters };
