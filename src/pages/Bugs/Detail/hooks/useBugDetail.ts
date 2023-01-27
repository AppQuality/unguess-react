import { useGetCampaignsByCidBugsAndBidQuery } from 'src/features/api';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';

const useBugDetail = ({ cid }: { cid: number }) => {
  const currentBugId = getSelectedBugId();

  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidBugsAndBidQuery({
      cid: cid.toString(),
      bid: currentBugId ? currentBugId.toString() : '',
    });

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};

export { useBugDetail };
