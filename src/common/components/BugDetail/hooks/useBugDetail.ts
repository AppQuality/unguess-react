import { useGetCampaignsByCidBugsAndBidQuery } from 'src/features/api';

const useBugDetail = ({ cid, bugId }: { cid: number; bugId: number }) => {
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidBugsAndBidQuery({
      cid: cid.toString(),
      bid: bugId ? bugId.toString() : '',
    });

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};

export { useBugDetail };
