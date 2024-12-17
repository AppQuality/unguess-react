import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useGetCampaignsByCidCustomStatusesQuery } from 'src/features/api';
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
      const usecaseFilters = searchParams.getAll('useCases');
      const customStatusFilters = searchParams.getAll('customStatuses');
      dispatch(
        updateFilters({
          filters: {
            useCases: usecaseFilters.map((u) => ({ id: u })),
            customStatuses: customStatusFilters.map((c) => ({
              id: c,
              name:
                customStatuses?.find((cs) => cs.id.toString() === c)?.name ??
                '-',
            })),
          },
        })
      );
    }
  }, [currentCampaign, searchParams]);
};

export { useSetFilters };
