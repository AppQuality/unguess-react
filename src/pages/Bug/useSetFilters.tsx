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
    if (currentCampaign) {
      const usecaseFiltersIds = searchParams.getAll('useCases');
      const customStatusFiltersIds = searchParams.getAll('customStatuses');
      dispatch(
        updateFilters({
          filters: {
            useCases: usecases
              ? usecaseFiltersIds.map((u) =>
                  usecases?.find((useCase) => useCase.id.toString() === u)
                )
              : [],
            customStatuses: customStatuses
              ? customStatusFiltersIds.map((c) =>
                  customStatuses?.find((cs) => cs.id.toString() === c)
                )
              : [],
          },
        })
      );
    }
  }, [currentCampaign, searchParams, usecases, customStatuses]);
};

export { useSetFilters };
